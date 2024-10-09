import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import customStylesheet from "~/styles/custom.css";
import { BulletHoleProvider, BulletHoleContext } from '~/contexts/BulletHoleContext';
import BulletHole from '~/components/BulletHole';
import { useContext, useRef } from 'react';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: customStylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

function AppContent() {
  const { bulletHoles, addBulletHole } = useContext(BulletHoleContext);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    addBulletHole(e.clientX, e.clientY);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
    }
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full" onClick={handleClick}>
        <Outlet />
        {bulletHoles.map(hole => (
          <BulletHole key={hole.id} x={hole.x} y={hole.y} />
        ))}
        <audio ref={audioRef} src="/sounds/gunshot.wav" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <BulletHoleProvider>
      <AppContent />
    </BulletHoleProvider>
  );
}