import { SyncOutlined } from "@ant-design/icons";
import {
  FC,
  ForwardRefExoticComponent,
  MouseEventHandler,
  RefAttributes,
  useState,
} from "react";

import { Button, ButtonProps } from "antd";

type AntdIconNativeType = typeof SyncOutlined;
export interface SuraLoadingButtonProps {
  loadingTiming?: number;
  onClick?: MouseEventHandler<HTMLElement>;
  loadingSyncProps?: Partial<AntdIconNativeType>;
  component: ForwardRefExoticComponent<
    ButtonProps & RefAttributes<HTMLElement>
  >;
  componentProps?: Partial<SuraLoadingButtonProps["component"]["defaultProps"]>;
  animate?: boolean;
}

export const SuraLoadingButton: FC<SuraLoadingButtonProps> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const Component = props.component ? props.component : Button;
  return (
    <Component
      {...props.componentProps}
      onClick={(e) => {
        setLoading(true);
        props.onClick?.(e);
        setTimeout(() => {
          setLoading(false);
        }, props.loadingTiming ?? 1000);
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <SyncOutlined
            {...props.loadingSyncProps}
            spin={props.animate === undefined ? isLoading : props.animate}
          />
        </div>
        <div style={{ paddingRight: 5 }} />
        <div>{props.children}</div>
      </div>
    </Component>
  );
};

SuraLoadingButton.defaultProps = {
  loadingTiming: 1000,
};
