import { useGSAP } from '@gsap/react'
import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import Header from '@/components/Header'
import HeaderStart from '@/components/HeaderStart'

export const Route = createFileRoute('/welcome')({
  component: RouteComponent,
})

function RouteComponent() {
  const [bgLoaded, setBgLoaded] = useState<boolean>(false)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (bgLoaded) {
      gsap.to(headerRef.current, {
        opacity: 1,
        display: 'block',
        delay: 1,
      })
    }
  }, [bgLoaded])

  return (
    <>
      <div ref={headerRef} className="opacity-0 hidden">
        <HeaderStart />
      </div>

      <div className="absolute top-0 left-0 bottom-0 right-0 -z-10 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          muted
          autoPlay
          loop
          src="https://files.fangchunjia.com/media/cover.mp4"
          onLoadedData={() => setBgLoaded(true)}
        ></video>
      </div>
    </>
  )
}
