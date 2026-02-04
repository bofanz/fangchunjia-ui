// import { createFileRoute, redirect } from '@tanstack/react-router';

// export const Route = createFileRoute('/')({
//   loader: () =>
//     redirect({
//       to: '/welcome',
//     }),
// });


import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import StartButton from '@/components/StartButton';
import { useAnimate } from 'motion/react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [bgLoaded, setBgLoaded] = useState<boolean>(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (bgLoaded) {
      animate(
        scope.current,
        { opacity: 1, display: 'block' },
        { duration: 1, delay: 1 },
      );
    }
  }, [bgLoaded]);

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
      <div ref={scope} className="opacity-0 hidden">
        <StartButton />
      </div>
    </>
  );
}
