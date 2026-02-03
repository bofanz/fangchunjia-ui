export default function Gallery({
  medias,
  activeMedia,
}: {
  medias: { url: string }[];
  activeMedia: string;
}) {
  return (
    <div className="relative w-full h-full pointer-events-none">
      {medias.map((m) => (
        <div
          key={m.url}
          className={
            'absolute w-full h-full transition ' +
            (m.url === activeMedia ? 'opacity-100' : 'opacity-0')
          }
        >
          <img className="w-full h-full object-cover" src={m.url} />
        </div>
      ))}
    </div>
  );
}
