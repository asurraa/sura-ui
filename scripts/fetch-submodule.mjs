#!/usr/bin/env zx

await $`echo "fetching submodule starting !!!"`;
await $`git submodule init`;
await $`git submodule update`;
await $`cd asurraa-react-admin-starter`;
await $`git checkout sura-ui-playground`;
await $`cd ..`;
await $`exiting script fetch submodule"`;
