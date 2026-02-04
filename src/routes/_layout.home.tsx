import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/home')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-fit h-full overflow-y-auto pt-60">
      <div className="w-64 sm:w-64 md:w-96 lg:w-128 pl-20 relative">
        <div className="pl-8 pr-12 pt-8 pb-4">Jiajia's Home</div>
      </div>
    </div>
  );
}
