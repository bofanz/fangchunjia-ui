import {
  MediaSize,
  type Media,
  type MediaLayoutItem,
} from '@/interfaces/media.interface';

export function combineMedia(
  media: Media[],
  mediaLayout: MediaLayoutItem[],
): (Media & MediaLayoutItem)[] {
  console.log(media);
  if (!media) {
    return [];
  }

  if (!mediaLayout) {
    return media.map((m) => ({ ...m, size: MediaSize.M }));
  }

  return [
    ...mediaLayout.map((l) => ({
      ...l,
      contentType: media.find((m) => m.key === l.key)?.contentType,
    })),
    ...media
      .filter((m) => !mediaLayout.some((l) => l.key === m.key))
      .map((m) => ({ ...m, size: MediaSize.M })),
  ];
}
