import type { Project } from '@/interfaces/project.interface';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '@/utils/queryOptions';
import { useEffect, useRef } from 'react';

export default function ProjectForm({
  project,
  update = false,
}: {
  project?: Project;
  update?: boolean;
}) {
  const updateProjectMutation = useUpdateProjectMutation();
  const createProjectMutation = useCreateProjectMutation();
  const formRef = useRef<HTMLFormElement>(null);
  const idFieldRef = useRef<HTMLInputElement>(null);
  const nameFieldRef = useRef<HTMLInputElement>(null);
  const categoryIdFieldRef = useRef<HTMLSelectElement>(null);
  const yearFieldRef = useRef<HTMLInputElement>(null);
  const linkFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (project) {
      idFieldRef.current && (idFieldRef.current.value = project.id);
      nameFieldRef.current && (nameFieldRef.current.value = project.name);
      categoryIdFieldRef.current &&
        (categoryIdFieldRef.current.value = project.categoryId);
      yearFieldRef.current &&
        (yearFieldRef.current.value = project.year.toString());
      linkFieldRef.current &&
        project.link &&
        (linkFieldRef.current.value = project.link);
    }
  }, [project]);
  return (
    <form
      ref={formRef}
      method="post"
      id="createProjectForm"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        if (update) {
          updateProjectMutation.mutate({
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            categoryId: formData.get('categoryId') as string,
            year: Number(formData.get('year') as string),
            // description: formData.get('description') as string,
            link: formData.get('link') as string,
          });
        } else {
          createProjectMutation.mutate({
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            categoryId: formData.get('categoryId') as string,
            year: Number(formData.get('year') as string),
            // description: formData.get('description') as string,
            link: formData.get('link') as string,
          });
        }
      }}
    >
      <fieldset className="space-y-8">
        <div>
          <label className="block">ID</label>
          <input
            className="mt-1 block border-b-2 border-black"
            name="id"
            ref={idFieldRef}
          />
        </div>
        <div>
          <label className="block">Name</label>
          <input
            className="mt-1 block border-b-2 border-black"
            name="name"
            ref={nameFieldRef}
          />
        </div>
        <div>
          <label className="block">Category</label>
          <select
            className="mt-1 block border-b-2 border-black"
            name="categoryId"
            ref={categoryIdFieldRef}
          >
            <option value="experimental">Experimental</option>
            <option value="collaborations">Collaborations</option>
          </select>
        </div>
        <div>
          <label className="block">Year</label>
          <input
            className="mt-1 block border-b-2 border-black"
            name="year"
            type="number"
            ref={yearFieldRef}
          />
        </div>
        <div>
          <label className="block">Link</label>
          <input
            className="mt-1 block border-b-2 border-black"
            name="Link"
            type="url"
            ref={linkFieldRef}
          />
        </div>
        <button
          className="bg-fangchunjia-black px-4 py-2 text-sm text-white active:bg-fangchunjia-pink hover:bg-fangchunjia-pink disabled:bg-fangchunjia-gray transition"
          type="submit"
          disabled={createProjectMutation.status === 'pending'}
        >
          {update ? 'Save' : 'Publish'}
        </button>
      </fieldset>
    </form>
  );
}
