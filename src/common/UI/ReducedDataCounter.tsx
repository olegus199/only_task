import styles from "./ReducedDataCounter.module.scss";
import { FC } from "react";
import useDataCounter from "../hooks/useDataCounter.tsx";

interface ReducedDataCounterProps {
  maxData: number;
}

const ReducedDataCounter: FC<ReducedDataCounterProps> = ({ maxData }) => {
  const { reducedDataCounter } = useDataCounter(maxData);

  return (
    <p
      className={styles.reduced_data}
    >
      {reducedDataCounter}
    </p>
  );
};

export default ReducedDataCounter;