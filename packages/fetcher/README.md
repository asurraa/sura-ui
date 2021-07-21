
 
# @asurraa/sura-ui-fetcher 
> Fetcher crud oparation build on top of react query

```sh
yarn add @asurraa/sura-ui-fetcher
```

## Installation 

1. Defind global declaration for meta (pagination)

```ts
export interface ISuraPagination {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
```

```ts  
// meta.d.ts
import type { MetaSuraPagination as OriginalMetaPagination } from "@asurraa/sura-ui-fetcher/dist/sura-fetcher.service";
import { ISuraPagination } from "../types/common";

export declare module "@asurraa/sura-ui-fetcher/dist/sura-fetcher.service" {
  export declare interface MetaSuraPagination extends ISuraPagination {}
}
```

2. Wrap provider
 - Make sure your have your axios instance ready. (token ready & other configuration for axios)
 - React Query provider on top of this. 

```tsx
const AppProviderWrapper = () => {
  const InspectorWrapper = isProduction ? Fragment : Inspector;
  const userGlobal = useUser();

  return (
    <Fragment>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <SuraFetcherProvider
            axiosInstance={AxiosHttp}
            useQueryInstance={useQuery}
          >
            <App />
          </SuraFetcherProvider>
        </QueryClientProvider>
      </UserProvider>
    </Fragment>
  );
};

export default AppProviderWrapper;
```

## How to use? 

1. Defind services each crud 

```ts
import { useSuraFetcherFactory } from "@asurraa/sura-ui-fetcher";
import { API_URI } from "@src/constants/api-uri";
import { GeneratorApi } from "@src/types/base-dto.interface";

export type ProductCategoryServiceInterface =
  GeneratorApi["CreateProductCategoryDto"]; // Interface generator directly from OPEN API 

export type IReturnProductCategoryServices =
  GeneratorApi["ProductCategoryResponseDto"];

export const useProductCategoryService = () => {
  return useSuraFetcherFactory<
    ProductCategoryServiceInterface,
    IReturnProductCategoryServices
  >({
    CREATE: API_URI.CREATE_PRODUCT_CATEGORY, //ex = "https://example.com/product-category/create"
    GET_ALL: API_URI.GET_ALL_PRODUCT_CATEGORY,
    DELETE: API_URI.DELETE_PRODUCT_CATEGORY,
    GET_ONE: API_URI.GET_ONE_CATEGORY,
    UPDATE: API_URI.UPDATE_PRODUCT_CATEGORY,
  });
};

```

2. Use inside react components  

```tsx
// eslint-disable-next-line import/named
import { AsurRaaColumnsProps, AsurRaaTable } from "@asurraa/sura-ui-table";
import {
  ProductCategoryServiceInterface,
  useProductCategoryService,
} from "@src/services/product-category.service";
import { Input, message, Tag } from "antd";
import { Fragment, useState } from "react";
import { AsurRaaModal } from "@asurraa/sura-ui-modal";
import { Controller, useForm } from "react-hook-form";
import { EditableType } from "@src/types/crud.type";

const ProductCategoryPage = () => {
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { getAll, createOne, deleteOne, updateOne } =
    useProductCategoryService();
  const { data, isLoading, refresh, meta } = getAll({
    page,
    limit: 10,
  });

  const [editableData, setEditableData] =
    useState<EditableType<ProductCategoryServiceInterface>>();

  const { control, handleSubmit, reset } =
    useForm<ProductCategoryServiceInterface>();

  const onSubmit = (data: ProductCategoryServiceInterface) => {
    if (editableData === undefined) {
      createOne({ data })
        .then((res: any) => {
          refresh();
          message.success("SUCCESS");
          setOpenModal(false);
          reset();
        })
        .catch((err: any) => message.error("ERR"))
        .finally(() => refresh());
    } else {
      updateOne({ data, id: editableData.id })
        .then((res: any) => {
          reset();
          refresh();
          message.success("SUCCESS");
          setOpenModal(false);
        })
        .catch((err: any) => message.error("ERR"))
        .finally(() => refresh());
    }
  };

  const columns: Array<AsurRaaColumnsProps<ProductCategoryServiceInterface>> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "100px",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "100px",
      render: (value, record, index) => {
        return <Tag>{value}</Tag>;
      },
    },
  ];
  return (
    <Fragment>
      <AsurRaaModal
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        title={"Create Product Category"}
        onOk={handleSubmit(onSubmit)}
      >
        <form style={{ margin: 10 }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div style={{ marginBottom: 16 }}>
                <label>Name:</label>
                <Input {...field} />
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <label>Description:</label>
                <Input {...field} />
              </div>
            )}
          />
        </form>
      </AsurRaaModal>
      <AsurRaaTable
        antdTableProps={{
          bordered: true,
          loading: isLoading,
          pagination: {
            pageSize: 10,
            total: meta?.totalItems,
            current: page,
            onChange: (page) => setPage(page),
          },
        }}
        data={data}
        asurRaaColumnProps={columns}
        refreshButton={{
          onClick: () => {
            refresh();
          },
        }}
        createButton={{
          onClick: () => {
            setEditableData(undefined);
            setOpenModal(true);
          },
        }}
        editActionButton={(propsData) => ({
          onClick: () => {
            setEditableData(propsData);
            setOpenModal(true);
          },
        })}
        deleteActionButton={(propsData) => ({
          onOk: () => {
            deleteOne({
              currentPage: page,
              id: propsData.id,
            })
              .then((res) => {
                message.success("Success");
                refresh();
              })
              .catch((err) => message.error(err.message));
          },
        })}
        dataAllCSV={data}
      />
    </Fragment>
  );
};

export default ProductCategoryPage;

```
