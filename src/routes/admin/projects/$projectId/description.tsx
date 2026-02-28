import AdminHeader from '@/components/admin/AdminHeader';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject } from '@/utils/queries';
import TextEditor from '@/components/lexical/TextEditor';
import Body from '@/components/Body';
import { useState } from 'react';
import type { EditorState } from 'lexical';
import { useUpdateProjectMutation } from '@/utils/queryOptions';
import { parseEditorState } from '@/components/lexical/utils';

export const Route = createFileRoute('/admin/projects/$projectId/description')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const updateProjectMutation = useUpdateProjectMutation();
  const routeApi = getRouteApi('/admin/projects/$projectId/description');
  const project = routeApi.useLoaderData();
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    parseEditorState(project.description),
  );
  return (
    <>
      <AdminHeader label={`Edit: ${project.name} - Description`} />
      <Body>
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <button
          className="px-4 py-2 bg-black hover:bg-fangchunjia-pink text-white transition"
          onClick={() => {
            updateProjectMutation.mutate({
              id: project.id,
              description: JSON.stringify(editorState?.toJSON()),
            });
          }}
        >
          Save
        </button>
      </Body>
    </>
  );
}
