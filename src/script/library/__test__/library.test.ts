import { createDummyTokenDBData } from './dummyTokenDBData'
import { getAllTokens, getActiveTokens, getTokensOnly, getActiveTokensWithTopic } from '../library'
import { TokenDBData } from '../../../types/token'

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
  it('要素がひとつでも配列になる', () => {
    const token = 'aaa'
    const dummyTokenDBData = createDummyTokenDBData({ token })
    expect(getTokensOnly([dummyTokenDBData])).toEqual([token])
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

describe('getActiveTokensWithTopic and getTokensOnly', () => {
  describe('getAllTokensを使う', () => {
    it('importantSchedule', async () => {
      // 呼び出し元のlibrary.tsからのパスを指定する
      const tokenList = ((await getAllTokens('./__test__/dummyToken.db')) as unknown) as TokenDBData[]
      const calculated = getTokensOnly(getActiveTokensWithTopic(tokenList, 'importantSchedule'))
      const expected = expect.arrayContaining(['allTrue', 'importantSchedule'])
      expect(calculated).toEqual(expected)
    })
    it('importantManager', async () => {
      // 呼び出し元のlibrary.tsからのパスを指定する
      const tokenList = ((await getAllTokens('./__test__/dummyToken.db')) as unknown) as TokenDBData[]
      const calculated = getTokensOnly(getActiveTokensWithTopic(tokenList, 'importantManager'))
      const expected = expect.arrayContaining(['allTrue', 'importantManager'])
      expect(calculated).toEqual(expected)
    })
    it('scheduleUpdate', async () => {
      // 呼び出し元のlibrary.tsからのパスを指定する
      const tokenList = ((await getAllTokens('./__test__/dummyToken.db')) as unknown) as TokenDBData[]
      const calculated = getTokensOnly(getActiveTokensWithTopic(tokenList, 'scheduleUpdate'))
      const expected = expect.arrayContaining(['allTrue', 'scheduleUpdate'])
      expect(calculated).toEqual(expected)
    })
    it('historyUpdate', async () => {
      // 呼び出し元のlibrary.tsからのパスを指定する
      const tokenList = ((await getAllTokens('./__test__/dummyToken.db')) as unknown) as TokenDBData[]
      const calculated = getTokensOnly(getActiveTokensWithTopic(tokenList, 'historyUpdate'))
      const expected = expect.arrayContaining(['allTrue', 'historyUpdate'])
      expect(calculated).toEqual(expected)
    })
    it('othersUpdate', async () => {
      // 呼び出し元のlibrary.tsからのパスを指定する
      const tokenList = ((await getAllTokens('./__test__/dummyToken.db')) as unknown) as TokenDBData[]
      const calculated = getTokensOnly(getActiveTokensWithTopic(tokenList, 'othersUpdate'))
      const expected = expect.arrayContaining(['allTrue', 'othersUpdate'])
      expect(calculated).toEqual(expected)
    })
  })
})
