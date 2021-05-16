import { useState, useEffect } from 'react'

import type { SentDBData } from '../../../types/notification'

type UseSentNotificationState = {
  loading: boolean
  content: Array<SentDBData>
}

export const useSentNotification = (pass: string) => {
  const [state, setState] = useState<UseSentNotificationState>({
    loading: false,
    content: [],
  })
  useEffect(() => {
    ;(async () => {
      if (pass === '') return false
      setState((state) => ({ ...state, loading: true }))
      const response = await fetch('/manager/sent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass }),
      })
      const json = await response.json()
      if (json.status) {
        setState((state) => ({ ...state, loading: false, content: json.data }))
      } else {
        setState((state) => ({ ...state, loading: false, content: [] }))
      }
    })()
  }, [pass])
  return { ...state }
}
