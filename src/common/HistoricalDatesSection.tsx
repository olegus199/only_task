import styles from "./HistoricalDatesSection.module.scss";
import { FC } from "react";
import ReducedDataCounter from "./UI/ReducedDataCounter.tsx";
import { dates } from "./data.ts";

const HistoricalDatesSection: FC = () => {
  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Исторические <br />даты</h1>
        <ReducedDataCounter maxData={dates[0][0]} />
      </div>
    </main>
  );
};

export default HistoricalDatesSection;