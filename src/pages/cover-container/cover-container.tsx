import { useContext } from "react";
import { ApiContext } from "../../contexts/api-context";
import type { ProjectInfo } from "../project/project";

export function CoverContainer({ project }: { project: ProjectInfo | null }) {
  const { fileHost } = useContext(ApiContext);
  if (!project) {
    return <></>;
  }
  return (
    <div className="w-full h-full absolute overflow-clip">
      <div
        className="absolute w-full text-center font-bodebeck"
        style={{ color: "#fdf150" }}
      >
        {project.name}
      </div>
      <img
        src={`${fileHost}/${project.cover.path}`}
        alt={`Project Cover`}
        className="w-full"
      />
    </div>
  );
}
