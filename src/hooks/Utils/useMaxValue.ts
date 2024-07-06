import { useCallback, useEffect, useState } from "react";

export const useMaxValue = (value: number) => {
  const [currentMax, setCurrentMax] = useState(0);

  useEffect(() => {
    if (currentMax < value) setCurrentMax(value);
  }, [value]);

  const reset = useCallback(() => setCurrentMax(0), []);

  return {
    currentMax,
    reset,
  };
};
