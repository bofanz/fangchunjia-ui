import "./index.css";
import ReactDOM, { type Container } from "react-dom/client";
import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import Home from "./pages/home/home.tsx";
import Project from "./pages/project/project.tsx";
import { ApiContext } from "./contexts/api-context.tsx";

const root = document.getElementById("root") as Container;

ReactDOM.createRoot(root).render(
  <ApiContext
    value={{
      apiHost: "https://api.fangchunjia.com",
      fileHost: "https://fs.fangchunjia.com",
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="projects/:projectId" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </ApiContext>
);
