import Breeze from '@/components/Breeze';
import Gallery from '@/components/Gallery';
import { fetchProjects } from '@/utils/queries';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/home')({
  component: RouteComponent,
  loader: ({ context }) => fetchProjects(context as { portfolioApi: string }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/home');
  const highlights = routeApi
    .useLoaderData()
    .projects.filter((p) => p.highlighted);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hoveredHighlight =
    hoveredIndex !== null && hoveredIndex < highlights.length
      ? highlights[hoveredIndex]
      : null;

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0">
        <Gallery
          medias={highlights
            .filter((p) => p.coverKey)
            .map((p) => ({
              url: 'https://files.fangchunjia.com/' + p.coverKey,
            }))}
          activeMedia={
            'https://files.fangchunjia.com/' + hoveredHighlight?.coverKey
          }
        />
      </div>
      <div className="w-full h-full overflow-clip flex justify-center">
        <Breeze setHoveredIndex={setHoveredIndex} />
      </div>
    </>
  );
}
