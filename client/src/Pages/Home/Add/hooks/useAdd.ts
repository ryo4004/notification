import { useState } from 'react'
import { TOPICS_KEYS } from '../../../../types/notification'

import type { TopicsKeys } from '../../../../types/notification'

type AddNotification = {
  title: string
  body: string
  topic: TopicsKeys
  immediately: boolean
}

type AddStateType = {
  loading: boolean
  notification: AddNotification
}

const initState = {
  loading: false,
  notification: {
    title: '',
    body: '',
    topic: TOPICS_KEYS.IMPORTANT_MANAGER,
    immediately: false,
  },
}

export const useAdd = (pass: string) => {
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
  return { state, updateAdd, updateTopic, updateCheckbox }
}
