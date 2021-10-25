/// <reference path="./_deploy.d.ts" />
import { zennApi } from "./zenn_api.ts";

const port = 8080;
const listener = Deno.listen({ port });
const isProd = !!Deno.env.get("DENO_DEPLOYMENT_ID");

if (!isProd) {
  console.log(`HTTP server listening on http://localhost:${port}`);
}

// cache one hour
const CACHE_MAX_AGE = 3600;

async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const e of httpConn) {
    e.respondWith(handler(e.request));
  }
}

async function handler(request: Request) {
  const { pathname, searchParams } = new URL(request.url);
  console.log({ pathname, searchParams });

  const result = await zennApi(pathname, searchParams);
  const status = Object.hasOwn(result, "error") ? 400 : 200;
  const body = JSON.stringify(result);
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (isProd) {
    headers.set("Cache-Control", `public, max-age=${CACHE_MAX_AGE}`);
  }

  return new Response(body, { status, headers });
}

for await (const conn of listener) {
  handleConn(conn);
}
