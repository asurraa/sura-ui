import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export interface AsurRaaTextProps extends TextProps {
  children: string;
}

const AsurRaaText: FC<AsurRaaTextProps> = (props) => {
  const { t } = useTranslation();
  return <Typography.Text {...props}>{t(props.children)}</Typography.Text>;
};

export { AsurRaaText };
