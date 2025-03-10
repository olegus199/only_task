import styles from "./HistoricalDatesSection.module.scss";
import { FC } from "react";
import PeriodSelectorCircle from "./PeriodSelectorCircle.tsx";
import PeriodNavigation from "../../common/UI/PeriodNavigation.tsx";
import SwiperSlider from "./SwiperSlider.tsx";
import MobileTimePeriod from "./MobileTimePeriod.tsx";
import MobilePeriodSelector from "./MobilePeriodSelector.tsx";

const HistoricalDatesSection: FC = () => {
  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Исторические <br />даты</h1>
        <PeriodSelectorCircle />
        <MobileTimePeriod />
        <PeriodNavigation />
        <SwiperSlider />
        <MobilePeriodSelector />
      </div>
    </main>
  );
};

export default HistoricalDatesSection;