import { FormikContextType, useFormikContext } from "formik";
import { isEqual } from "lodash-es";
import { createElement, isValidElement, memo } from "react";
import { FormItemProps } from "./Item.types";

const MemoInput = memo(
  ({ children }: any) => {
    return children;
  },
  (prev, next) => {
    return prev.value === next.value;
  }
);

const FormItemContext = (props: FormItemProps) => {
  // Initial field
  const formContext = useFormikContext<any>();
  return <MemoFormItemContext {...props} formContext={formContext} />;
};

const MemoFormItemContext = memo(
  ({
    // dependencies,
    children,
    formContext,
  }: FormItemProps & { formContext: FormikContextType<any> }) => {
    // Handle render
    const input = isValidElement(children)
      ? createElement(MemoInput, {}, children)
      : children
      ? children(formContext)
      : null;

    return input;
  },
  (prev, next) => {
    const { formContext: prevFormContext, ...prevProps } = prev;
    const { formContext: nextFormContext, ...nextProps } = next;

    if (!isEqual(prevProps, nextProps)) {
      return false;
    }

    if (
      isValidElement(prevProps.children) &&
      isValidElement(nextProps.children)
    ) {
      if (!isEqual(prevProps.children.props, nextProps.children.props)) {
        return false;
      }
    }

    return next.shouldUpdate === undefined
      ? isEqual(prevFormContext.values, nextFormContext.values) &&
          isEqual(prevFormContext.dirty, nextFormContext.dirty) &&
          isEqual(prevFormContext.errors, nextFormContext.errors) &&
          prevFormContext.isValid === nextFormContext.isValid
      : typeof next.shouldUpdate === "boolean"
      ? !next.shouldUpdate
      : !next.shouldUpdate(prevFormContext, nextFormContext);
  }
);

export default FormItemContext;
