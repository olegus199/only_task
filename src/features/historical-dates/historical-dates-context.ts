import { createContext, useContext } from "react";

export type TimePeriodName =
  "technologies"
  | "cinema"
  | "literature"
  | "theater"
  | "sports"
  | "science";

export type TranslatedTimePeriodName = Record<TimePeriodName, string>;

interface IEvent {
  year: number;
  description: string;
}

export interface TimePeriod {
  name: TimePeriodName;
  years: [number, number];
  events: IEvent[];
}

export interface ActiveTimePeriod extends TimePeriod {
  currentIdx: number;
  multiplier: number;
}

export interface IHistoricalDatesContext {
  timePeriods: TimePeriod[];
  activeTimePeriod: ActiveTimePeriod;
  translatedTimePeriodNames: TranslatedTimePeriodName;
  handleChangeActiveTimePeriod: (
    name: TimePeriodName, newIdx: number, multiplier: number) => void;
  dotsAmount: number;
  animationDelay: number;
}

export const HistoricalDatesContext = createContext<IHistoricalDatesContext | undefined>(undefined);

export function useHistoricalDates() {
  const context = useContext(HistoricalDatesContext);
  if (!context) {
    throw new Error("useHistoricalDates must be used within a CounterProvider");
  }
  return context;
}