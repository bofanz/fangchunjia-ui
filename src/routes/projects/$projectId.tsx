import Header from '@/components/Header'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'redaxios'
import type { Project } from '.'

export interface ProjectDetails extends Project {
  files: {
    name: string
    url: string
  }[]
}

export const fetchProject = async (projectId: string) => {
  return axios
    .get<ProjectDetails>(`https://api.fangchunjia.com/projects/${projectId}`)
    .then((r) => r.data)
}

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params: { projectId } }) => fetchProject(projectId),
})

function RouteComponent() {
  const project = Route.useLoaderData()
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="basis-1/3 p-8">
        <h1 className="text-xl">{project.name}</h1>
        <h2 className="text-lg">{project.year}</h2>
      </div>

      <div className="basis-2/3 bg-gray-100 h-screen overflow-y-auto">
        {project.files.map((file, index) => (
          <div key={index} className="">
            <p>{file.name}</p>
            <img
              src={`https://files.fangchunjia.com/${file.url}`}
              alt={`Project file ${index + 1}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </>
  )
}
