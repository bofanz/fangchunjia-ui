import AdminHeader from '@/components/admin/AdminHeader';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import Body from '@/components/Body';
import { useState } from 'react';
import { useUpdateProjectMutation } from '@/utils/queryOptions';
import Editor from '@/components/Tiptap';
import type { JSONContent } from '@tiptap/react';
import { parseJsonContent } from '@/components/Tiptap/parseJsonContent';

export const Route = createFileRoute('/admin/projects/$projectId/description')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const updateProjectMutation = useUpdateProjectMutation();
  const routeApi = getRouteApi('/admin/projects/$projectId/description');
  const project = routeApi.useLoaderData();
  const description = parseJsonContent(project.description);

  const submit = (c?: JSONContent) => {
    if (!c) {
      return;
    }
    if (c === description) {
      return;
    }
    updateProjectMutation.mutate({
      id: project.id,
      description: JSON.stringify(c),
    });
  };
  const [content, setContent] = useState<JSONContent | undefined>(description);

  return (
    <>
      <AdminHeader label={`Edit: ${project.name} - Description`} />
      <Body>
        <Editor content={content} setContent={setContent} />
        <button
          className="px-4 py-2 bg-black hover:bg-fangchunjia-pink text-white transition"
          onClick={() => {
            submit(content);
          }}
        >
          Save
        </button>
      </Body>
    </>
  );
}
