import Editor from '@/components/admin/Tiptap';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import { useUpdateProjectMutation } from '@/utils/queryOptions';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import type { JSONContent } from '@tiptap/react';
import { useState } from 'react';
import { fetchProject } from '@/utils/queries';
import Pane from '@/components/admin/Pane';

export const Route = createFileRoute('/admin/projects/$projectId/description')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
  head: () => ({
    meta: [
      {
        title: 'Description',
      },
    ],
  }),
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
      <Pane>
        <div className="flex-1">
          <Editor content={content} setContent={setContent} />
        </div>
        <button
          className="px-4 py-2 bg-black hover:bg-fangchunjia-pink text-white transition"
          onClick={() => {
            submit(content);
          }}
        >
          Save
        </button>
      </Pane>
    </>
  );
}
