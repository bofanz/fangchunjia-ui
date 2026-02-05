import type { Category, ProjectInfo } from '@/interfaces/project.interface';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { useState } from 'react';
import axios from 'redaxios';
import { motion } from 'motion/react';
import Gallery from '@/components/Gallery';

export const fetchProjects = async (context: { portfolioApi: string }) => {
  const categories = await axios
    .get<Category[]>(`${context.portfolioApi}/project-categories`)
    .then((r) => r.data);
  const projects = await axios
    .get<ProjectInfo[]>(`${context.portfolioApi}/projects`)
    .then((r) => r.data);
  return {
    categories: categories,
    projects: projects,
  };
};

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
    projects: projects.filter((p) => 'CAT#' + p.categoryId === c.id),
  }));
  return (
    <>
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

      <div className="fixed h-full w-fit overflow-y-auto pt-60 [scrollbar-width:none]">
        <div className="w-64 sm:w-64 md:w-96 lg:w-128 pl-20 relative">
          <div className="pl-8 pr-12 pt-8 pb-4">
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
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
