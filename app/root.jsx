import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Form,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUserSession } from "~/sessions.server";

import styles from "./styles/app.css";

export function meta() {
  return {
    charset: "utf-8",
    title: "New Snippet App",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"/>
        <Meta />
        <Links />
      </head>
      <body className=" text-snippet-white-0 font-light font-roboto bg-snippet-dark-0 ">
        <header className="border-b-2">
          <section id="main">
            <h2 className="text-center text-white mt-3 mb-2 text-2xl font-bold">
              <a href="/">Snippet App</a>
            </h2>
          </section>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
//}
