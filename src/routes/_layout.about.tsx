import Body from '@/components/Body';
import { fetchAbout } from '@/utils/queries';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import TiptapRenderer from '@/components/TiptapRenderer';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';

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

  return (
    <>
      <Body>
        <div className="w-full">
          <section>
            <TiptapRenderer content={parseJsonContent(about.text)} />
          </section>
        </div>
      </Body>
    </>
  );
}
