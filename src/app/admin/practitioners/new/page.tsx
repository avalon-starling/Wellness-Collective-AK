import { PractitionerForm } from "@/components/admin/PractitionerForm";

export default function NewPractitionerPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-ink">New practitioner</h1>
      <div className="mt-8 max-w-3xl">
        <PractitionerForm />
      </div>
    </div>
  );
}
