import styles from "./MobilePeriodSelector.module.scss";
import { FC } from "react";
import PeriodNavigation from "../../common/UI/PeriodNavigation.tsx";
import { useHistoricalDates } from "./historical-dates-context.ts";

const MobilePeriodSelector: FC = () => {
  const {
    dotsAmount,
    timePeriods,
    activeTimePeriod: { name: currentPeriodName, multiplier },
    handleChangeActiveTimePeriod,
  } = useHistoricalDates();

  function handleNavigationClick(idx: number): void {
    const nextTimePeriod = timePeriods[idx];

    if (nextTimePeriod) {
      handleChangeActiveTimePeriod(nextTimePeriod.name, idx, multiplier);
    }
  }

  return (
    <div className={styles.mobile_period_selector}>
      <PeriodNavigation isMobile />
      <div className={styles.navigation_container}>
        {Array(dotsAmount).fill(0).map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              handleNavigationClick(idx);
            }}
            className={`${styles.mobile_navigation} ${currentPeriodName === timePeriods[idx]?.name && styles.navigation_active}`}
          />
        ))}
      </div>
      <div className={styles.filler} />
    </div>
  );
};

export default MobilePeriodSelector;