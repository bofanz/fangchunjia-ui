import { AnimatePresence, motion } from 'motion/react';

export default function GradientOverlay({
  title,
  children,
  showOverlay = true,
}: {
  title?: string;
  children: React.ReactNode;
  showOverlay?: boolean;
}) {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto">
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              exit={{ opacity: 0 }}
              className="overlay-overlay"
            ></motion.div>
          )}
        </AnimatePresence>
        <div className="overlay-content-wrapper">
          <header>
            {title && (
              <div className="grow-1 pl-8 pr-12 pt-16 pb-4">
                <span className="font-bold text-4xl">{title}</span>
              </div>
            )}
          </header>
          <div className="pl-8 pr-12 pt-8 pb-4">{children}</div>
        </div>
      </div>
    </>
  );
}
