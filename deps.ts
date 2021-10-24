import ky, { SearchParamsOption } from "https://cdn.skypack.dev/ky?dts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.15-alpha/deno-dom-wasm.ts";

import { assert } from "https://deno.land/std@0.112.0/testing/asserts.ts";

export { assert, DOMParser, ky };
export type { SearchParamsOption };
