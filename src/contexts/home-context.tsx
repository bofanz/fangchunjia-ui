import { createContext } from "react";
import type { ProjectInfo } from "../pages/project/project";

export const HomeContext = createContext<{
  projectOnDisplay?: ProjectInfo | null;
  setProjectOnDisplay?: (project: ProjectInfo | null) => void;
}>({});
