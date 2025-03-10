import styles from "./HistoricalDatesSection.module.scss";
import { FC } from "react";
import YearsSelectorCircle from "./YearsSelectorCircle.tsx";
import YearsNavigation from "../../common/UI/YearsNavigation.tsx";
import SwiperSlider from "./SwiperSlider.tsx";

const HistoricalDatesSection: FC = () => {
  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Исторические <br />даты</h1>
        <YearsSelectorCircle />
        <YearsNavigation />
        <SwiperSlider />
      </div>
    </main>
  );
};

export default HistoricalDatesSection;