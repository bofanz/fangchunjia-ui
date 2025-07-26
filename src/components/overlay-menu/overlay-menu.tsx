export default function OverlayMenu({
  overlays,
  setActiveOverlay,
  activeOverlay,
}: {
  overlays: { label: string; value: string }[];
  setActiveOverlay: any;
  activeOverlay: any;
}) {
  return (
    <>
      <div className="font-oval-black tracking-nav flex justify-between absolute top-0 left-0 right-0 z-50">
        {overlays.map((item) =>
          activeOverlay === item.value ? (
            <button
              key={item.value}
              className="cursor-pointer text-cherry-lamp-pink hover:text-black px-2 py-1 text-7xl"
              onClick={() => setActiveOverlay(() => null)}
            >
              {item.label}
            </button>
          ) : (
            <button
              type="button"
              key={item.value}
              className="cursor-pointer text-black hover:text-cherry-lamp-pink px-2 py-1 text-7xl"
              onClick={() => setActiveOverlay(() => item.value)}
            >
              {item.label}
            </button>
          ),
        )}
      </div>
    </>
  );
}
