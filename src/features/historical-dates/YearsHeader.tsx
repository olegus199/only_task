import styles from "./YearsHeader.module.scss";
import { FC } from "react";
import { timePeriods } from "../../common/data.ts";
import ReducedDataCounter from "../../common/UI/ReducedDataCounter.tsx";

const YearsHeader: FC = () => {
  const initYears = timePeriods[0].years;
  return (
    <div className={styles.dates_header}>
      <ReducedDataCounter maxData={initYears[0]} />
      <ReducedDataCounter maxData={initYears[1]} />
    </div>
  );
};

export default YearsHeader;