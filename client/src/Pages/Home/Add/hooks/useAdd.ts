import { useState } from 'react'
import { TOPICS_KEYS } from '../../../../types/notification'

import { useStatusContext } from '../../../../hooks/useStatus'

import type { TopicsKeys } from '../../../../types/notification'

type AddNotification = {
  title: string
  body: string
  path: string
  topic: TopicsKeys
  immediately: boolean
}

type AddStateType = {
  loading: boolean
  result: boolean
  notification: AddNotification
}

const initState = {
  loading: false,
  result: false,
  notification: {
    title: '',
    body: '',
    path: '/',
    topic: TOPICS_KEYS.IMPORTANT_MANAGER,
    immediately: false,
  },
}

export const useAdd = (pass: string) => {
  const { getStatus } = useStatusContext()
  const [state, setState] = useState<AddStateType>(initState)
  const updateAdd = (key: keyof AddNotification, value: string) => {
    setState({
      ...state,
      notification: {
        ...state.notification,
        [key]: value,
      },
    })
  }
  const updateTopic = (topic: TopicsKeys) => {
    setState({
      ...state,
      notification: {
        ...state.notification,
        topic,
      },
    })
  }
  const updateCheckbox = (value: boolean) => {
    setState({
      ...state,
      notification: {
        ...state.notification,
        immediately: value,
      },
    })
  }
  const requestSend = async () => {
    const { notification } = state
    if (notification.title === '' || notification.body === '') return false
    setState({ ...state, loading: true })
    const response = await fetch('/manager/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pass, notification }),
    })
    const json = await response.json()
    getStatus()
    setState({ ...state, loading: false, result: json.result })
  }
  return { state, updateAdd, updateTopic, updateCheckbox, requestSend }
}
