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

app.post('/add_token', async (req, res) => {
  const { session, token }: { session: Session; token: string } = req.body
  console.log('[' + lib.showTime() + '] /add_token: ' + session.userid)
  const authResult = await auth(session)
  if (!authResult) return res.json({ status: false })
  const tokenResult = await libToken.addToken(session.userid, session.useragent, token)
  if (!tokenResult) return res.json({ status: false })
  return res.json({ status: true, result: tokenResult })
})

app.post('/update_token')
app.post('/remove_notification')
app.post('/update_request')

app.listen(3011)
