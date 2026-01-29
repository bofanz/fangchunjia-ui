import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="bg-[url(/background.jpg)] bg-cover h-full">
        <div className="">
          <Header />
        </div>
        {/* <LayerGradient title="About">
          <About />
        </LayerGradient> */}
        {/* <LayerGradient title="Projects">
          <Projects />
        </LayerGradient> */}
      </div>

      {/* <LayerGradient>
        <Projects />
      </LayerGradient> */}
    </>
  )
}
