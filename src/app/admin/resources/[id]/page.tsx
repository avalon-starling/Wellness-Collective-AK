import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ResourceForm } from "@/components/admin/ResourceForm";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await db.resource.findUnique({ where: { id } });
  if (!resource) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl text-ink">Edit {resource.title}</h1>
      <div className="mt-8 max-w-3xl">
        <ResourceForm resource={resource} />
      </div>
    </div>
  );
}
