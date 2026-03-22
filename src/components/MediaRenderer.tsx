import type { Media } from '@/interfaces/media.interface';

export default function MediaRenderer({ media }: { media: Media }) {
  return (
    <>
      {media.contentType?.startsWith('image') ? (
        <img
          className="w-full h-full object-cover"
          title={media.key}
          src={`https://files.fangchunjia.com/${media.key}`}
        />
      ) : media.contentType?.startsWith('video') ? (
        <video
          muted
          autoPlay
          playsInline
          controls
          loop
          title={media.key}
          className="w-full h-full object-cover"
        >
          <source
            src={`https://files.fangchunjia.com/${media.key}`}
            type={media.contentType}
          />
        </video>
      ) : media.contentType?.startsWith('audio') ? (
        <>
          <audio controls className="w-full">
            <source
              src={`https://files.fangchunjia.com/${media.key}`}
              type={media.contentType}
            />
          </audio>
        </>
      ) : (
        <div
          className="p-4 bg-fangchunjia-lightgray cursor-default text-sm"
          title={media.key}
        >
          Missing or unsupported media type
        </div>
      )}
    </>
  );
}
