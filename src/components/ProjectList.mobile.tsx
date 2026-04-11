import type { ProjectInfo } from '@/interfaces/project.interface';
import { Link } from '@tanstack/react-router';
import MediaRenderer from './MediaRenderer';

function ProjectListItemMobile({ project }: { project: ProjectInfo }) {
  return (
    <>
      <Link
        to={'/projects/$projectId'}
        className="cursor-pointer w-full aspect-square block bg-red-100 relative"
        params={{
          projectId: project.id,
        }}
      >
        {project.cover && (
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <MediaRenderer media={project.cover} />
          </div>
        )}
        <div className="flex active:text-fangchunjia-pinkrelative relative w-full h-full">
          <div className="bg-white h-fit w-fit m-auto">
            <span className="font-medium inline-block leading-[22px]">
              {project.name}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default function ProjectListMobile({
  categoriesAndProjects,
}: {
  categoriesAndProjects: {
    projects: ProjectInfo[];
    id: string;
    name: string;
  }[];
}) {
  return (
    <>
      <ul className="text-cherry-lamp-pink">
        {categoriesAndProjects.map((c) => (
          <li key={c.id} className="mb-6">
            <div className="font-bold mb-2">{c.name}</div>
            <ul>
              {c.projects.map((p) => (
                <>
                  <li key={p.id} className="not-last:mb-4">
                    <ProjectListItemMobile project={p} />
                  </li>
                </>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
