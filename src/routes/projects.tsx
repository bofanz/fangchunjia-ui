import HomeButton from '@/components/HomeButton';
import LayerGradient from '@/components/LayerGradient';
import Overlay from '@/components/Overlay';
import type { Category, ProjectInfo } from '@/interfaces/project.interface';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
} from '@tanstack/react-router';
import { useState } from 'react';
import axios from 'redaxios';

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
  // @ts-ignore
  loader: ({ context }) => fetchProjects(context),
});

function RouteComponent() {
  const routeApi = getRouteApi('/projects');
  const { categories, projects } = routeApi.useLoaderData();
  const [hoveredProject, setHoveredProject] = useState<ProjectInfo | null>(null);
  const categoriesAndProjects = categories.map((c) => ({
    ...c,
    projects: projects.filter((p) => 'CAT#' + p.categoryId === c.id),
  }));
  return (
    <>
    <Overlay>
      <HomeButton />
        <LayerGradient
          title="Projects"
          backgroundUrl={hoveredProject?.coverKey}
        >
          <ul className="text-xl text-cherry-lamp-pink z-20">
            {categoriesAndProjects.map((c) => (
              <li key={c.id} className="mb-4">
                <div className="font-bold">{c.name}</div>
                <ul>
                  {c.projects.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={'/projects/$projectId'}
                        className="cursor-pointer hover:text-fangchunjia-pink"
                        params={{
                          projectId: p.id,
                        }}
                        onMouseEnter={() => setHoveredProject(p)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        {p.year} {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </LayerGradient>
        <Outlet />
    </Overlay>
    </>
  );
}
