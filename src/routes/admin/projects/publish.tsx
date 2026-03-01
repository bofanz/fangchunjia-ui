import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';
import Body from '@/components/Body';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/projects/publish')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AdminHeader label="Publish" />
      <Body>
        <div className="pt-4">
          <ProjectForm />
        </div>
      </Body>
    </>
  );
}
