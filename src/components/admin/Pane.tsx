export default function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-80 border-x overflow-y-auto bg-white not-first:-ml-40 last:grow first:border-l-0 last:border-r-0 z-1">
      {children}
    </div>
  );
}
