import styles from "./HistoricalDatesSection.module.scss";
import { FC } from "react";
import YearsSelectorCircle from "./YearsSelectorCircle.tsx";

const HistoricalDatesSection: FC = () => {
  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Исторические <br />даты</h1>
        <YearsSelectorCircle />
        <div style={{ height: "50vh" }}></div>
      </div>
    </main>
  );
};

export default HistoricalDatesSection;