import {
  Input,
  InputOnChangeData,
  InputProps,
  Text,
} from "@fluentui/react-components";
import { useCallback, useEffect } from "react";

interface InputFormProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: any;
  label?: string;
  inputProps?: InputProps;
}

export const InputForm = ({
  value,
  onChange,
  error,
  label,
  inputProps,
}: InputFormProps) => {
  const handleChangevalue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      onChange && onChange(data.value);
    },
    []
  );
  useEffect(() => {
    console.log("error", error);
  }, [error]);
  return (
    <div className="mb-2">
      {label ? (
        <div className="mb-2">
          <Text>{label}</Text>
        </div>
      ) : null}
      <Input
        value={value}
        onChange={handleChangevalue}
        className="w-full"
        {...inputProps}
      />
      {error ? <div>{error}</div> : null}
    </div>
  );
};
