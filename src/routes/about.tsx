import HomeButton from '@/components/HomeButton';
import LayerGradient from '@/components/LayerGradient';
import Overlay from '@/components/Overlay';
import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'react-markdown';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  const aboutMarkdown = `
Fang Chunjia is a multidisciplinary graphic designer. Her practice is all about creating texts, images and moving visuals that speak through narrative.
  
[@elephanntt](https://www.instagram.com/elephanntt)
  
[fangchunjiaxinxin@gmail.com](mailto:fangchunjiaxinxin@gmail.com)
  `;

  return (
    <Overlay>
      <HomeButton />
      <LayerGradient title="About">
        <section className="markdown-body">
          <Markdown>{aboutMarkdown}</Markdown>
        </section>
      </LayerGradient>
    </Overlay>
  );
}
