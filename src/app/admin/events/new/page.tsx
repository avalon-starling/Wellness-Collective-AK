import { EventForm } from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-ink">New event</h1>
      <div className="mt-8 max-w-3xl">
        <EventForm />
      </div>
    </div>
  );
}
