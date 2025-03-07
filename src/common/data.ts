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

interface TimePeriod {
  name: TimePeriodName;
  years: [number, number];
  events: IEvent[];
}

export const timePeriods: TimePeriod[] = [
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