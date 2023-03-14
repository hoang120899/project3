import { Icon } from "@fluentui/react";
import {
  Input,
  InputOnChangeData,
  InputProps,
  Text,
} from "@fluentui/react-components";
import { useCallback } from "react";

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
  return (
    <div className="mb-4">
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
      {error ? (
        <div className="flex items-center mt-1">
          <Icon iconName="Error" className="mr-2 text-red-600" />
          <Text className="text-red-600">{error}</Text>
        </div>
      ) : null}
    </div>
  );
};
