import type { Props as ErrorMessageProps } from "@hookform/error-message";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, ReactNode } from "react";
import type { ControllerProps, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const InputHeader = styled.h4`
  margin-top: 10px;
`;

export type AsurRaaInputFormControllerProps<T> = Omit<
  ControllerProps<T, any>,
  "name"
> & {
  name: keyof T;
  titleHeader: string;
  extraTitleHeader?: string | ReactNode;
  errors?: FieldErrors<T>;
  errorsProps?: ErrorMessageProps<T, any>;
};

export const SuraController = <T extends unknown>(
  props: AsurRaaInputFormControllerProps<T>
) => {
  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InputHeader>{props.titleHeader}</InputHeader>
        <InputHeader>{props.extraTitleHeader}</InputHeader>
      </div>
      {/*
  // @ts-ignore */}
      <Controller
        // @ts-ignore
        name={props.name}
        {...props}
      />
      <div style={{ paddingTop: 5 }}>
        {props.errors === null || props.errors === undefined ? null : (
          <ErrorMessage
            {...props.errorsProps}
            errors={props.errors}
            // @ts-ignore
            name={props.name}
          />
        )}
      </div>
    </Fragment>
  );
};
