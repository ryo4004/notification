import express from 'express'
import { auth } from './library/auth'
import * as lib from './library/library'
import * as libToken from './library/token'

import type { Session } from './types/auth'

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

app.post('/update_token', async (req, res) => {
  const { session, token, status }: { session: Session; token: string; status: boolean } = req.body
  console.log('[' + lib.showTime() + '] /update_token: ' + session.userid)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const tokenResult = await libToken.updateToken(session.userid, session.useragent, token, status)
  if (tokenResult.error) return res.json({ status: false })
  return res.json({ status: true, updated: tokenResult.result })
})

app.post('/update_token')
app.post('/remove_notification')

type UpdateTopicReq = { session: Session; token: string; topicName: string; status: boolean }
app.post('/update_topic', async (req, res) => {
  const { session, token, topicName, status }: UpdateTopicReq = req.body
  console.log('[' + lib.showTime() + '] /update_token: ' + session.userid)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const topicResult= await libToken.updateTopic(token, )
})

app.listen(3011)
