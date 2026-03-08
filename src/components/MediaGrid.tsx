import type { MediaLayoutItem } from '@/interfaces/media.interface';

export default function MediaGrid({ items }: { items: MediaLayoutItem[] }) {
  return (
    <div className="media-grid fit-content">
      {items.map((item) => (
        <div
          className={'media-wrapper ' + (item.size && item.size)}
          key={item.key}
        >
          <img
            className="media"
            src={`https://files.fangchunjia.com/${item.key}`}
          />
        </div>
      ))}
    </div>
  );
}
