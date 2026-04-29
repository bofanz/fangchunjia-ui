import type { ProjectInfo } from '@/interfaces/project.interface';
import {
  createFileRoute,
  ErrorComponent,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { useContext, useState } from 'react';
import { motion } from 'motion/react';
import Gallery from '@/components/Gallery';
import { fetchProjects, type QueryContext } from '@/utils/queries';
import { MediaQueryContext } from '@/contexts/MediaQueryContext';
import { PendingComponent } from '@/components/PendingComponent';

export const Route = createFileRoute('/_layout/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as QueryContext),
  pendingComponent: () => <PendingComponent />,
  errorComponent: (error) => <ErrorComponent error={error.error} />,
  head: () => ({
    meta: [
      {
        title: 'Chunjia Fang (Projects)',
      },
    ],
  }),
});

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
      <section className="section grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="fixed top-0 bottom-0 left-0 right-0 -z-1">
          <Gallery
            media={projects
              .map((p) => p.cover)
              .filter((m) => m !== undefined && m !== null)}
            activeMediaKey={hoveredProject?.cover?.key}
          />
        </div>
        <div className="project-list">
          <div className="sticky top-(--section-top-spacing)">
            <div className="content">
              <ul className="">
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
          </div>
        </div>

        <Outlet />
      </section>
    </>
  );
}
