import { useEffect, useState } from "react";

export const useDebounce = (delay = 3000, value: string | undefined) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearInterval(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
