import Body from '@/components/Body';
import { fetchAboutMd } from '@/utils/queries';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import Markdown from 'react-markdown';

export const Route = createFileRoute('/_layout/about')({
  component: RouteComponent,
  loader: ({ context }) => fetchAboutMd(context as { filesApi: string }),
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
  const aboutMd = routeApi.useLoaderData();

  return (
    <>
      <Body>
        <div className="w-full">
          <section className="markdown">
            <Markdown>{aboutMd}</Markdown>
          </section>
        </div>
      </Body>
    </>
  );
}
