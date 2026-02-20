import Body from '@/components/Body';
import { useCreateProjectMutation } from '@/utils/queryOptions';
import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
} from '@headlessui/react';

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  const createProjectMutation = useCreateProjectMutation();

  return (
    <Body>
      <form
        method="post"
        id="createProjectForm"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const formData = new FormData(event.target as HTMLFormElement);
          createProjectMutation.mutate({
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            categoryId: formData.get('categoryId') as string,
            year: Number(formData.get('year') as string),
            description: formData.get('description') as string,
            link: formData.get('link') as string,
          });
        }}
      >
        <Fieldset className="space-y-8">
          <Legend className="text-lg font-bold">Add Project</Legend>
          <Field>
            <Label className="block">ID</Label>
            <Input className="mt-1 block border-b-2 border-black" name="id" />
          </Field>
          <Field>
            <Label className="block">Name</Label>
            <Input className="mt-1 block border-b-2 border-black" name="name" />
          </Field>
          <Field>
            <Label className="block">Category</Label>
            <Select
              className="mt-1 block border-b-2 border-black"
              name="categoryId"
            >
              <option value="experimental">Experimental</option>
              <option value="collaborations">Collaborations</option>
            </Select>
          </Field>
          <Field>
            <Label className="block">Year</Label>
            <Input
              className="mt-1 block border-b-2 border-black"
              name="year"
              type="number"
            />
          </Field>
          <Field>
            <Label className="block">Link</Label>
            <Input
              className="mt-1 block border-b-2 border-black"
              name="Link"
              type="url"
            />
          </Field>
          <Button
            className="rounded bg-fangchunjia-black px-4 py-2 text-sm text-white data-active:bg-fangchunjia-pink data-hover:bg-fangchunjia-pink data-disabled:bg-fangchunjia-gray transition"
            type="submit"
            disabled={createProjectMutation.status === 'pending'}
          >
            Publish
          </Button>
        </Fieldset>
      </form>
    </Body>
  );
}
