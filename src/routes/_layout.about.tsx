import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'react-markdown';

export const Route = createFileRoute('/_layout/about')({
  component: RouteComponent,
});

function RouteComponent() {
  const aboutMarkdown =
    'Fang Chunjia is a multidisciplinary graphic designer. Her practice is all about creating texts, images and moving visuals that speak through narrative. \n \n [@elephanntt](https://www.instagram.com/elephanntt) \n \n[fangchunjiaxinxin@gmail.com](mailto:fangchunjiaxinxin@gmail.com)';

  return (
    <>
      <div className="w-fit h-full overflow-y-auto pt-60">
        <div className="w-64 sm:w-64 md:w-96 lg:w-128 pl-20 relative">
          <div className="pl-8 pr-12 pt-8 pb-4">
            <section className="markdown">
              <Markdown>{aboutMarkdown}</Markdown>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
