import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "dev-secret-min-32-characters-required!!!"
);

const COOKIE_NAME = "member_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface SessionPayload {
  practitionerId: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(practitionerId: string, email: string) {
  const token = await new SignJWT({ practitionerId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function memberLogin(email: string, password: string) {
  const practitioner = await db.practitioner.findUnique({
    where: { email },
  });

  if (!practitioner || !practitioner.passwordHash) {
    throw new Error("Invalid email or password");
  }

  const passwordValid = await verifyPassword(password, practitioner.passwordHash);
  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  // Update last login
  await db.practitioner.update({
    where: { id: practitioner.id },
    data: { lastLoginAt: new Date() },
  });

  await createSession(practitioner.id, practitioner.email!);
  return practitioner;
}

export async function memberSignup(
  email: string,
  password: string,
  practitionerId: string
) {
  // Verify practitioner exists
  const practitioner = await db.practitioner.findUnique({
    where: { id: practitionerId },
  });

  if (!practitioner) {
    throw new Error("Practitioner not found");
  }

  // Check if already has password
  if (practitioner.passwordHash) {
    throw new Error("This account already has a password set");
  }

  // Check if practitioner can still be claimed (first 50 get free)
  const count = await db.practitioner.count({
    where: { membershipTier: "FOUNDING" },
  });

  if (count >= 50) {
    throw new Error("All 50 founding member slots are taken");
  }

  const passwordHash = await hashPassword(password);
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  const updated = await db.practitioner.update({
    where: { id: practitionerId },
    data: {
      email,
      passwordHash,
      membershipTier: "FOUNDING",
      membershipActive: true,
      membershipExpiresAt: expiresAt,
    },
  });

  await createSession(updated.id, updated.email!);
  return updated;
}
