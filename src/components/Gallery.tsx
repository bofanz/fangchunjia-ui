import type { Media } from '@/interfaces/media.interface';
import MediaRenderer from './MediaRenderer';

export default function Gallery({
  media,
  activeMediaKey,
}: {
  media: Media[];
  activeMediaKey: string | undefined;
}) {
  return (
    <div className="relative w-full h-full pointer-events-none">
      {media.map((m) => (
        <div
          key={m.key}
          className={
            'absolute w-full h-full transition ' +
            (m.key === activeMediaKey ? 'opacity-100' : 'opacity-0')
          }
        >
          <MediaRenderer media={m} />
        </div>
      ))}
    </div>
  );
}
