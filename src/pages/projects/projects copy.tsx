// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router";
// import { ApiContext } from "../../contexts/api-context";
// import type { ProjectInterface } from "../project/project";

// export default function Projects({
//   projects,
// }: {
//   projects?: ProjectInterface[];
// }) {
//   // const [projects, setProjects] = useState<object[]>([]);
//   // const { apiHost, fileHost } = useContext(ApiContext);

//   // useEffect(() => {
//   //   async function fetchProjects() {
//   //     try {
//   //       const response = await fetch("https://api.fangchunjia.com/projects", {
//   //         method: "GET",
//   //       });
//   //       if (!response.ok) {
//   //         throw new Error("Network response was not ok");
//   //       }
//   //       const data = await response.json();
//   //       setProjects(data);
//   //     } catch (error) {
//   //       console.error("Failed to fetch projects:", error);
//   //     }
//   //   }
//   //   fetchProjects();
//   // }, []);
//   if (!projects || projects.length === 0) {
//     return <></>;
//   }
//   return (
//     <>
//       <ul className="text-2xl text-cherry-lamp-pink">
//         {projects.map((project) => (
//           <li key={project.id}>
//             <Link to={`/projects/${project.id}`}>{project.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
