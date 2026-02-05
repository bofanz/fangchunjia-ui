import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import axios from 'redaxios';

export const fetchAboutMd = async (context: { filesApi: string }) => {
  const aboutMd = await axios
    .get(`${context.filesApi}/about/about.md`)
    .then((r) => r.data);
  return aboutMd;
};

export const Route = createFileRoute('/_layout/about')({
  component: RouteComponent,
  loader: ({ context }) => fetchAboutMd(context as { filesApi: string }),
});

function RouteComponent() {
  const routeApi = getRouteApi('/_layout/about');
  const aboutMd = routeApi.useLoaderData();

  return (
    <>
      <div className="fixed w-fit h-full overflow-y-auto pt-60 [scrollbar-width:none]">
        <div className="w-64 sm:w-64 md:w-160 lg:w-192 pl-20 relative">
          <div className="pl-8 pr-12 pt-8 pb-36">
            <section className="markdown">
              <Markdown>{aboutMd}</Markdown>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
