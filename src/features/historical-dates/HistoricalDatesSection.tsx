import styles from "./HistoricalDatesSection.module.scss";
import { FC } from "react";
import YearsHeader from "./YearsHeader.tsx";

const HistoricalDatesSection: FC = () => {
  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Исторические <br />даты</h1>
        <YearsHeader />
      </div>
    </main>
  );
};

export default HistoricalDatesSection;