import type { ProjectInfo } from '@/interfaces/project.interface';
import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

function ProjectListItem({
  project,
  setHoveredProject,
}: {
  project: ProjectInfo;
  setHoveredProject: Function;
}) {
  return (
    <>
      <Link
        to={'/projects/$projectId'}
        className="cursor-pointer h-full w-fit block"
        params={{
          projectId: project.id,
        }}
      >
        <motion.div
          whileHover={{
            color: 'var(--color-fangchunjia-pink)',
            transition: { duration: 0.1 },
          }}
          className="flex gap-2 active:text-fangchunjia-pink font-medium"
          onMouseEnter={() => setHoveredProject(project)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <span className="inline-block leading-[22px]">{project.name}</span>
        </motion.div>
      </Link>
    </>
  );
}

export default function ProjectList({
  categoriesAndProjects,
  setHoveredProject,
}: {
  categoriesAndProjects: {
    projects: ProjectInfo[];
    id: string;
    name: string;
  }[];
  setHoveredProject: Function;
}) {
  return (
    <>
      <ul className="text-cherry-lamp-pink">
        {categoriesAndProjects.map((c) => (
          <li key={c.id} className="mb-6">
            <div className="font-bold">{c.name}</div>
            <ul>
              {c.projects.map((p) => (
                <li key={p.id}>
                  <ProjectListItem
                    project={p}
                    setHoveredProject={setHoveredProject}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
