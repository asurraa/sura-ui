# @asurraa/sura-ui-loading-button

> Wrap loading with antd button.

### Use case

- wrap loading with antd button.

### Installation

![npm package](https://img.shields.io/npm/v/@asurraa/sura-ui-loading-button?style=flat-square?style=flat-square)

```sh
yarn add @asurraa/sura-ui-loading-button
```

### Components Properties

| Props            | Description                         | Type                      | Example |
| ---------------- | ----------------------------------- | ------------------------- | ------- |
| loadingTiming    | loading timing                      | `number`                  | ``      |
| onClick          | onClick Event like other components | `cb onClick`              | ``      |
| loadingSyncProps | props of loading icon props         | `iconProps`               | ``      |
| component        | Button or Fragment                  | `generic component props` | ``      |
| componentProps   | generic props                       | `generic component props` | ``      |

```tsx
import { SuraLoadingButton } from "@asurraa/sura-ui-loading-button";

const TestPage = () => {
  return (
    <Fragment>
      <SuraLoadingButton
        component={Button}
        onClick={() => {
          deepRefresh();
          refresh();
        }}
      />
    </Fragment>
  );
};

export default TestPage;
```

### Dependency

- [antd-button](https://ant.design/components/button/)
