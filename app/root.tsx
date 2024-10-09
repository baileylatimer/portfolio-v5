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
} from "@remix-run/react";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import customStylesheet from "~/styles/custom.css";
import { BulletHoleProvider, BulletHoleContext } from '~/contexts/BulletHoleContext';
import BulletHole from '~/components/BulletHole';
import { useContext, useRef, useCallback, useState } from 'react';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: customStylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

function AppContent() {
  const { bulletHoles, addBulletHole, addBurstHoles } = useContext(BulletHoleContext);
  const singleShotAudioRef = useRef<HTMLAudioElement>(null);
  const burstAudioRef = useRef<HTMLAudioElement>(null); 
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseDownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsMouseDown(true);
    mouseDownTimerRef.current = setTimeout(() => {
      addBurstHoles(e.clientX, e.clientY);
      if (burstAudioRef.current) {
        burstAudioRef.current.currentTime = 0;
        burstAudioRef.current.play().catch(error => console.error("Burst audio playback failed:", error));
      }
    }, 200);
  }, [addBurstHoles]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    if (mouseDownTimerRef.current) {
      clearTimeout(mouseDownTimerRef.current);
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!isMouseDown) {
      addBulletHole(e.clientX, e.clientY);
      console.log("Single shot triggered"); // Debug log
      if (singleShotAudioRef.current) {
        console.log("Single shot audio element exists"); // Debug log
        singleShotAudioRef.current.currentTime = 0;
        singleShotAudioRef.current.play()
          .then(() => console.log("Single shot audio played successfully"))
          .catch(error => console.error("Single shot audio playback failed:", error));
      } else {
        console.error("Single shot audio element not found");
      }
    }
  }, [isMouseDown, addBulletHole]);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body 
        className="h-full" 
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Outlet />
        {bulletHoles.map(hole => (
          <BulletHole key={hole.id} x={hole.x} y={hole.y} />
        ))}
        <audio ref={singleShotAudioRef} src="/sounds/gunshot.wav" preload="auto" />
        <audio ref={burstAudioRef} src="/sounds/burst-fire.wav" preload="auto" />
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