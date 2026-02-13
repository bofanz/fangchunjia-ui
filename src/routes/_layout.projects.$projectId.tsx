import MediaGrid from '@/components/MediaGrid';
import {
  createFileRoute,
  getRouteApi,
  useCanGoBack,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { ScrollWrapper } from '@/components/ScrollWrapper';
import { fetchProject } from '@/utils/queries';
import Layer from '@/components/Layer';

export const Route = createFileRoute('/_layout/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as { portfolioApi: string }, params.projectId),
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Chunjia Fang (${loaderData?.name || 'Project'})`,
      },
    ],
  }),
  pendingMs: 500,
});

function PendingComponent() {
  return (
    <>
      <Layer>
        <div className="flex justify-end min-h-screen">
          <div className="flex flex-col p-8 w-full md:w-5/8">
            <div>
              <div className="pb-4">Fetching project...</div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

function NotFoundComponent() {
  return (
    <>
      <Layer>
        <div className="flex justify-end min-h-screen">
          <div className="flex flex-col p-8 w-full md:w-5/8">
            <div>
              <div className="pt-16 pb-4">Project not found</div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <Layer>
        <div className="flex justify-end min-h-screen">
          <div className="flex flex-col p-8 w-full md:w-5/8">
            <div>
              <div className="pt-16 pb-4">
                An error occurred when fetching the project: {error.message}
              </div>
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects/$projectId');
  const project = routeApi.useLoaderData();

  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  return (
    <Layer>
      <ScrollWrapper>
        <div className="flex justify-end min-h-screen md:px-16 ">
          <div className="flex flex-col p-8 w-full md:w-5/8">
            <div>
              <button
                className="hover:text-fangchunjia-pink active:text-fangchunjia-pink transition"
                onClick={() =>
                  canGoBack ? router.history.back() : navigate({ to: '..' })
                }
              >
                Back
              </button>
            </div>
            <div className="pt-16 pb-4">
              <h1 className="text-xl font-bold">{project.name}</h1>
              <h2 className="text-lg">{project.year}</h2>
              <div>{project.link}</div>
              <div>{project.description}</div>
            </div>

            <div className="pt-4 pb-8 w-full sm:w-4/5">
              <MediaGrid items={project.files} />
            </div>
          </div>
        </div>
      </ScrollWrapper>
    </Layer>
  );
}
