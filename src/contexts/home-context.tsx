import { createContext } from "react";
import type { ProjectInterface } from "../pages/project/project";

export const HomeContext = createContext<{
  projectOnDisplay?: ProjectInterface | null;
  setProjectOnDisplay?: (project: ProjectInterface | null) => void;
}>({});
