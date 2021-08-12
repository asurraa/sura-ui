#!/usr/bin/env zx

await $`echo "fetching submodule starting !!!"`;
await $`git submodule init`;
await $`git submodule update`;
