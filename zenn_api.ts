import { DOMParser, ky, parseFeed, SearchParamsOption } from "./deps.ts";

export const ZENN_ROOT = "https://zenn.dev/";

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

  const { props, pathname, query } = JSON.parse(data.innerText);

  // rename keys with remove 'res' prefix
  // example:
  //   props.pageProps.user = props.pageProps.resUser;
  Object.keys(props.pageProps).filter((key) => /^res[A-Z]/.test(key)).forEach(
    (resKey) => {
      const key = resKey.charAt(3).toLowerCase() + resKey.slice(4);

      if (!Object.hasOwn(props.pageProps, key)) {
        props.pageProps[key] = props.pageProps[resKey];
        // delete props.pageProps[resKey];
      }
    },
  );

  return { ...props.pageProps, pathname, query };
};

const feedAPI = async (path = "", searchParams: SearchParamsOption = {}) => {
  const feed = await parseFeed(
    await ky(path, { prefixUrl: ZENN_ROOT, searchParams }).text(),
  );
  return feed;
};

/**
 * Generate URL to Zenn by given object.
 * @param pathname pathname of the Zenn page
 * @param query query of the Zenn page
 * @return Object that the page displays, pathname, query
 *
 * Example:
 *
 * ```ts
 * import { zennApi } from "https://pax.deno.dev/kawarimidoll/deno-zenn-api";
 * const result = await zennApi("kawarimidoll");
 * console.log({ result });
 * ```
 */
export async function zennApi(pathname = "", query: SearchParamsOption = {}) {
  try {
    if (/\/[^/]+\/feed/.test(pathname)) {
      return await feedAPI(pathname.replace(/^\//, ""), query);
    }
    return await callAPI(pathname.replace(/^\//, ""), query);
  } catch (error) {
    return { error: error.toString(), pathname, query };
  }
}
