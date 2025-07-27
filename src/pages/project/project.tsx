import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ApiContext } from "../../contexts/api-context";

export interface ProjectInfo {
  id: string;
  name: string;
  brief: string;
  cover: FileMetadataInterface;
}

export interface ProjectDetails extends ProjectInfo {
  description: string;
  files: FileMetadataInterface[];
}

export interface FileMetadataInterface {
  id: string;
  name: string;
  path: string;
}

export default function Project() {
  const { projectId } = useParams();
  const { apiHost, fileHost } = useContext(ApiContext);
  const [project, setProject] = useState<ProjectDetails>();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${apiHost}/projects/${projectId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("response", response);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    fetchProjects();
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex font-bodebeck">
        <div className="basis-1/3 p-8">
          <h1 className="text-3xl">{project.name}</h1>
          <h2 className="text-2xl">{project.brief}</h2>
          <h2 className="text-2xl">{project.description}</h2>
        </div>

        <div className="basis-2/3 bg-gray-100 h-screen overflow-y-auto">
          {project.files.map((file, index) => (
            <div key={index} className="">
              <img
                src={`${fileHost}/${file.path}`}
                alt={`Project file ${index + 1}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
