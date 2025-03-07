import styles from "./YearsHeader.module.scss";
import { FC } from "react";
import { useHistoricalDates } from "./historical-dates-context.ts";
import AnimatedCounter from "../../common/UI/AnimatedCounter.tsx";

const YearsHeader: FC = () => {
  const years = useHistoricalDates().activeTimePeriod.years;
  return (
    <div className={styles.years_header}>
      <AnimatedCounter
        targetValue={years[0]}
        rangeBoundary="from"
      />
      <AnimatedCounter
        targetValue={years[1]}
        rangeBoundary="to"
      />
    </div>
  );
};

export default YearsHeader;