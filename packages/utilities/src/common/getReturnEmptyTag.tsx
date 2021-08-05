// *
// * Generate Empty Tag when data is empty
// *

/* eslint-disable indent */
import { Tag, TagProps, Typography, TypographyProps } from "antd";
import parse from "html-react-parser";

export type GetReturnEmptyTagProps = {
  data: string | number | undefined;
  returnType: "Tag" | "Typography" | "HTML";
  tagProps?: TagProps;
  typographyProps?: TypographyProps;
};

export const getReturnEmptyTag = ({
  data,
  returnType,
  tagProps,
  typographyProps,
}: GetReturnEmptyTagProps) => {
  if (data === undefined || data === null || data.toString().length === 0) {
    return <Tag />;
  } else {
    switch (returnType) {
      case "Tag":
        return <Tag {...tagProps}>{data}</Tag>;
      case "Typography":
        return <Typography.Text {...typographyProps}>{data}</Typography.Text>;
      case "HTML":
        return <>{parse(data?.toString() ?? "")}</>;
      default:
        return <Tag />;
    }
  }
};
