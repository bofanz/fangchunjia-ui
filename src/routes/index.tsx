import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import StartButton from '@/components/StartButton';
import { motion } from 'motion/react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          muted
          autoPlay
          loop
          src="https://files.fangchunjia.com/media/cover.mp4"
          onLoadedData={() => setBgLoaded(true)}
        ></video>
      </div>
      <motion.div
        className="opacity-0 hidden"
        animate={
          bgLoaded
            ? {
                opacity: 1,
                display: 'block',
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
