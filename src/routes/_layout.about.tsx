import Body from '@/components/Body';
import TextRenderer from '@/components/lexical/TextRenderer';
import { parseEditorState } from '@/components/lexical/utils';
import { fetchAbout } from '@/utils/queries';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import type { EditorState } from 'lexical';
import { useState } from 'react';
import Markdown from 'react-markdown';

export const Route = createFileRoute('/_layout/about')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchAbout(context, params.projectId),
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
  head: () => ({
    meta: [
      {
        title: `Chunjia Fang (About)`,
      },
    ],
  }),
});

function PendingComponent() {
  return (
    <>
      <Body>Fetching about...</Body>
    </>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <Body>An error occurred when fetching about: {error.message}</Body>
    </>
  );
}

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/about');
  const about = routeApi.useLoaderData();
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    parseEditorState(about.text),
  );

  return (
    <>
      <Body>
        <div className="w-full">
          <section className="markdown">
            <TextRenderer editorState={JSON.parse(about.text)} />
          </section>
        </div>
      </Body>
    </>
  );
}
