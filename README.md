# deno-zenn-api

[![ci](https://github.com/kawarimidoll/deno-zenn-api/workflows/ci/badge.svg)](.github/workflows/ci.yml)
[![deno version](https://img.shields.io/badge/deno-%5E1.14.0-green?logo=deno)](https://deno.land)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![LICENSE](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)

An unofficial API for [Zenn](https://zenn.dev/).

## Usage

### Module

[![deno doc](https://doc.deno.land/badge.svg)](https://pax.deno.dev/kawarimidoll/deno-zenn-api)

```ts
import { zennApi } from "https://pax.deno.dev/kawarimidoll/deno-zenn-api";
const result = await zennApi("kawarimidoll");
console.log({ result });
```

### Deno Deploy

Running on:
[![deploy](https://deno.com/deno-deploy-button.svg)](https://zenn-api.deno.dev/)

Get user data:

```
https://zenn-api.deno.dev/kawarimidoll
```

Get latest articles:

```
https://zenn-api.deno.dev/articles
```

Get specific topics:

```
https://zenn-api.deno.dev/topics/deno
```
