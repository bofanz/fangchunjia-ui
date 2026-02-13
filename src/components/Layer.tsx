export default function Layer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-white md:bg-overlay-bg z-200 fixed w-full h-full">
        {children}
      </div>
    </>
  );
}
