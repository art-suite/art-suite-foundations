export interface LongTimeNames {
  ms: 'millisecond'
  s: 'second'
  m: 'minute'
  h: 'hour'
  d: 'day'
  mo: 'month'
  y: 'year'
  w: 'week'
}

export interface NormalizedTimeNames {
  millisecond: 'ms'
  second: 's'
  minute: 'm'
  hour: 'h'
  day: 'd'
  month: 'mo'
  year: 'y'
  week: 'w'
  ms: 'ms'
  s: 's'
  m: 'm'
  h: 'h'
  d: 'd'
  mo: 'mo'
  y: 'y'
  w: 'w'
}

export interface SecondsPer {
  ms: number
  s: number
  m: number
  h: number
  d: number
  w: number
  mo: number
  y: number
  millisecond: number
  second: number
  minute: number
  hour: number
  day: number
  month: number
  year: number
  week: number
}

export const normalizedTimeNames: NormalizedTimeNames
export const longTimeNames: LongTimeNames
export const secondsPer: SecondsPer

export interface HumanDurationOptions {
  verbose?: boolean
  precision?: number
  now?: Date
}

export const dateAgeInSeconds: (date: Date, now?: Date) => number

export const humanDurationString: (seconds: number, options?: HumanDurationOptions) => string

export const niceFullDateString: (date: Date) => string

export const niceMonthYear: (date: Date) => string

export const niceDateString: (date: Date, now?: Date) => string

export const niceTimeDetailsString: (date: Date) => string

export const timeAgo: (date: Date, options?: HumanDurationOptions) => string