import MediaGrid from '@/components/MediaGrid';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { fetchProject, type QueryContext } from '@/utils/queries';
import TiptapRenderer from '@/components/TiptapRenderer';
import { parseJsonContent } from '@/components/admin/Tiptap/parseJsonContent';
import { AnchorContext } from '@/contexts/AnchorContext';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Project, ProjectInfo } from '@/interfaces/project.interface';
import { useOutOfViewport } from '@/hooks/useOutOfViewport';
import { motion } from 'motion/react';
import { useViewport } from '@/hooks/useViewport';

export const Route = createFileRoute('/_layout/projects/$projectId')({
  component: RouteComponent,
  loader: ({ params, context }) =>
    fetchProject(context as QueryContext, params.projectId),
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Chunjia Fang (${loaderData?.name || 'Project'})`,
      },
    ],
  }),
  pendingMs: 0,
});

function PendingComponent() {
  return <div className="project">Fetching project...</div>;
}

function NotFoundComponent() {
  return <div className="project">Project not found</div>;
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="project">
      An error occurred when fetching the project: {error.message}
    </div>
  );
}

function ProjectText({ project, isOut }: { project: Project; isOut: boolean }) {
  const [pos, setPos] = useState<{
    top?: number;
    bottom?: number;
    left: number;
  } | null>(null);
  const lineHeight = 22;
  const paragraphSpaceBefore = 8;
  const paragraphSpaceAfter = 16;
  const { anchorRef } = useContext(AnchorContext);

  const { viewportHeight } = useViewport();

  useEffect(() => {
    if (!anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const anchorCenter = rect.top + rect.height / 2;
    const isLowerHalf = anchorCenter > viewportHeight / 2;
    if (isLowerHalf) {
      setPos({
        bottom: viewportHeight - rect.top + paragraphSpaceAfter,
        left: rect.left,
      });
    } else {
      setPos({
        top: rect.top + lineHeight + paragraphSpaceBefore,
        left: rect.left,
      });
    }
  }, []);

  if (!pos) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        ...(pos.top && { top: pos.top }),
        ...(pos.bottom && { bottom: pos.bottom }),
        left: pos.left,
        // TODO
        width: 300,
        zIndex: 10,
      }}
      animate={{
        opacity: isOut ? 1 : 0,
        display: isOut ? 'block' : 'none',
      }}
    >
      <span className="block leading-[22px]">{project.year}</span>
      {project.link && (
        <span className="block leading-[22px]">{project.link}</span>
      )}
      <TiptapRenderer content={parseJsonContent(project.description)} />
    </motion.div>
  );
}

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/projects/$projectId');
  const project = routeApi.useLoaderData();
  const projectTextRef = useRef(null);

  const isOut = useOutOfViewport(projectTextRef);

  return (
    <>
      <ProjectText project={project} isOut={isOut} />
      <div className="content project">
        <div className="">
          <div ref={projectTextRef}>
            {/* <h1 className="text-xl font-bold">{project.name}</h1> */}
            <h2 className="text-lg">{project.year}</h2>
            <div>{project.link}</div>
            <div>
              <TiptapRenderer content={parseJsonContent(project.description)} />
            </div>
          </div>
          <div className="pt-4 pb-8">
            <MediaGrid
              media={project.media}
              mediaLayout={project.mediaLayout}
            />
          </div>
        </div>
      </div>
    </>
  );
}
