import Body from '@/components/Body';
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
      <Body>
        <div className="w-full md:w-5/8">
          <section className="markdown">
            <Markdown>{aboutMd}</Markdown>
          </section>
        </div>
      </Body>
    </>
  );
}
