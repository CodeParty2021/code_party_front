import { DependencyList, useCallback, useEffect, useState } from "react";

type IResponse<T> = [NonNullable<T>, () => void];

export const usePreviousNonNull = <T>(
  factory: () => T,
  dependencies: DependencyList | undefined,
  defaultValue: NonNullable<T>
): IResponse<T> => {
  const [previous, setPrevious] = useState<NonNullable<T>>(defaultValue);

  useEffect(() => {
    const nextValue = factory();
    if (isNonNull(nextValue)) {
      setPrevious(nextValue);
    }
  }, [dependencies]);

  const reset = useCallback(() => {
    setPrevious(defaultValue);
  }, []);

  return [previous, reset];
};

const isNonNull = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;
