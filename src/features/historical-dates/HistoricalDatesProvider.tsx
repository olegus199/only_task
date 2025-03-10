import { FC, ReactNode, useEffect, useReducer, useState } from "react";
import {
  ActiveTimePeriod,
  HistoricalDatesContext,
  IHistoricalDatesContext,
  TimePeriod,
  TimePeriodName,
  TranslatedTimePeriodName,
} from "./historical-dates-context.ts";
import { node } from "globals";

interface HistoricalDatesProviderProps {
  children: ReactNode;
}

const translatedTimePeriodNames: TranslatedTimePeriodName = {
  technologies: "Технологии",
  cinema: "Кино",
  literature: "Литература",
  theater: "Театр",
  sports: "Спорт",
  science: "Наука",
};

const timePeriods: TimePeriod[] = [
  {
    name: "technologies",
    years: [1980, 1986],
    events: [],
  },
  {
    name: "cinema",
    years: [1987, 1991],
    events: [],
  },
  {
    name: "literature",
    years: [1992, 1997],
    events: [],
  },
  {
    name: "theater",
    years: [1998, 2005],
    events: [],
  },
  {
    name: "sports",
    years: [2006, 2014],
    events: [],
  },
  {
    name: "science",
    years: [2015, 2022],
    events: [],
  },
];

const HistoricalDatesProvider: FC<HistoricalDatesProviderProps> = ({ children }) => {
  const [activeTimePeriod, setActiveTimePeriod] = useState<ActiveTimePeriod>({
    ...timePeriods[0],
    currentIdx: 0,
    multiplier: 0,
  });

  function handleChangeActiveTimePeriod(
    name: TimePeriodName, newIdx: number, multiplier: number): void {
    const newTimePeriod = timePeriods.find((period) => period.name === name);
    if (newTimePeriod) {
      setActiveTimePeriod({
        ...newTimePeriod,
        currentIdx: newIdx,
        multiplier,
      });
    }
  }

  const value: IHistoricalDatesContext = {
    timePeriods,
    activeTimePeriod,
    translatedTimePeriodNames,
    handleChangeActiveTimePeriod,
  };

  return (
    <HistoricalDatesContext.Provider value={value}>
      {children}
    </HistoricalDatesContext.Provider>
  );
};

export default HistoricalDatesProvider;