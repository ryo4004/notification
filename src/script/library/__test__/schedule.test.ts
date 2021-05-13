import { createDummyEachSchedule, createDummyScheduleList } from './dummySchedule'
import { getTodaySchedule, validateToday, getNotificationBody } from '../schedule'

// apiから取得するデータは今日が練習日ではない場合はnextがfalseになる
describe('getTodaySchedule', () => {
  it('今日がfalseのときはfalseになる', () => {
    const scheduleList = createDummyScheduleList(false)
    expect(getTodaySchedule(scheduleList)).toEqual(false)
  })
  it('今日がtrueのときはnextのオブジェクトが取得できる', () => {
    const nextSchedule = createDummyEachSchedule()
    const scheduleList = createDummyScheduleList(true, nextSchedule)
    expect(getTodaySchedule(scheduleList)).toEqual(nextSchedule)
  })
})

describe('validateToday', () => {
  const today = '2021-05-15'
  const present = '18:00'
  it('時刻が一致した場合はtrueが返る', () => {
    const scheduled = createDummyEachSchedule({
      date: today,
      time: { start: present, end: '' },
    })
    expect(validateToday(scheduled, today, present)).toEqual(true)
  })
  it('年が一致しない場合はfalseになる', () => {
    const scheduled = createDummyEachSchedule({
      date: '2020-05-15',
      time: { start: present, end: '' },
    })
    expect(validateToday(scheduled, today, present)).toEqual(false)
  })
  it('月が一致しない場合はfalseになる', () => {
    const scheduled = createDummyEachSchedule({
      date: '2021-04-15',
      time: { start: present, end: '' },
    })
    expect(validateToday(scheduled, today, present)).toEqual(false)
  })
  it('日が一致しない場合はfalseになる', () => {
    const scheduled = createDummyEachSchedule({
      date: '2021-05-14',
      time: { start: present, end: '' },
    })
    expect(validateToday(scheduled, today, present)).toEqual(false)
  })
  it('時刻が一致しない場合はfalseが返る', () => {
    const scheduled = createDummyEachSchedule({
      date: today,
      time: { start: '17:00', end: '' },
    })
    expect(validateToday(scheduled, today, present)).toEqual(false)
  })
})

describe('getNotificationBody', () => {
  it('開始時間と場所とスタジオを出力する', () => {
    const startTime = '18:00'
    const place = '場所'
    const studio = 'スタジオ'
    const scheduled = createDummyEachSchedule({
      time: { start: startTime, end: '' },
      place,
      studio,
    })
    expect(getNotificationBody(scheduled)).toEqual('今日 ' + startTime + 'から\n' + place + ' ' + studio)
  })
})
