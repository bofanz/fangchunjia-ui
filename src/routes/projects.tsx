import HomeButton from '@/components/HomeButton';
import GradientOverlay from '@/components/GradientOverlay';
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

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/projects');
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
      <HomeButton />
      <div className="fixed top-0 bottom-0 left-0 right-0">
        <Gallery
          medias={projects.map((p) => ({
            url: 'https://files.fangchunjia.com/' + p.coverKey,
          }))}
          activeMedia={
            'https://files.fangchunjia.com/' + hoveredProject?.coverKey
          }
        />
      </div>
      <GradientOverlay title="Projects" showOverlay={!hoveredProject?.coverKey}>
        <div className="z-20 relative">
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
      </GradientOverlay>
      <Outlet />
    </>
  );
}
