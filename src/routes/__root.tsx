import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 fx-scanlines">
      <div className="max-w-lg text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em]" style={{ color: "var(--neon-magenta)" }}>
          // SIGNAL_LOST
        </div>
        <h1 className="font-display mt-4 text-[8rem] leading-none font-black glitch" data-text="404">404</h1>
        <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-dim)" }}>
          {">"} requested coordinate not found in the grid.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-neon">
            &lt;&lt; Return to base
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold uppercase tracking-widest" style={{ color: "var(--neon-cyan)" }}>
          // system fault
        </h1>
        <p className="mt-2 font-mono text-sm" style={{ color: "var(--text-dim)" }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-neon">Retry</button>
          <a href="/" className="btn-neon is-magenta">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Malanka Tharula — Portfolio" },
      { name: "description", content: "Portfolio of Malanka Tharula — Backend Developer & Deep Learning Enthusiast. Selected projects, experience, and contact." },
      { name: "author", content: "Malanka Tharula" },
      { property: "og:title", content: "Malanka Tharula — Portfolio" },
      { property: "og:description", content: "Portfolio of Malanka Tharula — Backend Developer & Deep Learning Enthusiast. Selected projects, experience, and contact." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Malanka Tharula" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Malanka Tharula — Portfolio" },
      { name: "twitter:description", content: "Portfolio of Malanka Tharula — Backend Developer & Deep Learning Enthusiast. Selected projects, experience, and contact." },

    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
