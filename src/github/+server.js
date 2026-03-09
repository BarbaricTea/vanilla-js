import html from "./+page.html?raw";
import { createLayout } from "../components/layout.js";

export default {
  /** @param {Request} req */
  fetch(req) {
    return new Response(createLayout(html, '/github/style.css', '/github/script.js'), { headers: { "content-type": "text/html" } });
  },
};
