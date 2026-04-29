export function ErrorComponent({ error }: { error: Error }) {
  return (
    <section className="pt-[var(--section-top-spacing)]">
      <div className="content">An error occurred: {error.message}</div>
    </section>
  );
}
