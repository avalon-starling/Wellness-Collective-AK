import type { Event } from "@prisma/client";
import { saveEvent, deleteEvent } from "@/lib/admin-actions";
import { toDatetimeLocal } from "@/lib/utils";
import { Field, TextAreaField, SelectField, Checkbox, SubmitButton } from "./fields";

export function EventForm({ event }: { event?: Event }) {
  const action = saveEvent.bind(null, event?.id ?? null);

  return (
    <>
      <form action={action} className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={event?.title} required />
          <Field label="Slug (URL)" name="slug" defaultValue={event?.slug} placeholder="auto-generated from title if blank" />
        </div>

        <TextAreaField label="Description" name="description" defaultValue={event?.description} required rows={5} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Starts at" name="startsAt" type="datetime-local" defaultValue={event ? toDatetimeLocal(event.startsAt) : undefined} required />
          <Field label="Ends at (optional)" name="endsAt" type="datetime-local" defaultValue={event?.endsAt ? toDatetimeLocal(event.endsAt) : undefined} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Location" name="location" defaultValue={event?.location} required placeholder="Venue name & address" />
          <Field label="Town" name="town" defaultValue={event?.town ?? undefined} />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <SelectField
            label="Location type"
            name="locationType"
            defaultValue={event?.locationType}
            options={[
              ["IN_PERSON", "In-person"],
              ["VIRTUAL", "Virtual"],
              ["BOTH", "Hybrid"],
            ]}
          />
          <SelectField
            label="Access"
            name="access"
            defaultValue={event?.access}
            options={[
              ["OPEN", "Open to all"],
              ["MEMBER", "Members only"],
              ["TICKETED", "Ticketed"],
            ]}
          />
          <Field label="Capacity" name="capacity" type="number" min={0} defaultValue={event?.capacity ?? undefined} />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="Modality tag" name="modality" defaultValue={event?.modality ?? undefined} placeholder="e.g. Sound Healing" />
          <Field label="Host" name="host" defaultValue={event?.host ?? undefined} />
          <Field label="Price" name="price" defaultValue={event?.price ?? undefined} placeholder="e.g. $25, or leave blank if free" />
        </div>

        <Field label="Image URL" name="imageUrl" type="url" defaultValue={event?.imageUrl ?? undefined} />

        <div className="flex flex-wrap gap-6">
          <Checkbox label="Published" name="published" defaultChecked={event?.published ?? true} />
          <Checkbox label="This is Wellness Weekend (flagship)" name="isFlagship" defaultChecked={event?.isFlagship ?? false} />
        </div>

        <div className="border-t border-rule pt-6">
          <SubmitButton>{event ? "Save changes" : "Create event"}</SubmitButton>
        </div>
      </form>
      {event && (
        <form action={deleteEvent.bind(null, event.id)} className="mt-4">
          <button type="submit" className="font-sans text-xs uppercase tracking-widest text-rose">
            Delete event
          </button>
        </form>
      )}
    </>
  );
}
