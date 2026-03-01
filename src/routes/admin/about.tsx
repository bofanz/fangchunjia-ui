import AdminHeader from '@/components/admin/AdminHeader';
import Body from '@/components/Body';
import Editor from '@/components/Tiptap';
import { parseJsonContent } from '@/components/Tiptap/parseJsonContent';
import { fetchAbout } from '@/utils/queries';
import { useUpdateAboutMutation } from '@/utils/queryOptions';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import type { JSONContent } from '@tiptap/react';
import { useState } from 'react';

export const Route = createFileRoute('/admin/about')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchAbout(context, params.projectId),
});

function RouteComponent() {
  const updateAboutMutation = useUpdateAboutMutation();
  const routeApi = getRouteApi('/admin/about');
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
      <AdminHeader label={`Edit: About`} />
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
