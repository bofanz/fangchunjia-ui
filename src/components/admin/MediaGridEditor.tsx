import { MediaSize, type Media } from '@/interfaces/media.interface';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { useState } from 'react';
import { Button, Field, Radio, RadioGroup } from '@headlessui/react';

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
          size={media.size || MediaSize.S}
          setSize={(size: MediaSize) => setMedia({ ...media, size: size })}
        />
      </div>
    </li>
  );
}

function MediaSizer({ size, setSize }: { size: MediaSize; setSize: Function }) {
  const sizeOptions = Object.values(MediaSize);

  return (
    <RadioGroup
      value={size}
      onChange={(s) => setSize(s)}
      aria-label="Server size"
      className="top-0 left-0 flex"
    >
      {sizeOptions.map((size) => (
        <Field key={size} className="flex items-center">
          <Radio
            value={size}
            className="py-1 px-2 flex w-8 h-8 items-center justify-center bg-white data-checked:bg-fangchunjia-pink data-checked:text-white"
          >
            {/* <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" /> */}
            <span className="text-sm uppercase leading-none">{size}</span>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
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
          <Button
            className="rounded bg-fangchunjia-black px-4 py-2 text-sm text-white data-active:bg-fangchunjia-pink data-hover:bg-fangchunjia-pink data-disabled:bg-fangchunjia-gray transition"
            onClick={() => console.log(medias)}
          >
            Save
          </Button>
        </div>
        {/* {medias.map((m) => (
          <p>
            {m.key} | {m.size}
          </p>
        ))} */}
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
