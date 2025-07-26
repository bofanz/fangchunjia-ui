import { useContext } from "react";
import { ApiContext } from "../../contexts/api-context";
import type { ProjectInterface } from "../project/project";

export function CoverContainer({
  project,
}: {
  project: ProjectInterface | null;
}) {
  const { fileHost } = useContext(ApiContext);

  if (!project) {
    return <></>;
  }
  return (
    <div className="w-full h-full absolute overflow-clip">
      <div className="absolute">{project.name}</div>
      <img
        src={`${fileHost}/${project.cover.path}`}
        alt={`Project Cover`}
        className="w-full"
      />
    </div>
  );
}
