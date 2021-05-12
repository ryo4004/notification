export type EachSchedule = {
  date: string // "2021-05-15",
  weekjp: string // "土",
  weeken: string // "saturday",
  place: string // "長岡リリックホール",
  time: {
    start: string // "18:00",
    end: string // "22:00"
  }
  studio: string // "第1スタジオ",
  memo: string | boolean // "楽譜整理"
}

export type ScheduleList = {
  timestamp: {
    date: string // "2021-05-13",
    time: string // "00:22",
    year: string // "2021",
    month: string // "05",
    day: string // "13",
    hour: string // "00",
    minute: string // "22"
  }
  today: boolean
  next: EachSchedule
  list: EachSchedule[]
  schedule: {
    // "2021-05": 月ごと
    [key: string]: EachSchedule[]
  }
}
