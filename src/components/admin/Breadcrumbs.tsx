import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useMatches, Link } from '@tanstack/react-router';

export function Breadcrumbs() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => match.meta?.some((m) => m?.title))
    .map((match) => ({
      title: match.meta?.find((m) => m?.title)?.title,
      path: match.pathname,
    }));

  return (
    <nav className="px-3 py-2">
      {breadcrumbs.map((crumb, i) => {
        const isLast = i === breadcrumbs.length - 1;
        return (
          <span key={crumb.path}>
            {isLast ? (
              <span>{crumb.title}</span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-fangchunjia-pink transition"
              >
                {crumb.title}
              </Link>
            )}
            {!isLast && (
              <span>
                <ChevronRightIcon className="h-4 inline-block mx-1" />
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
