import {
  Text,
  Textarea,
  TextareaOnChangeData,
  TextareaProps,
} from "@fluentui/react-components";
import { useCallback } from "react";

export interface InputAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: any;
  label?: string;
  inputProps?: TextareaProps;
}
export function InputArea({
  value,
  onChange,
  error,
  label,
  inputProps,
}: InputAreaProps) {
  // handleValue
  const handleChangevalue = useCallback((data: TextareaOnChangeData) => {
    onChange && onChange(data.value);
  }, []);
  return (
    <div className="mb-4">
      {label ? (
        <div className="mb-2">
          <Text>{label}</Text>
        </div>
      ) : null}
      <Textarea
        value={value}
        onChange={(e, data) => handleChangevalue(data)}
        className="w-full"
        resize="vertical"
        {...inputProps}
      />
      {error ? <div>{error}</div> : null}
    </div>
  );
}
