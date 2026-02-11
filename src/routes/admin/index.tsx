import { useCreateProjectMutation } from '@/utils/queryOptions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  const createProjectMutation = useCreateProjectMutation();

  return (
    <div className="bg-white h-full p-16">
      <div className="font-bold text-2xl pt-4 pb-4 mb-4">
        <h1>Add Project</h1>
      </div>
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
        <div className="w-[320px]">
          <div className="flex flex-col mb-8 form-fields">
            <div>
              <label htmlFor="id">ID</label>
              <input id="id" name="id" pattern="[a-z0-9]*" />
            </div>

            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" />
            </div>

            <div>
              <label htmlFor="categoryId">Category</label>
              <select id="categoryId" name="categoryId">
                <option value="experimental">Experimental</option>
                <option value="collaborations">Collaborations</option>
              </select>
            </div>

            <div>
              <label htmlFor="year">Year</label>
              <input
                id="year"
                name="year"
                type="number"
                min="1997"
                max="2099"
                step="1"
              />
            </div>

            <div>
              <label htmlFor="link">Link</label>
              <input id="link" name="link" type="url" />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" />
            </div>
          </div>
          <div>
            <button
              className="text-fangchunjia-pink cursor-pointer text-lg font-bold hover:underline"
              type="submit"
              disabled={createProjectMutation.status === 'pending'}
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
