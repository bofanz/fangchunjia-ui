import MediaGrid from '@/components/MediaGrid';
import Overlay from '@/components/Overlay';
import type { Project } from '@/interfaces/project.interface';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import axios from 'redaxios';

export const fetchProject = async (
  context: { portfolioApi: string },
  projectId: string,
) => {
  const project = await axios
    .get<Project>(`${context.portfolioApi}/projects/${projectId}`)
    .then((r) => r.data);
  return project;
};

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/projects/$projectId');
  const project = routeApi.useLoaderData();

  return (
    <Overlay navigateTo='/projects'>
      <div className='pl-[36%]'>

        <div className="">
          <div className="basis-2/5 pl-4 pr-24 pt-16 pb-4">
            <h1 className="text-xl">{project.name}</h1>
            <h2 className="text-lg">{project.year}</h2>
            <div>{project.link}</div>
            <div>{project.description}</div>
          </div>
        </div>

        <div className='pl-4 pr-64 pt-4 pb-8'>
          <MediaGrid items={project.files} />
        </div>
      </div>
      
      {/* {project.files.map(f => <div>{f.key}</div>)} */}
      {/* <div className='flex flex-col gap-16'>
              {project.files.map((f) => (<div key={f.key}>
        <div className='pl-[400px]'>
<img
              src={`https://files.fangchunjia.com/${f.key}`}
              className="w-full h-full object-cover"
            />
        </div>
        
      </div>
    ))}
      </div> */}

        </Overlay>
    
  );
}
