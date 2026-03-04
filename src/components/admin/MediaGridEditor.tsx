import { MediaSize, type Media } from '@/interfaces/media.interface';
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
  media: Media;
  setMedia: Function;
}) {
  const { ref } = useSortable({ id, index });

  return (
    <li ref={ref} className={'relative media-wrapper ' + media.size}>
      <div>
        <img
          className="media"
          src={`https://files.fangchunjia.com/${media.key}`}
        />
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
          <label className="has-checked:bg-fangchunjia-pink py-1 px-2 flex w-8 h-8 items-center justify-center bg-white">
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
  initialMedias,
}: {
  initialMedias: Media[];
}) {
  const [medias, setMedias] = useState<Media[]>(initialMedias);

  return (
    <>
      <div className="space-y-8">
        <div>
          <button
            className="bg-fangchunjia-black px-4 py-2 text-sm text-white data-active:bg-fangchunjia-pink data-hover:bg-fangchunjia-pink data-disabled:bg-fangchunjia-gray transition"
            onClick={() => console.log(medias)}
          >
            Save
          </button>
        </div>
        <div className="w-80">
          <DragDropProvider
            onDragEnd={(event) => {
              // @ts-expect-error
              setMedias((medias) => {
                // @ts-expect-error
                return move(medias, event);
              });
            }}
          >
            <ul className="media-grid fit-content">
              {medias.map((item, index) => (
                <Sortable
                  key={item.key}
                  id={item.key}
                  index={index}
                  media={item}
                  setMedia={(media: Media) =>
                    setMedias(medias.toSpliced(index, 1, media))
                  }
                />
              ))}
            </ul>
          </DragDropProvider>
        </div>
      </div>
    </>
  );
}
