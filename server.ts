import { serve } from "https://deno.land/std@0.99.0/http/server.ts";
import { zennApi } from "./zenn_api.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const request of server) {
  const body = JSON.stringify(await zennApi(request.url.slice(1)));
  const headers = new Headers({ "Content-Type": "application/json" });
  // console.log(body);
  request.respond({ status: 200, headers, body });
}
