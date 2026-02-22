import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './styles.css';
import reportWebVitals from './reportWebVitals.ts';
import { AuthProvider } from 'react-oidc-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MediaQueryContext } from './contexts/MediaQueryContext.tsx';
import * as Sentry from '@sentry/react';

export const queryClient = new QueryClient();

Sentry.init({
  dsn: 'https://b89c9f65c5ad191be5a3cb1ccae85355@o4510920203894784.ingest.de.sentry.io/4510920206188624',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
});

const isNotTouchDevice = !window.matchMedia('(pointer: coarse)').matches;

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    portfolioApi: 'https://api.fangchunjia.com',
    filesApi: 'https://files.fangchunjia.com',
    queryClient,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultViewTransition: {
    types: ['fade'],
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_cVNmpcQLR',
  client_id: '678f7i2s126o7l28n2s6hag0d4',
  redirect_uri: 'http://localhost:3000/admin',
  response_type: 'code',
  scope: 'email openid phone',
};

// Render the app
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider {...cognitoAuthConfig}>
          <MediaQueryContext value={{ isNotTouchDevice: isNotTouchDevice }}>
            <RouterProvider router={router} />
          </MediaQueryContext>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
