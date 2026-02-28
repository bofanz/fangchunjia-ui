import AdminHeader from '@/components/admin/AdminHeader';
import Body from '@/components/Body';
import TextEditor from '@/components/lexical/TextEditor';
import { parseEditorState } from '@/components/lexical/utils';
import { fetchAbout } from '@/utils/queries';
import { useUpdateAboutMutation } from '@/utils/queryOptions';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import type { EditorState } from 'lexical';
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
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    parseEditorState(about.text),
  );
  return (
    <>
      <AdminHeader label={`Edit: About`} />
      <Body>
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <button
          className="px-4 py-2 bg-black hover:bg-fangchunjia-pink text-white transition"
          onClick={() => {
            // console.log(editorState);
            updateAboutMutation.mutate({
              text: JSON.stringify(editorState?.toJSON()),
            });
          }}
        >
          Save
        </button>
      </Body>
    </>
  );
}
