import { Link } from "react-router";
import type { ProjectInfo } from "../project/project";

export default function Projects({ projects }: { projects?: ProjectInfo[] }) {
  return (
    <>
      <ul className="text-2xl text-cherry-lamp-pink">
        {projects?.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
