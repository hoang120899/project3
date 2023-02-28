import { FormikContextType } from "formik";
import React from "react";

export interface FormItemProps {
  name?: string;
  children?:
    | React.ReactElement
    | ((form: FormikContextType<any>) => JSX.Element | null);
  valuePropName?: string;
  onChangePropName?: string;
  onBlurPropName?: string;
  getValueFromOnChange?: (event: any) => void;
  onChange?: (event: any) => void;
  shouldUpdate?:
    | boolean
    | ((
        prevFormContext: FormikContextType<any>,
        nextFormContext: FormikContextType<any>
      ) => boolean);
}
