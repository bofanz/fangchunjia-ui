export default function Layer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-white sm:bg-transparent z-200 fixed top-0 bottom-0 right-0 w-full sm:w-5/8">
        {children}
      </div>
    </>
  );
}
