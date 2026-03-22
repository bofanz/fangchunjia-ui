import ProjectForm from '@/components/admin/ProjectForm';
import { createFileRoute } from '@tanstack/react-router';
import { Panel } from 'react-resizable-panels';

export const Route = createFileRoute('/admin/_adminLayout/projects/publish')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Publish',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <Panel>
      <ProjectForm />
    </Panel>
  );
}
