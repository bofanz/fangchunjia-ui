import Editor from '@/components/admin/Tiptap';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import { useUpdateAboutMutation } from '@/utils/queryOptions';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import type { JSONContent } from '@tiptap/react';
import { useState } from 'react';
import { fetchAbout } from '@/utils/queries';
import { Group, Panel } from 'react-resizable-panels';

export const Route = createFileRoute('/admin/_adminLayout/about')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchAbout(context, params.projectId),
  head: () => ({
    meta: [
      {
        title: 'About',
      },
    ],
  }),
});

function RouteComponent() {
  const updateAboutMutation = useUpdateAboutMutation();
  const routeApi = getRouteApi('/admin/_adminLayout/about');
  const about = routeApi.useLoaderData();
  const text = parseJsonContent(about.text);

  const submit = (c?: JSONContent) => {
    if (!c) {
      return;
    }
    if (c === text) {
      return;
    }
    updateAboutMutation.mutate({
      text: JSON.stringify(c),
    });
  };

  const [content, setContent] = useState<JSONContent | undefined>(text);

  return (
    <>
      <Group>
        <Panel>
          <div className="flex flex-col border-r h-full border-r-fangchunjia-lightgray">
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
        <Panel />
      </Group>
    </>
  );
}
