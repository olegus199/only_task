import styles from "./YearsNavigation.module.scss";
import { FC } from "react";
import { useHistoricalDates } from "../../features/historical-dates/historical-dates-context.ts";
import { IoChevronBackSharp } from "react-icons/io5";

const YearsNavigation: FC = () => {
  const {
    activeTimePeriod: { currentIdx, multiplier },
    dotsAmount,
    timePeriods,
    handleChangeActiveTimePeriod,
  } = useHistoricalDates();

  function handleNavigationClick(direction: "back" | "forth"): void {
    switch (direction) {
      case "forth": {
        const newIdx = (currentIdx + 1) % dotsAmount;

        let newMultiplier = multiplier;
        if (newIdx === 0) {
          newMultiplier += 1;
        }

        const newName = timePeriods[newIdx]?.name;

        if (newName) {
          handleChangeActiveTimePeriod(newName, newIdx, newMultiplier);
        }

        break;
      }
      case "back": {
        let newIdx = currentIdx - 1;
        let newMultiplier = multiplier;

        if (newIdx === -1) {
          newIdx = 5;
          newMultiplier -= 1;
        }

        const newName = timePeriods[newIdx]?.name;

        if (newName) {
          handleChangeActiveTimePeriod(newName, newIdx, newMultiplier);
        }

        break;
      }
    }
  }

  return (
    <div className={styles.years_navigation}>
      <div className={styles.navigation_total}>
        <p>{(currentIdx + 1).toString().padStart(2, "0")}</p>
        <p>/</p>
        <p>{dotsAmount.toString().padStart(2, "0")}</p>
      </div>
      <div className={styles.navigation_buttons}>
        <button
          onClick={() => handleNavigationClick("back")}
          className={styles.navigation_button}
        >
          <IoChevronBackSharp
            className={styles.button_icon}
          />
        </button>
        <button
          onClick={() => handleNavigationClick("forth")}
          className={styles.navigation_button}
        >
          <IoChevronBackSharp
            style={{ transform: "rotate(180deg)" }}
            className={styles.button_icon}
          />
        </button>
      </div>
    </div>
  );
};

export default YearsNavigation;