import { FormItemProps } from "./Item.types";
import FormItemContext from "./ItemContext";
import FormItemInput from "./ItemInput";
import { memo } from "react";

const FormItem = memo((props: FormItemProps) => {
  if (props.name) {
    return <FormItemInput {...props} />;
  }

  return <FormItemContext {...props} />;
});

export default FormItem;
