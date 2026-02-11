import type { ProjectInfo } from '@/interfaces/project.interface';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'motion/react';
import Gallery from '@/components/Gallery';
import { fetchProjects } from '@/utils/queries';
import Body from '@/components/Body';

export const Route = createFileRoute('/_layout/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects');
  const { categories, projects } = routeApi.useLoaderData();
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
          <ul className="text-xl text-cherry-lamp-pink">
            {categoriesAndProjects.map((c) => (
              <li key={c.id} className="mb-4">
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
                          whileHover={{
                            color: 'var(--color-fangchunjia-pink)',
                            transition: { duration: 0.1 },
                          }}
                          className="flex gap-2"
                          onMouseEnter={() => setHoveredProject(p)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          <span className="inline-block min-w-12">
                            {p.year}
                          </span>
                          <span className="inline-block">{p.name}</span>
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <ul className="text-xl text-cherry-lamp-pink">
            {categoriesAndProjects.map((c) => (
              <li key={c.id} className="mb-4">
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
                          whileHover={{
                            color: 'var(--color-fangchunjia-pink)',
                            transition: { duration: 0.1 },
                          }}
                          className="w-fit h-fit"
                          onMouseEnter={() => setHoveredProject(p)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          {p.year} {p.name}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <ul className="text-xl text-cherry-lamp-pink">
            {categoriesAndProjects.map((c) => (
              <li key={c.id} className="mb-4">
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
                          whileHover={{
                            color: 'var(--color-fangchunjia-pink)',
                            transition: { duration: 0.1 },
                          }}
                          className="w-fit h-fit"
                          onMouseEnter={() => setHoveredProject(p)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          {p.year} {p.name}
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
