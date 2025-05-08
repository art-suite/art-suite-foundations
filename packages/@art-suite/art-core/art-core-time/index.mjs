import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  formatDate,
  toMilliseconds,
  toSeconds,
  toDate,
  firstOfHour,
  firstOfDay,
  firstOfWeek,
  firstOfMonth,
  firstOfYear,
  firstOfDayLocale,
  firstOfWeekLocale,
  firstOfMonthLocale,
  firstOfYearLocale,
  normalizedTimeNames,
  longTimeNames,
  secondsPer,
  dateAgeInSeconds,
  humanDurationString,
  humanTimeDeltaString,
  niceFullDateString,
  niceMonthYear,
  niceDateString,
  niceTimeDetailsString,
  timeAgo,
  time,
  currentSecond
} = require('./build');