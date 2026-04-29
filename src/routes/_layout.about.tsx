import { fetchAbout } from '@/utils/queries';
import {
  createFileRoute,
  ErrorComponent,
  getRouteApi,
} from '@tanstack/react-router';
import TiptapRenderer from '@/components/TiptapRenderer';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import { PendingComponent } from '@/components/PendingComponent';

export const Route = createFileRoute('/_layout/about')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchAbout(context, params.projectId),
  pendingComponent: () => <PendingComponent />,
  errorComponent: (error) => <ErrorComponent error={error.error} />,
  head: () => ({
    meta: [
      {
        title: `Chunjia Fang (About)`,
      },
    ],
  }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/about');
  const about = routeApi.useLoaderData();

  return (
    <>
      <section className="section">
        <div className="about">
          <div className="content">
            <TiptapRenderer content={parseJsonContent(about.text)} />
          </div>
        </div>
      </section>
    </>
  );
}
