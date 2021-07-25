# Sura Async Mask Components

> use to wrap async function for a query fetcher like category from id.

## user case

- use with table components + binding with sura-fetcher

```tsx
const column:AsurRaaColumnsProps<TProductService>[] = [{
    {
      dataIndex: "category_id",
      title: "Category",
      width: "100px",
      render: (value, props) => {
        return (
          <SuraAsyncMaskComponents
            query={["name"]}
            fetcher={getOneProductCategory({ id: props.category_id })}
            render={(value, loading) => {
              return <Tag>{value}</Tag>;
            }}
          />
        );
      },
    },
}]
```
