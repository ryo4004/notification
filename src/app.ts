import express from 'express'
import { auth } from './library/auth'
import * as lib from './library/library'
import * as libToken from './library/token'

import type { Session } from './types/auth'
import type { TopicsKeys } from './types/token'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/get_status', async (req, res) => {
  const { session, token }: { session: Session; token: string } = req.body
  console.log('[' + lib.showTime() + '] /get_status: ' + session.userid)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const tokenResult = await libToken.getStatus(token)
  return res.json({ status: true, updated: tokenResult })
})

app.post('/add_notification', async (req, res) => {
  const { session, token }: { session: Session; token: string } = req.body
  console.log('[' + lib.showTime() + '] /add_notification: ' + session.userid)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const tokenResult = await libToken.updateToken(session.userid, session.useragent, token, true)
  if (tokenResult.error) return res.json({ status: false })
  return res.json({ status: true, updated: tokenResult.result })
})

app.post('/remove_notification', async (req, res) => {
  const { session, token }: { session: Session; token: string } = req.body
  console.log('[' + lib.showTime() + '] /remove_notification: ' + session.userid)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const tokenResult = await libToken.updateToken(session.userid, session.useragent, token, false)
  if (tokenResult.error) return res.json({ status: false })
  return res.json({ status: true, updated: tokenResult.result })
})

type UpdateTopicReq = { session: Session; token: string; topicName: TopicsKeys }
app.post('/update_topic', async (req, res) => {
  const { session, token, topicName }: UpdateTopicReq = req.body
  console.log('[' + lib.showTime() + '] /update_topic: ' + session.userid, topicName)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const topicResult = await libToken.updateTopic(token, topicName)
  if (topicResult.error) return res.json({ status: false })
  return res.json({ status: true, updated: topicResult.result })
})

app.listen(3011)
