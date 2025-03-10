import styles from "./MobileTimePeriod.module.scss";
import { FC, useRef } from "react";
import { useHistoricalDates } from "./historical-dates-context.ts";
import useCurrentData from "../../common/hooks/useCurrentData.tsx";

const MobileTimePeriod: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { translatedTimePeriodNames } = useHistoricalDates();
  const { currentData } = useCurrentData(containerRef);

  return (
    <div
      ref={containerRef}
      className={styles.mobile_time_period}
    >
      <p className={styles.name}>{translatedTimePeriodNames[currentData.name]}</p>
      <hr className={styles.mobile_divider} />
    </div>
  );
};

export default MobileTimePeriod;