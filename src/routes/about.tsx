import LayerGradient from '@/components/LayerGradient'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  const aboutMarkdown = `
Fang Chunjia is a multidisciplinary graphic designer. Her practice is all about creating texts, images and moving visuals that speak through narrative.
  
[@elephanntt](https://www.instagram.com/elephanntt)
  
[fangchunjiaxinxin@gmail.com](mailto:fangchunjiaxinxin@gmail.com)
  `

  return (
    <div className="bg-[url(/background.jpg)] bg-cover h-full">
      <LayerGradient title="About">
        <section className="markdown-body">
          <Markdown>{aboutMarkdown}</Markdown>
        </section>
      </LayerGradient>
    </div>
  )
}
