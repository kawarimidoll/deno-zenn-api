import { zennApi } from "./zenn_api.ts";

// cache one hour
const CACHE_MAX_AGE = 3600;

export default async (httpCon: Deno.HttpConn) => {
  for await (const event of httpCon) {
    const { url } = event.request;
    const { pathname } = new URL(url);
    const body = JSON.stringify(await zennApi(pathname));

    const headers = new Headers({
      "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
      "Content-Type": "application/json",
    });

    event.respondWith(new Response(body, { status: 200, headers }));
  }
};
