import {
  MediaSize,
  type Media,
  type MediaLayoutItem,
} from '@/interfaces/media.interface';
import { useCreateOrUpdateProjectMediaLayoutMutation } from '@/utils/queryOptions';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { useState } from 'react';

function Sortable({
  id,
  index,
  media,
  setMedia,
}: {
  id: string;
  index: number;
  media: MediaLayoutItem & Media;
  setMedia: Function;
}) {
  const { ref } = useSortable({ id, index });

  return (
    <li ref={ref} className={'relative media-wrapper ' + media.size}>
      <div>
        {media.contentType?.startsWith('image') ? (
          <img
            className="media"
            src={`https://files.fangchunjia.com/${media.key}`}
          />
        ) : media.contentType?.startsWith('video') ? (
          <video muted playsInline controls>
            <source
              src={`https://files.fangchunjia.com/${media.key}`}
              type={media.contentType}
            />
          </video>
        ) : media.contentType?.startsWith('audio') ? (
          <audio />
        ) : (
          <>Unsupported media type</>
        )}
      </div>
      <div className="absolute top-0 left-0">
        <MediaSizer
          id={id}
          size={media.size || MediaSize.S}
          setSize={(size: MediaSize) => setMedia({ ...media, size: size })}
        />
      </div>
    </li>
  );
}

const mediaSizeMap: { [key in MediaSize]: string } = {
  [MediaSize.S]: 'S',
  [MediaSize.M]: 'M',
  [MediaSize.L]: 'L',
};

function MediaSizer({
  id,
  size,
  setSize,
}: {
  id: string;
  size: MediaSize;
  setSize: Function;
}) {
  const sizeOptions = Object.values(MediaSize);

  return (
    <div className="flex">
      {sizeOptions.map((s) => (
        <div key={s}>
          <label className="has-checked:bg-fangchunjia-pink py-1 px-2 flex text-sm w-6 h-6 items-center justify-center bg-white">
            {mediaSizeMap[s]}
            <input
              type="radio"
              id={`${id}-${s}`} // ✅ unique id per option per item
              name={`size-${id}`}
              value={s}
              checked={s === size}
              onChange={(e) => setSize(e.target.value)}
              className="hidden"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default function MediaGridEditor({
  projectId,
  media,
  initialMediaLayout,
}: {
  projectId: string;
  media: Media[];
  initialMediaLayout: MediaLayoutItem[];
}) {
  const [mediaLayout, setMediaLayout] = useState<MediaLayoutItem[]>(
    // Use media to initiate mediaLayout if mediaLayout does not exists
    initialMediaLayout || media.map((m) => ({ key: m.key, size: MediaSize.M })),
  );
  const createOrUpdateProjectMediaLayoutMutation =
    useCreateOrUpdateProjectMediaLayoutMutation();

  return (
    <>
      <div className="space-y-8 h-full flex flex-col">
        <div className="grow overflow-y-auto w-full p-4">
          <div className="w-60">
            <DragDropProvider
              onDragEnd={(event) => {
                // @ts-expect-error
                setMediaLayout((mediaLayout) => {
                  // @ts-expect-error
                  return move(mediaLayout, event);
                });
              }}
            >
              <ul className="media-grid fit-content">
                {mediaLayout.map((item, index) => (
                  <Sortable
                    key={item.key}
                    id={item.key}
                    index={index}
                    media={{
                      ...item,
                      contentType: media.find((m) => m.key === item.key)
                        ?.contentType,
                    }}
                    setMedia={(mediaLayoutItem: MediaLayoutItem) =>
                      setMediaLayout(
                        mediaLayout.toSpliced(index, 1, mediaLayoutItem),
                      )
                    }
                  />
                ))}
              </ul>
            </DragDropProvider>
          </div>
        </div>
        <div>
          <button
            className="w-full bg-fangchunjia-black px-4 py-2 text-sm text-white active:bg-fangchunjia-pink hover:bg-fangchunjia-pink disabled:bg-fangchunjia-gray transition"
            onClick={() => {
              createOrUpdateProjectMediaLayoutMutation.mutate({
                projectId: projectId,
                mediaLayout: mediaLayout,
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
