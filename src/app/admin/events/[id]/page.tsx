import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { EventForm } from "@/components/admin/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await db.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl text-ink">Edit {event.title}</h1>
      <div className="mt-8 max-w-3xl">
        <EventForm event={event} />
      </div>
    </div>
  );
}
