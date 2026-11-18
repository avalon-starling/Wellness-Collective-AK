import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/ui";
import { getSession } from "@/lib/member-auth";
import { db } from "@/lib/db";
import { ProfileEditForm } from "./form";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your Wellness Collective profile",
};

export const dynamic = "force-dynamic";

export default async function ProfileEditPage() {
  const session = await getSession();

  if (!session) {
    redirect("/member/login");
  }

  const practitioner = await db.practitioner.findUnique({
    where: { id: session.practitionerId },
  });

  if (!practitioner) {
    redirect("/member/login");
  }

  return (
    <div>
      <Nav />
      <section className="bg-paper px-6 py-16 md:px-14">
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Member Profile</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
            Edit Your Profile
          </h1>
          <p className="mt-4 font-serif text-inkSoft">
            Keep your information current so community members can find and contact you.
          </p>

          <ProfileEditForm practitioner={practitioner} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
