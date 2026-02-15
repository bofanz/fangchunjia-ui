import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import ToStart from '@/components/ToStart';
import Quote from '@/components/Quote';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);
  const video = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <video
          ref={video}
          className="w-full h-full object-cover"
          muted
          autoPlay
          playsInline
          onPlay={() => setBgLoaded(true)}
          onEnded={() => {
            navigate({ to: '/home' });
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
        transition={{ delay: 4, duration: 1 }}
      >
        <ToStart />
        <Quote />
      </motion.div>
    </>
  );
}
