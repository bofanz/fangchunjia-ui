export default function Overlay({
  children,
  open,
  position,
  onClose,
  backdrop = true,
}: {
  children: any;
  open: boolean;
  position: "left" | "right";
  onClose: any;
  backdrop?: boolean;
}) {
  if (open) {
    switch (position) {
      case "left":
        return (
          <>
            <div
              className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-5 z-40"
              onClick={() => {
                onClose();
              }}
            ></div>
            <div className="absolute w-1/2 top-0 bottom-0 left-0 bg-white z-40 font-bodebeck p-8 pt-40 overflow-hidden">
              {children}
            </div>
          </>
        );
      case "right":
        return (
          <>
            <div
              className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-5 z-40"
              onClick={() => onClose()}
            ></div>
            <div className="absolute w-1/2 top-0 bottom-0 right-0 bg-white z-40 font-bodebeck p-8 pt-40 overflow-hidden">
              {children}
            </div>
          </>
        );
    }
  }
}
