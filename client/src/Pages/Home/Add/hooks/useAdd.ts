import { useState } from 'react'
import { TOPICS_KEYS } from '../../../../types/notification'

import { useStatusContext } from '../../../../hooks/useStatus'

import type { TopicsKeys } from '../../../../types/notification'

type AddNotification = {
  status: boolean
  title: string
  body: string
  path: string
  topicKey: TopicsKeys
  immediately: boolean
}

type AddStateType = {
  loading: boolean
  result: boolean
  notification: AddNotification
}

const initNotification = {
  status: true,
  title: '',
  body: '',
  path: '/',
  topicKey: TOPICS_KEYS.IMPORTANT_MANAGER,
  immediately: false,
}

const initState = {
  loading: false,
  result: false,
  notification: initNotification,
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
  const updateTopicKey = (topicKey: TopicsKeys) => {
    setState({
      ...state,
      notification: {
        ...state.notification,
        topicKey,
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
    setState({ ...state, loading: false, result: json.result, notification: initNotification })
  }
  return { state, updateAdd, updateTopicKey, updateCheckbox, requestSend }
}
