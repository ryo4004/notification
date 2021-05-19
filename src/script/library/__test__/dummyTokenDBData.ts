import type { TokenDBData, Topics } from '../../../types/token'

export const createDummyTokenDBData = (
  extraToken: Partial<TokenDBData> = {},
  extraTopics: Partial<Topics> = {}
): TokenDBData => {
  const tokenDBData: TokenDBData = {
    token: 'SAMPLE_TOKEN',
    status: false,
    id: 'sample_id',
    useragent: 'SAMPLE_USER_AGENT',
    topics: {
      importantSchedule: false,
      importantManager: false,
      scheduleUpdate: false,
      historyUpdate: false,
      othersUpdate: false,
      ...extraTopics,
    },
    _id: 'NEDB_ID',
    createdAt: '',
    updatedAt: '',
  }
  return {
    ...tokenDBData,
    ...extraToken,
  }
}
