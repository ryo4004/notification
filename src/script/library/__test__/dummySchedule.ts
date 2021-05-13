import type { EachSchedule, ScheduleList } from '../../../types/schedule'

export const createDummyEachSchedule = (extraSchedule: Partial<EachSchedule> = {}): EachSchedule => {
  return {
    date: '2021-05-15',
    memo: false,
    place: '長岡リリックホール',
    studio: '第1スタジオ',
    time: { start: '18:00', end: '22:00' },
    weeken: 'saturday',
    weekjp: '土',
    ...extraSchedule,
  }
}

export const createDummyScheduleList = (
  extraToday: boolean = false,
  extraNext: Partial<EachSchedule> = {},
  extraTimestamp: Partial<ScheduleList['timestamp']> = {}
): ScheduleList => {
  const newTimestamp = {
    date: '2021-05-13',
    time: '23:34',
    year: '2021',
    month: '05',
    day: '13',
    hour: '23',
    minute: '34',
    ...extraTimestamp,
  }
  const newNext = {
    date: '2021-05-15',
    weekjp: '土',
    weeken: 'saturday',
    place: '長岡リリックホール',
    time: {
      start: '18:00',
      end: '22:00',
    },
    studio: '第1スタジオ',
    memo: '楽譜整理',
    ...extraNext,
  }
  return {
    timestamp: newTimestamp,
    today: extraToday,
    next: newNext,
    list: [
      {
        date: '2021-05-15',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第1スタジオ',
        memo: '楽譜整理',
      },
      {
        date: '2021-05-22',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
      {
        date: '2021-05-29',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
      {
        date: '2021-06-05',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
      {
        date: '2021-06-12',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第2スタジオ',
        memo: false,
      },
      {
        date: '2021-06-19',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
      {
        date: '2021-06-26',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第4スタジオ',
        memo: false,
      },
      {
        date: '2021-07-03',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
      {
        date: '2021-07-17',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
      {
        date: '2021-07-24',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第2スタジオ',
        memo: false,
      },
      {
        date: '2021-07-31',
        weekjp: '土',
        weeken: 'saturday',
        place: '長岡リリックホール',
        time: {
          start: '18:00',
          end: '22:00',
        },
        studio: '第5スタジオ',
        memo: false,
      },
    ],
    schedule: {
      '2021-05': [
        {
          date: '2021-05-15',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第1スタジオ',
          memo: '楽譜整理',
        },
        {
          date: '2021-05-22',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
        {
          date: '2021-05-29',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
      ],
      '2021-06': [
        {
          date: '2021-06-05',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
        {
          date: '2021-06-12',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第2スタジオ',
          memo: false,
        },
        {
          date: '2021-06-19',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
        {
          date: '2021-06-26',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第4スタジオ',
          memo: false,
        },
      ],
      '2021-07': [
        {
          date: '2021-07-03',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
        {
          date: '2021-07-17',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
        {
          date: '2021-07-24',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第2スタジオ',
          memo: false,
        },
        {
          date: '2021-07-31',
          weekjp: '土',
          weeken: 'saturday',
          place: '長岡リリックホール',
          time: {
            start: '18:00',
            end: '22:00',
          },
          studio: '第5スタジオ',
          memo: false,
        },
      ],
    },
  }
}
