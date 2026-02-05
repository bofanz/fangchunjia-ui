import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';

export default function Overlay({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="pl-[25%] bg-overlay-bg"
        onClick={() =>
          canGoBack ? router.history.back() : navigate({ to: '..' })
        }
      >
        {children}
      </div>
    </>
  );
}
