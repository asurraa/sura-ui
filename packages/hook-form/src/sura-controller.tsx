import { Fragment, ReactNode } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import type { ControllerProps } from "react-hook-form";

const InputHeader = styled.h4`
  margin-top: 10px;
`;

export type AsurRaaInputFormControllerProps<T> = ControllerProps<T> & {
  titleHeader: string;
  extraTitleHeader?: string | ReactNode;
};
export const SuraController = <T extends { [x: string]: any }>(
  props: AsurRaaInputFormControllerProps<T>
) => {
  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InputHeader>{props.titleHeader}</InputHeader>
        <InputHeader>{props.extraTitleHeader}</InputHeader>
      </div>
      <Controller {...props} />
    </Fragment>
  );
};
