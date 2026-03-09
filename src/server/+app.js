import { html } from "client:page";
import foodServer from "../food/+server.js";
import albumServer from "../album/+server.js";
import githubServer from "../github/+server.js";
import { createLayout } from "../components/layout.js";

export default {
  /** @param {Request} req */
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return new Response(createLayout(html), { headers: { "content-type": "text/html" } });
    } else if (url.pathname === "/food") {
      return foodServer.fetch(req);
    } else if (url.pathname === "/album") {
      return albumServer.fetch(req);
    } else if (url.pathname === "/github") {
      return githubServer.fetch(req);
    }

    return new Response("Not found", { status: 404 });
  },
};
