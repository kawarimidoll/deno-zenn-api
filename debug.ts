import { serve } from "./api/deps.ts";
import handler from "./api/server.ts";

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at: http://localhost:8080/`);

for await (const request of server) {
  handler(request);
}
