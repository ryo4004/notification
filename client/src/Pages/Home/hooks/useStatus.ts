import { useState, useEffect, useCallback } from 'react'

import type { NotificationRequestDBData, SentDBData } from '../../../types/notification'

type UseSentNotificationState = {
  loading: boolean
  fetched: boolean
  content: {
    reserved: Array<NotificationRequestDBData>
    sent: Array<SentDBData>
  }
}

export const useStatus = (pass: string) => {
  const [state, setState] = useState<UseSentNotificationState>({
    loading: false,
    fetched: false,
    content: { reserved: [], sent: [] },
  })
  const getStatus = useCallback(async () => {
    if (pass === '') return false
    setState((state) => ({ ...state, loading: true }))
    const response = await fetch('/manager/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pass }),
    })
    const json = await response.json()
    if (json.status) {
      setState((state) => ({ ...state, loading: false, fetched: true, content: json.data }))
    } else {
      setState((state) => ({ ...state, loading: false, fetched: true, content: { reserved: [], sent: [] } }))
    }
  }, [pass])
  useEffect(() => {
    ;(async () => {
      await getStatus()
    })()
  }, [getStatus])
  return { ...state }
}
