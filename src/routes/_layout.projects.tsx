import type { ProjectInfo } from '@/interfaces/project.interface';
import {
  createFileRoute,
  ErrorComponent,
  getRouteApi,
  Link,
  Outlet,
  useMatch,
} from '@tanstack/react-router';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
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
  const [lockedItem, setLockedItem] = useState<{
    project: ProjectInfo;
    top: number;
    left: number;
  } | null>(null);

  const match = useMatch({
    from: '/_layout/projects/$projectId',
    shouldThrow: false,
  });
  const activeProjectId = match?.params.projectId ?? null;

  const categoriesAndProjects = categories.map((c) => ({
    ...c,
    projects: projects
      .filter((p) => 'CAT#' + p.categoryId === c.id)
      .sort((a, b) => b.year - a.year),
  }));

  const projectListItemRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  const handleProjectClick = (p: ProjectInfo) => {
    const el = projectListItemRefs.current.get(p.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      setLockedItem({ project: p, top: rect.top, left: rect.left });
    }
  };

  const cloneSpanRef = useRef<HTMLSpanElement>(null);

  // Clear locked item when navigating back to the list
  useLayoutEffect(() => {
    if (activeProjectId && lockedItem) {
      window.scrollTo({ top: lockedItem.top, behavior: 'instant' });
    }
  }, [activeProjectId]);

  return (
    <>
      {activeProjectId && lockedItem && (
        <div
          style={{
            position: 'fixed',
            top: lockedItem.top,
            left: lockedItem.left,
          }}
          className="font-medium text-fangchunjia-pink"
        >
          <span ref={cloneSpanRef} className="block leading-[22px]">
            {lockedItem.project.name}
          </span>
        </div>
      )}
      <section className="section grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="fixed top-0 bottom-0 left-0 right-0 -z-1">
          <Gallery
            media={projects
              .map((p) => p.cover)
              .filter((m) => m !== undefined && m !== null)}
            activeMediaKey={hoveredProject?.cover?.key}
          />
        </div>

        {/* List — hidden when a project is active */}
        <div
          className="col-span-full row-start-1 col-start-1 pt-(--section-top-spacing)"
          style={{ display: activeProjectId ? 'none' : undefined }}
        >
          <div className="content">
            <ul>
              {categoriesAndProjects.map((c) => (
                <li key={c.id} className="mb-6">
                  <div className="font-bold">{c.name}</div>
                  <ul>
                    {c.projects.map((p) => (
                      <li key={p.id}>
                        <Link
                          to="/projects/$projectId"
                          className="cursor-pointer h-full w-fit block"
                          params={{ projectId: p.id }}
                          onClick={() => handleProjectClick(p)}
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
                            ref={(el) => {
                              if (el) projectListItemRefs.current.set(p.id, el);
                            }}
                            className="flex gap-2 active:text-fangchunjia-pink font-medium mb-0 py-0"
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
                            <span className="block leading-[22px]">
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

        <Outlet />
      </section>
    </>
  );
}
