import { useEffect, useRef, useState } from "react";

const useDataCounter = (
  maxData: number,
  timeout: number = 50,
) => {
  const minDate = maxData - 10;
  const [reducedDataCounter, setReducedDataCounter] = useState(minDate);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const countRef = useRef(minDate);

  useEffect(() => {
    function runCounter(): void {
      intervalIdRef.current = setInterval(() => {
        if (countRef.current < maxData) {
          const nextCount = countRef.current + 1;
          countRef.current = nextCount;
          setReducedDataCounter(nextCount);
        } else {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
        }
      }, timeout);
    }

    runCounter();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return { reducedDataCounter };
};

export default useDataCounter;