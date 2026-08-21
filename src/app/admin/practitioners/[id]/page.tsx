import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PractitionerForm } from "@/components/admin/PractitionerForm";

export default async function EditPractitionerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const practitioner = await db.practitioner.findUnique({ where: { id } });
  if (!practitioner) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl text-ink">Edit {practitioner.name}</h1>
      <div className="mt-8 max-w-3xl">
        <PractitionerForm practitioner={practitioner} />
      </div>
    </div>
  );
}
