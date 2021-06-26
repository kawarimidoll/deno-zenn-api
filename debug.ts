import { serve } from "./api/deps.ts";
import handler from "./api/server.ts";

const port = 8080;
const server = serve({ port });
console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);

for await (const request of server) {
  handler(request);
}
