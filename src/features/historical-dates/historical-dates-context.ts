import { createContext, useContext } from "react";

export type TimePeriodName =
  "technologies"
  | "cinema"
  | "literature"
  | "theater"
  | "sports"
  | "science";

interface IEvent {
  year: number;
  description: string;
}

export interface TimePeriod {
  name: TimePeriodName;
  years: [number, number];
  events: IEvent[];
}

export interface IHistoricalDatesContext {
  timePeriods: TimePeriod[];
  activeTimePeriod: TimePeriod;
  handleChangeActiveTimePeriod: (name: TimePeriodName) => void;
}

export const HistoricalDatesContext = createContext<IHistoricalDatesContext | undefined>(undefined);

export function useHistoricalDates() {
  const context = useContext(HistoricalDatesContext);
  if (!context) {
    throw new Error("useHistoricalDates must be used within a CounterProvider");
  }
  return context;
}