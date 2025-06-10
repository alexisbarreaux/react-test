import { useRef, useEffect } from "react";

// Personal implementation of usePrevious hook
export function usePrevious<T>(value: T): T | undefined {
  const previousValue = useRef<T | undefined>(undefined)

  const currentPrevious = previousValue.current
  previousValue.current = value
  
  return currentPrevious
}

// More complex react implementation of usePrevious hook
export function usePrevious<T>(value: T): T | undefined {
  /* The ref object is a generic container whose current property is mutable
  and can hold any value, similar to an instance property on a class */
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}