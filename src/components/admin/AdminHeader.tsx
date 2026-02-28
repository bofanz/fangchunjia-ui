export default function AdminHeader({ label }: { label: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 px-8 py-6">
      <h1>{label}</h1>
    </div>
  );
}
