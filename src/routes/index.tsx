import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import StartButton from '@/components/StartButton';
import { motion } from 'motion/react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);
  const video = useRef<HTMLVideoElement | null>(null);

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <video
          ref={video}
          className="w-full h-full object-cover"
          muted
          autoPlay
          playsInline
          onLoadedData={() => setBgLoaded(true)}
          onEnded={() => {
            (video.current as HTMLVideoElement).currentTime = 0;
            (video.current as HTMLVideoElement).controls = true;
          }}
        >
          <source
            src="https://files.fangchunjia.com/welcome/welcoming0001-0357.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <motion.div
        className="opacity-0"
        animate={
          bgLoaded
            ? {
                opacity: '100%',
              }
            : {}
        }
        transition={{ delay: 1, duration: 1 }}
      >
        <StartButton />
      </motion.div>
    </>
  );
}
