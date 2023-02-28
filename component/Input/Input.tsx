import { Input, InputProps, Text } from "@fluentui/react-components";

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
  return (
    <div className="mb-2">
      {label ? (
        <div className="mb-2">
          <Text>{label}</Text>
        </div>
      ) : null}
      <Input
        value={value}
        onChange={(e, data) => onChange && onChange(data.value)}
        className="w-full"
        {...inputProps}
      />
    </div>
  );
};
