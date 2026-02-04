import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';

export default function Overlay({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-bg z-200"
        onClick={() =>
          canGoBack ? router.history.back() : navigate({ to: '..' })
        }
      />
      <div className="ml-[36%] absolute top-0 bottom-0 left-0 right-0 overflow-y-auto z-300">
        {children}
      </div>
    </>
  );
}
