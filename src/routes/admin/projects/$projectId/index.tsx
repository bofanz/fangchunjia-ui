import {
  createFileRoute,
  getRouteApi,
  Link,
  notFound,
} from '@tanstack/react-router';
import type { Project } from '@/interfaces/project.interface';
import axios, { AxiosError } from 'axios';
import Body from '@/components/Body';
import TextEditor from '@/components/lexical/TextEditor';
import ProjectForm from '@/components/admin/ProjectForm';
import MediaGridEditor from '@/components/admin/MediaGridEditor';
import AdminHeader from '@/components/admin/AdminHeader';
import { fetchProject } from '@/utils/queries';
import TextRenderer from '@/components/lexical/TextRenderer';
import { parseEditorState } from '@/components/lexical/utils';

export const Route = createFileRoute('/admin/projects/$projectId/')({
  component: RouteComponent,
  // @ts-ignore
  loader: ({ params, context }) => fetchProject(context, params.projectId),
});

function RouteComponent() {
  const routeApi = getRouteApi('/admin/projects/$projectId/');
  const project = routeApi.useLoaderData();

  return (
    <>
      <AdminHeader label={`Edit: ${project.name}`} />
      <Body>
        <div className="flex flex-col gap-1">
          <div className="p-4 bg-black/5">
            <div className="flex justify-between">
              <div className="font-bold">Info</div>
              <Link
                to="/admin/projects/$projectId/info"
                params={{ projectId: project.id }}
              >
                Edit
              </Link>
            </div>
            <div>
              <div>ID</div>
              <div>{project.id}</div>
            </div>
            <div>
              <div>Name</div>
              <div>{project.name}</div>
            </div>
            <div>
              <div>Category</div>
              <div>{project.categoryId}</div>
            </div>
            <div>
              <div>Year</div>
              <div>{project.year}</div>
            </div>
            <div>
              <div>Link</div>
              <div>{project.link}</div>
            </div>
          </div>
          <div className="p-4 bg-black/5">
            <div className="flex justify-between">
              <div className="font-bold">Description</div>
              <Link
                to="/admin/projects/$projectId/description"
                params={{ projectId: project.id }}
              >
                Edit
              </Link>
            </div>
            <TextRenderer editorState={parseEditorState(project.description)} />
          </div>
          <div className="p-4 bg-black/5">
            <div className="flex justify-between">
              <div className="font-bold">Medias</div>
              <Link
                to="/admin/projects/$projectId/medias"
                params={{ projectId: project.id }}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* <ProjectForm /> */}
        {/* <div className="space-y-4">
          <MediaUploader projectId="a" />
        </div> */}
        {/* <MediaGridEditor initialMedias={project.files} /> */}
        {/* <TextEditor /> */}
      </Body>
    </>
  );
}
