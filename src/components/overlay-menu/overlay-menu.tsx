import type { Dispatch, SetStateAction } from "react";
import type { OverlayContainerItem } from "../../pages/overlay-container/overlay-container";

export default function OverlayMenu({
  overlays,
  setActiveOverlay,
  activeOverlay,
}: {
  overlays: { label: string; value: OverlayContainerItem }[];
  setActiveOverlay: Dispatch<SetStateAction<OverlayContainerItem>>;
  activeOverlay: string | null;
}) {
  return (
    <>
      <div className="font-oval-black tracking-nav flex justify-between absolute top-0 left-0 right-0 z-50">
        {overlays.map((item) =>
          activeOverlay === item.value ? (
            <div className="px-2 py-1">
              <button
                key={item.value}
                className="cursor-pointer active:cursor-pointer-active text-cherry-lamp-pink hover:text-black text-7xl"
                onClick={() => setActiveOverlay(() => null)}
              >
                {item.label}
              </button>
            </div>
          ) : (
            <div className="px-2 py-1">
              <button
                type="button"
                key={item.value}
                className="cursor-pointer active:cursor-pointer-active text-black hover:text-cherry-lamp-pink text-7xl"
                onClick={() => setActiveOverlay(() => item.value)}
              >
                {item.label}
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
