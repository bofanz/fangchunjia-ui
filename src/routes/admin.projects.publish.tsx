import Pane from '@/components/admin/Pane';
import ProjectForm from '@/components/admin/ProjectForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/projects/publish')({
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
    <Pane>
      <div className="p-4">
        <ProjectForm />
      </div>
    </Pane>
  );
}
