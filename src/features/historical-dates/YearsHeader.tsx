import styles from "./YearsHeader.module.scss";
import { FC } from "react";
import ReducedDataCounter from "../../common/UI/ReducedDataCounter.tsx";
import { useHistoricalDates } from "./historical-dates-context.ts";

const YearsHeader: FC = () => {
  const years = useHistoricalDates().activeTimePeriod.years;
  return (
    <div className={styles.dates_header}>
      <ReducedDataCounter maxData={years[0]} />
      <ReducedDataCounter maxData={years[1]} />
    </div>
  );
};

export default YearsHeader;