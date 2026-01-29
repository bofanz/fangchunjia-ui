import LayerGradient from '@/components/LayerGradient';
import {
  createFileRoute,
  getRouteApi,
  Link,
  Outlet,
  useParams,
} from '@tanstack/react-router';
import { useState } from 'react';
import axios from 'redaxios';

export interface Project {
  id: string;
  name: string;
  year: number;
  categoryId: string;
  coverKey: string;
  link?: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
}

export const fetchProjects = async () => {
  const categories = await axios
    .get<Category[]>('https://api.fangchunjia.com/project-categories')
    .then((r) => r.data);
  const projects = await axios
    .get<Project[]>('https://api.fangchunjia.com/projects')
    .then((r) => r.data);
  return {
    categories: categories,
    projects: projects,
  };
};

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
  loader: () => fetchProjects(),
});

function RouteComponent() {
  const routeApi = getRouteApi('/projects');
  const { categories, projects } = routeApi.useLoaderData();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const categoriesAndProjects = categories.map((c) => ({
    ...c,
    projects: projects.filter((p) => 'CAT#' + p.categoryId === c.id),
  }));
  return (
    <>
      <div className="bg-[url(/background.jpg)] bg-cover h-full">
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
      </div>
    </>
  );
}
