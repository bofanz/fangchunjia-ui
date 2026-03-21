import Editor from '@/components/admin/Tiptap';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import { useUpdateProjectMutation } from '@/utils/queryOptions';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import type { JSONContent } from '@tiptap/react';
import { useState } from 'react';
import { fetchProject } from '@/utils/queries';
import { Panel } from 'react-resizable-panels';

export const Route = createFileRoute(
  '/admin/_adminLayout/projects/$projectId/description',
)({
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
  const routeApi = getRouteApi(
    '/admin/_adminLayout/projects/$projectId/description',
  );
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
      <Panel>
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Editor content={content} setContent={setContent} />
          </div>
          <div className="px-4 py-2">
            <button
              className="px-4 py-3 text-sm bg-black hover:bg-fangchunjia-pink text-white transition leading-none"
              onClick={() => {
                submit(content);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Panel>
    </>
  );
}
