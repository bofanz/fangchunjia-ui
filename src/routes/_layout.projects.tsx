import type { ProjectInfo } from '@/interfaces/project.interface';
import { createFileRoute, getRouteApi, Outlet } from '@tanstack/react-router';
import { useContext, useState } from 'react';
import Gallery from '@/components/Gallery';
import { fetchProjects, type QueryContext } from '@/utils/queries';
import Body from '@/components/Body';
import { MediaQueryContext } from '@/contexts/MediaQueryContext';
import ProjectList from '@/components/ProjectList';
import ProjectListMobile from '@/components/ProjectList.mobile';

export const Route = createFileRoute('/_layout/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as QueryContext),
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
  head: () => ({
    meta: [
      {
        title: 'Chunjia Fang (Projects)',
      },
    ],
  }),
});

function PendingComponent() {
  return (
    <>
      <Body>Fetching projects...</Body>
    </>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <>
      <Body>An error occurred when fetching the project: {error.message}</Body>
    </>
  );
}

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects');
  const { categories, projects } = routeApi.useLoaderData();

  const { isNotTouchDevice } = useContext(MediaQueryContext);

  const [hoveredProject, setHoveredProject] = useState<ProjectInfo | null>(
    null,
  );
  const categoriesAndProjects = categories.map((c) => ({
    ...c,
    projects: projects
      .filter((p) => 'CAT#' + p.categoryId === c.id)
      .sort((a, b) => b.year - a.year),
  }));

  return (
    <>
      <Body>
        <div className="fixed top-0 bottom-0 left-0 right-0">
          <Gallery
            media={projects
              .map((p) => p.cover)
              .filter((m) => m !== undefined && m !== null)}
            activeMediaKey={hoveredProject?.cover?.key}
          />
        </div>

        <div className="relative">
          {isNotTouchDevice ? (
            <ProjectList
              categoriesAndProjects={categoriesAndProjects}
              setHoveredProject={setHoveredProject}
            />
          ) : (
            <ProjectListMobile categoriesAndProjects={categoriesAndProjects} />
          )}
        </div>
      </Body>
      <Outlet />
    </>
  );
}
