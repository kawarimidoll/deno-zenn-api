import { listenAndServe } from "./deps.ts";
import { zennApi } from "./zenn_api.ts";

// cache one hour
const CACHE_MAX_AGE = 3600;

const addr = ":8000";
console.log(`server running at http://localhost${addr}`);

listenAndServe(addr, async (request) => {
  const url = new URL(request.url);
  const body = JSON.stringify(await zennApi(url.pathname));
  const headers = new Headers({
    "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
    "Content-Type": "application/json",
  });
  return new Response(body, { status: 200, headers });
});
