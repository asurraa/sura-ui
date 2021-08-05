# Sura Async Mask Components

> use to wrap async function for a query fetcher like category from id.

## user case

- use with table components + binding with sura-fetcher

```tsx
  const {
    getOnePromise: getOneProductCategory,
    getAll: getAllCategory,
    getOne: getOneProductCategoryCache,
  } = useProductCategoryService();
const column:AsurRaaColumnsProps<TProductService>[] = [{
    {
      dataIndex: "category_id",
      title: "Category",
      width: "100px",
      render: (value, props) => {
        return (
          <SuraAsyncMaskComponents
            queryCache={["name"]}
            fetcher={getOneProductCategoryCache({ id: props.category_id })}
            render={(value, loading) => {
              return <Tag>{value}</Tag>;
            }}
          />
        );
      },
    },
}]
```
