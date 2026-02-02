import HomeButton from '@/components/HomeButton';
import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import GradientOverlay from '@/components/GradientOverlay';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  const aboutMarkdown =
    'Fang Chunjia is a multidisciplinary graphic designer. Her practice is all about creating texts, images and moving visuals that speak through narrative. \n \n [@elephanntt](https://www.instagram.com/elephanntt) \n \n[fangchunjiaxinxin@gmail.com](mailto:fangchunjiaxinxin@gmail.com)';

  return (
    <>
      <HomeButton />
      <GradientOverlay title="About">
        <section className="markdown-body">
          <Markdown>{aboutMarkdown}</Markdown>
        </section>
      </GradientOverlay>
    </>
  );
}
