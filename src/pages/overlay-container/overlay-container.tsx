import { About } from "../about/about";
import { useState } from "react";
import OverlayMenu from "../../components/overlay-menu/overlay-menu";
import Overlay from "../../components/overlay/overlay";
import Projects from "../projects/projects";
import type { ProjectInterface } from "../project/project";

export type OverlayContainerItem = null | "about" | "projects";

export default function OverlayContainer({
  projects,
}: {
  projects?: ProjectInterface[];
}) {
  const [activeOverlay, setActiveOverlay] =
    useState<OverlayContainerItem>(null);
  return (
    <>
      <OverlayMenu
        overlays={[
          { label: "about", value: "about" },
          { label: "projects", value: "projects" },
        ]}
        setActiveOverlay={setActiveOverlay}
        activeOverlay={activeOverlay}
      />
      <Overlay
        position="left"
        open={activeOverlay == "about"}
        onClose={() => setActiveOverlay(null)}
      >
        <About />
      </Overlay>
      <Overlay
        position="right"
        open={activeOverlay == "projects"}
        onClose={() => setActiveOverlay(null)}
      >
        <Projects projects={projects} />
      </Overlay>
    </>
  );
}
