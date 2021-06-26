import { ServerRequest } from "./deps.ts";
import { zennApi } from "./zenn_api.ts";

// cache one hour
const CACHE_MAX_AGE = 3600;

export default async (request: ServerRequest) => {
  const body = JSON.stringify(await zennApi(request.url));
  const headers = new Headers({
    "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
    "Content-Type": "application/json",
  });
  request.respond({ status: 200, headers, body });
};
