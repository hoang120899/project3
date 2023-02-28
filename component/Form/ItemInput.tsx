import { FormItemProps } from "./Item.types";
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  useField,
} from "formik";
import { isEqual } from "lodash-es";
import { cloneElement, isValidElement, memo, useCallback } from "react";

const FormItemInput = (props: FormItemProps) => {
  const [field, fieldMeta, fieldHelpers] = useField({
    name: props.name || "",
  });

  return (
    <MemoFormItemInput
      field={field}
      fieldMeta={fieldMeta}
      fieldHelpers={fieldHelpers}
      {...props}
    />
  );
};

export default FormItemInput;

const MemoFormItemInput = memo(
  function RFormItemInput<Values>({
    children,
    valuePropName = "value",
    onChangePropName = "onChange",
    onBlurPropName = "onBlur",
    getValueFromOnChange,
    onChange,
    field,
    fieldMeta,
    fieldHelpers,
  }: FormItemProps & {
    field?: FieldInputProps<Values>;
    fieldMeta?: FieldMetaProps<Values>;
    fieldHelpers?: FieldHelperProps<Values>;
  }) {
    // Handle input events
    const defaultGetValueFromOnChange = useCallback((event: any) => {
      if (event?.target) {
        return event.target.checked ?? event.target.value;
      }

      return event;
    }, []);

    const handleInputChange = useCallback(
      (event: any) => {
        fieldHelpers?.setTouched(true);
        fieldHelpers?.setValue(
          event === undefined
            ? undefined
            : getValueFromOnChange
            ? getValueFromOnChange(event)
            : defaultGetValueFromOnChange(event)
        );
        onChange && onChange(event);
      },
      [getValueFromOnChange, onChange, fieldHelpers, field]
    );

    const handleInputBlur = useCallback(() => {
      fieldHelpers?.setTouched(true);
    }, [field, fieldHelpers]);

    // Handle render
    const input = isValidElement(children)
      ? cloneElement(children, {
          [valuePropName]: fieldMeta?.value,
          [onChangePropName]: handleInputChange,
          [onBlurPropName]: handleInputBlur,
          error:
            fieldMeta?.error && fieldMeta.touched
              ? fieldMeta?.error
              : undefined,
        } as any)
      : null;

    return input;
  },
  (prev, next) => {
    const { fieldMeta: prevFieldMeta, ...prevProps } = prev;
    const { fieldMeta: nextFieldMeta, ...nextProps } = next;

    delete prevProps.field;
    delete prevProps.fieldHelpers;
    delete nextProps.field;
    delete nextProps.fieldHelpers;

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

    return isEqual(prevFieldMeta, nextFieldMeta);
  }
);
