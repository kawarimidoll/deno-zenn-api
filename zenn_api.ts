import { DOMParser, ky, SearchParamsOption } from "./deps.ts";
const ZENN_ROOT = "https://zenn.dev/";

const callAPI = async (path = "", searchParams: SearchParamsOption) => {
  const html = await ky(path, { prefixUrl: ZENN_ROOT, searchParams }).text();
  const dom = new DOMParser().parseFromString(html, "text/html");

  if (!dom) {
    throw new Error("Dom parse failed");
  }

  const data = dom.getElementById("__NEXT_DATA__");

  if (!data) {
    throw new Error("There is no data field");
  }

  const { props, page, query } = JSON.parse(data.innerText);

  return { ...props.pageProps, page, query };
};

const zennApi = async (page = "", query = {}) => {
  try {
    return await callAPI(page, query);
  } catch (error) {
    return { error: error.toString(), page, query };
  }
};

export { ZENN_ROOT, zennApi };
