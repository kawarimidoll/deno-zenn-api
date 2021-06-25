import { serve } from "./deps.ts";
import { handler } from "./server.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at: http://localhost:8080/`);

for await (const request of server) {
  handler(request);
}
