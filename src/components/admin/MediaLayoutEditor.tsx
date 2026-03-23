import {
  MediaSize,
  type Media,
  type MediaLayoutItem,
} from '@/interfaces/media.interface';
import { combineMedia } from '@/utils/combineMedia';
import {
  useCreateOrUpdateProjectMediaLayoutMutation,
  useUpdateProjectMutation,
} from '@/utils/queryOptions';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import clsx from 'clsx';
import { useState } from 'react';
import MediaRenderer from '../MediaRenderer';
import { CheckIcon } from '@heroicons/react/24/outline';

function MediaLayoutItem({
  id,
  index,
  media,
  setMedia,
  coverKey,
  setCoverKey,
}: {
  id: string;
  index: number;
  media: MediaLayoutItem & Media;
  setMedia: Function;
  coverKey?: string;
  setCoverKey: Function;
}) {
  const { ref } = useSortable({ id, index });
  const [hovered, setHovered] = useState(false);

  return (
    <li
      ref={ref}
      className={'relative media-wrapper ' + media.size}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <MediaRenderer media={media} />
      </div>
      <div className={clsx('absolute top-0 left-0 flex', !hovered && 'hidden')}>
        <label className="has-checked:bg-fangchunjia-black has-checked:text-white py-1 px-2 flex text-sm w-6 h-6 items-center justify-center bg-white">
          C
          <input
            type="radio"
            id={`${media.key}-cover-key`}
            name={`cover-key`}
            value={media.key}
            checked={media.key === coverKey}
            onChange={(e) => setCoverKey(e.target.value)}
            className="hidden"
          />
        </label>
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

export default function MediaLayoutEditor({
  projectId,
  initialCoverKey,
  media,
  initialMediaLayout,
}: {
  projectId: string;
  initialCoverKey?: string;
  media: Media[];
  initialMediaLayout: MediaLayoutItem[];
}) {
  const [mediaLayout, setMediaLayout] = useState<MediaLayoutItem[]>(
    combineMedia(media, initialMediaLayout),
  );
  const [coverKey, setCoverKey] = useState<string | undefined>(initialCoverKey);
  const createOrUpdateProjectMediaLayoutMutation =
    useCreateOrUpdateProjectMediaLayoutMutation();
  const updateProjectMutation = useUpdateProjectMutation();

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="toolbar">
          <button
            onClick={() => {
              createOrUpdateProjectMediaLayoutMutation.mutate({
                projectId: projectId,
                mediaLayout: mediaLayout,
              });
              if (coverKey) {
                updateProjectMutation.mutate({
                  id: projectId,
                  cover: {
                    key: coverKey,
                  },
                });
              }
            }}
          >
            <CheckIcon />
          </button>
        </div>
        <div className="grow overflow-y-auto w-full">
          <div className="w-full p-4">
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
                  <MediaLayoutItem
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
                    coverKey={coverKey}
                    setCoverKey={setCoverKey}
                  />
                ))}
              </ul>
            </DragDropProvider>
          </div>
        </div>
      </div>
    </>
  );
}
