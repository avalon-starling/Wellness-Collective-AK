import type { Resource } from "@prisma/client";
import { saveResource, deleteResource } from "@/lib/admin-actions";
import { Field, TextAreaField, SelectField, Checkbox, SubmitButton } from "./fields";

export function ResourceForm({ resource }: { resource?: Resource }) {
  const action = saveResource.bind(null, resource?.id ?? null);

  return (
    <>
      <form action={action} className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={resource?.title} required />
          <Field label="Slug (URL)" name="slug" defaultValue={resource?.slug} placeholder="auto-generated from title if blank" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            label="Category"
            name="category"
            defaultValue={resource?.category ?? "Guide"}
            options={[
              ["Guide", "Guide"],
              ["Article", "Article"],
              ["Education", "Education"],
            ]}
          />
          <Field label="Author" name="author" defaultValue={resource?.author ?? undefined} />
        </div>

        <TextAreaField label="Excerpt" name="excerpt" defaultValue={resource?.excerpt} required rows={2} />
        <TextAreaField
          label="Content (markdown — ## headings, **bold**, *italic*, [links](url), - lists)"
          name="content"
          defaultValue={resource?.content}
          required
          rows={14}
        />

        <Field label="Cover image URL" name="coverImageUrl" type="url" defaultValue={resource?.coverImageUrl ?? undefined} />

        <Checkbox label="Published" name="published" defaultChecked={resource?.published ?? false} />

        <div className="border-t border-rule pt-6">
          <SubmitButton>{resource ? "Save changes" : "Create resource"}</SubmitButton>
        </div>
      </form>
      {resource && (
        <form action={deleteResource.bind(null, resource.id)} className="mt-4">
          <button type="submit" className="font-sans text-xs uppercase tracking-widest text-rose">
            Delete resource
          </button>
        </form>
      )}
    </>
  );
}
