import type { ProjectInfo } from '@/interfaces/project.interface';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { useContext, useState } from 'react';
import { motion } from 'motion/react';
import Gallery from '@/components/Gallery';
import { fetchProjects } from '@/utils/queries';
import Body from '@/components/Body';
import { MediaQueryContext } from '@/contexts/MediaQueryContext';

export const Route = createFileRoute('/_layout/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
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
            medias={projects
              .filter((p) => p.coverKey)
              .map((p) => ({
                url: 'https://files.fangchunjia.com/' + p.coverKey,
              }))}
            activeMedia={
              'https://files.fangchunjia.com/' + hoveredProject?.coverKey
            }
          />
        </div>

        <div className="relative">
          <ul className="text-cherry-lamp-pink">
            {categoriesAndProjects.map((c) => (
              <li key={c.id} className="mb-6">
                <div className="font-bold">{c.name}</div>
                <ul>
                  {c.projects.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={'/projects/$projectId'}
                        className="cursor-pointer h-full w-fit block"
                        params={{
                          projectId: p.id,
                        }}
                      >
                        <motion.div
                          whileHover={
                            isNotTouchDevice
                              ? {
                                  color: 'var(--color-fangchunjia-pink)',
                                  transition: { duration: 0.1 },
                                }
                              : undefined
                          }
                          className="flex gap-2 active:text-fangchunjia-pink font-medium"
                          onMouseEnter={
                            isNotTouchDevice
                              ? () => setHoveredProject(p)
                              : undefined
                          }
                          onMouseLeave={
                            isNotTouchDevice
                              ? () => setHoveredProject(null)
                              : undefined
                          }
                        >
                          <span className="inline-block leading-[22px]">
                            {p.name}
                          </span>
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Body>
      <Outlet />
    </>
  );
}
