import { useEffect, useRef, useState } from "react";
import { dates } from "../data.ts";

const useDataCounter = (
  maxData: number,
  timeout: number = 45,
) => {
  const minDate = dates[0][0] - 10;
  const [reducedDataCounter, setReducedDataCounter] = useState(minDate);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const countRef = useRef(minDate);

  // Increment reducedData
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