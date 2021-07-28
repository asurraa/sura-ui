[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui/)

# @asurraa/sura-ui-select-search

> Select search with api built on top on antd select.

<p align="center">
  <img src="https://raw.githubusercontent.com/asurraa/sura-ui/master/packages/select-search/assets/Screen%20Shot%202021-07-26%20at%209.36.19%20PM.png" />
</p>

### Use case

- use with input form.
- use to query search from api.
- use to query select dropdown from api.

### Installation

![npm package](https://img.shields.io/npm/v/@asurraa/sura-ui-select-search?style=flat-square?style=flat-square)

```sh
yarn add @asurraa/sura-ui-select-search
```

### Setup

```tsx
import { Fragment } from "react";
import { AsurRaaSelectBaseApiProvider } from "@asurraa/sura-ui-select-search";

export interface ISuraPagination {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

const AppProviderWrapper = () => {
  return (
    <Fragment>
      <AsurRaaSelectBaseApiProvider<ISuraPagination>
        fetcher={AxiosHttp}
        uri={{ page: "page" }}
        parseSearch={(searchValue, key) => `search[${key}]=${searchValue}`}
        parseResponse={{
          data: (res) => res.data,
          meta: (res) => res.meta,
        }}
        metaTotalPage={(meta) => meta.totalPages}
      >
        <App />
      </AsurRaaSelectBaseApiProvider>
    </Fragment>
  );
};

export default AppProviderWrapper;
```

### Provider Properties

| Props         | Description                                                        | Type                                                                   | Example                                                                                                |
| ------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| fetcher       | axiosInstance, your custom axios                                   | `AxiosInstance`                                                        | AxiosHttp                                                                                              |
| uri           | define page param name                                             | `{page: string}`                                                       | {page: "page"}                                                                                         |
| parseSearch   | parse what search with your api param                              | `(searchValue: string, key:string)=> string`                           | (searchValue, key) => `search[${key}]=${searchValue}` or (searchValue, key) => `search=${searchValue}` |
| parseResponse | parse what your data & meta response                               | `{data: (AxiosResponse)=> [], meta: (AxiosResponse \ string)=> string} | see top above :D                                                                                       |
| metaTotalPage | give cb into company how your Generic Meta and Work with totalPage | `(meta: Generic)=> number`                                             | see top above :D                                                                                       |

### Components Properties

| Props           | Description                                  | Type                                                | Example                             |
| --------------- | -------------------------------------------- | --------------------------------------------------- | ----------------------------------- |
| uriData         | uri route to fetch all data                  | `string`                                            | https://api.example.com/product/all |
| searchAs        | define search how many search param you want | `Array<keyof Generic>` \ undefine                   | ["name" ]                           |
| valueRender     | render value of field in dropdown            | `Array<keyof Generic>`                              | ["name", "phone" ]                  |
| antdSelectProps | all props from antd select                   | [learn more](https://ant.design/components/select/) | antd, rc-select                     |

### Example

```tsx
import { Fragment } from "react";
import { AsurRaaRichTextEditor } from "@asurraa/sura-ui-rich-text-editor";
import { AsurRaaSelectSearchBaseApi } from "@asurraa/sura-ui-select-search";
import { API_URI } from "@src/constants/api-uri";
import { IReturnProductCategoryServices } from "@src/services/product-category.service";

const TestPage = () => {
  return (
    <Fragment>
      <AsurRaaSelectSearchBaseApi<IReturnProductCategoryServices> //passing type to auto complete in searchAs & valueRender
        uriData={API_URI.GET_ALL_PRODUCT_CATEGORY}
        searchAs={["name", "description"]}
        valueRender={["name"]}
        antdSelectProps={{
          style: { width: 300 },
        }}
      />
    </Fragment>
  );
};

export default TestPage;
```

### Dependency

- [antd-select](https://ant.design/components/select/)
- [rc-select](https://github.com/react-component/select)
