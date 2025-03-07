import { FC, ReactNode, useReducer, useState } from "react";
import {
  HistoricalDatesContext, IHistoricalDatesContext, TimePeriod, TimePeriodName,
} from "./historical-dates-context.ts";

interface HistoricalDatesProviderProps {
  children: ReactNode;
}

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
  const [activeTimePeriod, setActiveTimePeriod] = useState<TimePeriod>(timePeriods[0]);

  function handleChangeActiveTimePeriod(name: TimePeriodName): void {
    const newTimePeriod = timePeriods.find((period) => period.name === name);
    if (newTimePeriod) {
      setActiveTimePeriod(newTimePeriod);
    }
  }

  const value: IHistoricalDatesContext = {
    timePeriods,
    activeTimePeriod,
    handleChangeActiveTimePeriod,
  };

  return (
    <HistoricalDatesContext.Provider value={value}>
      {children}
    </HistoricalDatesContext.Provider>
  );
};

export default HistoricalDatesProvider;