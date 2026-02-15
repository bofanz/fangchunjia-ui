export default function Layer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-white md:bg-fangchunjia-translucent z-200 fixed top-0 bottom-0 left-0 right-0">
        {children}
      </div>
    </>
  );
}
