import { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../contexts/api-context";
import CherryLampContainer from "../cherry-lamp-container.tsx/cherry-lamp-container";
import { CoverContainer } from "../cover-container/cover-container";
import OverlayContainer from "../overlay-container/overlay-container";
import { HomeContext } from "../../contexts/home-context";
import type { ProjectInfo } from "../project/project";

export default function Home() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [projectOnDisplay, setProjectOnDisplay] = useState<ProjectInfo | null>(
    null
  );
  const { apiHost } = useContext(ApiContext);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${apiHost}/projects`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HomeContext
        value={{
          projectOnDisplay,
          setProjectOnDisplay,
        }}
      >
        <CoverContainer project={projectOnDisplay} />
        <OverlayContainer projects={projects} />
        <CherryLampContainer cherries={projects} project={projectOnDisplay} />
      </HomeContext>
    </>
  );
}
