import type { Media, MediaLayoutItem } from '@/interfaces/media.interface';
import { combineMedia } from '@/utils/combineMedia';

function MediaWrapper({ media }: { media: Media & MediaLayoutItem }) {
  return (
    <div className={'media-wrapper ' + (media.size && media.size)}>
      {media.contentType?.startsWith('image') ? (
        <img
          className="media"
          title={media.key}
          src={`https://files.fangchunjia.com/${media.key}`}
        />
      ) : media.contentType?.startsWith('video') ? (
        <video muted autoPlay playsInline controls loop title={media.key}>
          <source
            src={`https://files.fangchunjia.com/${media.key}`}
            type={media.contentType}
          />
        </video>
      ) : media.contentType?.startsWith('audio') ? (
        <audio title={media.key} />
      ) : (
        <></>
      )}
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
