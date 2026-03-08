export default function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-80 border-x overflow-y-auto bg-white -ml-40 last:grow last:-mr-[1px] z-1">
      {children}
    </div>
  );
}
