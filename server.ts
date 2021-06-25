import { ServerRequest } from "./deps.ts";
import { zennApi } from "./zenn_api.ts";

const handler = async (request: ServerRequest) => {
  const body = JSON.stringify(await zennApi(request.url.slice(1)));
  const headers = new Headers({ "Content-Type": "application/json" });
  // console.log(body);
  request.respond({ status: 200, headers, body });
};

export { handler };
