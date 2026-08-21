import { ResourceForm } from "@/components/admin/ResourceForm";

export default function NewResourcePage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-ink">New resource</h1>
      <div className="mt-8 max-w-3xl">
        <ResourceForm />
      </div>
    </div>
  );
}
