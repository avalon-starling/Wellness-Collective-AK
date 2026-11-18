import { memberLogin } from "@/lib/member-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const practitioner = await memberLogin(email, password);

    return Response.json({
      success: true,
      practitioner: {
        id: practitioner.id,
        name: practitioner.name,
        email: practitioner.email,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication failed";
    return Response.json({ error: message }, { status: 401 });
  }
}
