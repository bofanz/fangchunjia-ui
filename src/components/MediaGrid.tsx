import type { Media, MediaLayoutItem } from '@/interfaces/media.interface';
import { combineMedia } from '@/utils/combineMedia';
import MediaRenderer from './MediaRenderer';

function MediaWrapper({ media }: { media: Media & MediaLayoutItem }) {
  return (
    <div className={'media-wrapper ' + (media.size && media.size)}>
      <MediaRenderer media={media} />
    </div>
  );
}

export default function MediaGrid({
  media,
  mediaLayout,
}: {
  media: Media[];
  mediaLayout: MediaLayoutItem[];
}) {
  return (
    <div className="media-grid fit-content">
      {combineMedia(media, mediaLayout).map((m) => (
        <MediaWrapper media={m} key={m.key} />
      ))}
    </div>
  );
}
