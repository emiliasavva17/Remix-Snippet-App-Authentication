import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";

hydrate(<RemixBrowser />, document);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
