import { createDummyTokenDBData } from './dummyTokenDBData'
import { getActiveTokens, getTokensOnly, getActiveTokensWithTopic } from '../library'

describe('getActiveTokens', () => {
  it('statusがtrueのtokenのみ取り出せること', () => {
    const dummyTokenDBData1 = createDummyTokenDBData({ status: true })
    const dummyTokenDBData2 = createDummyTokenDBData({ status: false })
    expect(getActiveTokens([dummyTokenDBData1, dummyTokenDBData2])).toEqual([dummyTokenDBData1])
  })
})

describe('getTokensOnly', () => {
  it('DBのデータからtokenのみを抜き出した配列になること', () => {
    const token1 = 'aaa'
    const token2 = 'bbb'
    const dummyTokenDBData1 = createDummyTokenDBData({ token: token1 })
    const dummyTokenDBData2 = createDummyTokenDBData({ token: token2 })
    expect(getTokensOnly([dummyTokenDBData1, dummyTokenDBData2])).toEqual([token1, token2])
  })
})

describe('getActiveTokensWithTopic', () => {
  describe('importantScheduleが有効', () => {
    it('有効なデータのみ取り出せること', () => {
      const dummyTokenDBData = createDummyTokenDBData({}, { importantSchedule: true })
      expect(getActiveTokensWithTopic([dummyTokenDBData], 'importantSchedule')).toEqual([dummyTokenDBData])
    })
    it('無効なデータは取り出せないこと', () => {
      const dummyTokenDBData = createDummyTokenDBData({}, { importantSchedule: false })
      expect(getActiveTokensWithTopic([dummyTokenDBData], 'importantSchedule')).toEqual([])
    })
    it('他が有効でも対象が有効でなければ取り出せないこと', () => {
      const dummyTokenDBData = createDummyTokenDBData(
        {},
        {
          importantSchedule: false,
          importantManager: true,
          scheduleUpdate: true,
          historyUpdate: true,
          othersUpdate: true,
        }
      )
      expect(getActiveTokensWithTopic([dummyTokenDBData], 'importantSchedule')).toEqual([])
    })
  })
})
