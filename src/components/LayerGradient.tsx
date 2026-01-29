import { type ReactNode } from 'react';
import LayerHeader from './LayerHeader';

export default function LayerGradient({
  title,
  backgroundUrl,
  children,
}: {
  title: string;
  backgroundUrl?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex">
        {backgroundUrl && (
          <div className="absolute w-full h-full z-10">
            <img
              src={`https://files.fangchunjia.com/${backgroundUrl}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className={
            'w-[400px] z-20 ' +
            (backgroundUrl
              ? ''
              : 'bg-gradient-to-r from-white from-90% to-transparent to-100%')
          }
        >
          <LayerHeader title={title} />
          <div className="px-8 pt-8 pb-4">{children}</div>
        </div>
      </div>
    </>
  );
}
