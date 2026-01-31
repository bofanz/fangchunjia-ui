import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';

/**
 * 
 * @param background translucent or gradient
 * @param navigateTo default to '..'
 */
export default function Overlay({
  children,
  background = 'translucent',
  navigateTo = '..',
}: {
  children: React.ReactNode;
  background?: 'gradient' | 'translucent';
  navigateTo?: string;
}) {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 overflow-y-auto 
          ${background === 'translucent' && 'bg-overlay-bg'}
          ${background === 'gradient' && ''}
          `}
        // onClick={() => navigate({ to: navigateTo })}
      >
        {children}
      </div>
    </>
  );
}
