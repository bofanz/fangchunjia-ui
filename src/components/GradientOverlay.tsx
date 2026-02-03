import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';

export default function GradientOverlay({}: {}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="gradient-overlay absolute top-0 bottom-0 left-0 right-0"
        onClick={() =>
          canGoBack ? router.history.back() : navigate({ to: '..' })
        }
      ></div>
    </>
  );
}
