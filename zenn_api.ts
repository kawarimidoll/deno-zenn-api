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

  // rename keys with remove 'res' prefix
  // example:
  //   props.pageProps.user = props.pageProps.resUser;
  Object.keys(props.pageProps).filter((key) => /^res[A-Z]/.test(key)).forEach(
    (resKey) => {
      const key = resKey.charAt(3).toLowerCase() + resKey.slice(4);

      if (!Object.hasOwn(props.pageProps, key)) {
        props.pageProps[key] = props.pageProps[resKey];
      }
    },
  );

  return { ...props.pageProps, page, query };
};

const zennApi = async (page = "", query = {}) => {
  try {
    return await callAPI(page.startsWith("/") ? page.slice(1) : page, query);
  } catch (error) {
    return { error: error.toString(), page, query };
  }
};

export { ZENN_ROOT, zennApi };
