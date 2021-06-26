import handler from "./api/server.ts";

const port = 8080;
const server = Deno.listen({ port });
console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);

for await (const request of server) {
  (async () => {
    const httpCon = Deno.serveHttp(request);

    for await (const event of httpCon) {
      handler(event);
    }
  })();
}
