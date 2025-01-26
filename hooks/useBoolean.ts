import { useState } from "react";



export const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(defaultValue || false);
  const onTrue = () => setValue(true);
  const onFalse = () => setValue(false);
  const onToggle = () => setValue((prev) => !prev);
  return { value, setValue, onTrue, onFalse, onToggle };
};
