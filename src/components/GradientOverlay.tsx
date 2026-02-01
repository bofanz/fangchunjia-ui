export default function GradientOverlay({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto">
        <div className="overlay-overlay"></div>
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
