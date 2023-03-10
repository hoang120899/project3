import { Icon } from "@fluentui/react";
import { Input, InputProps } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";

export interface FilterProps {
  value?: string;
  onChange?: (value: string) => void;
  inputProps?: InputProps;
}

export function Filter({ value, onChange, inputProps }: FilterProps) {
  const [valueFilter, setValueFilter] = useState<string>("");

  const handleChangeFilter = useCallback(
    (data: { value: string }) => {
      onChange && onChange(data.value);
    },
    [onChange, value]
  );

  useEffect(() => {
    setValueFilter(value || "");
  }, [value]);
  return (
    <div className="w-full">
      <Input
        {...inputProps}
        value={valueFilter}
        onChange={(e, data) => handleChangeFilter(data)}
        contentBefore={<Icon iconName="Search" />}
        className="w-full"
      />
    </div>
  );
}
