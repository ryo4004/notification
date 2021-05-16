import { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { noop } from '../library/noop'

import type { NotificationRequestDBData, SentDBData } from '../types/notification'

type UseStatusState = {
  loading: boolean
  fetched: boolean
  content: {
    reserved: Array<NotificationRequestDBData>
    sent: Array<SentDBData>
  }
}

type StatusType = UseStatusState & {
  getStatus: () => void
  requestRemove: (id: string) => void
}

export const StatusContext = createContext<StatusType>({
  loading: false,
  fetched: false,
  content: { reserved: [], sent: [] },
  getStatus: noop,
  requestRemove: noop,
})

export const useStatusContext = () => {
  return useContext(StatusContext)
}

export const useStatus = (pass: string) => {
  const [state, setState] = useState<UseStatusState>({
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
  const requestRemove = useCallback(
    async (id: string) => {
      setState((state) => ({ ...state, loading: true }))
      const response = await fetch('/manager/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass, id }),
      })
      const json = await response.json()
      if (json.status) {
        setState((state) => ({
          ...state,
          loading: false,
          fetched: true,
          content: { ...state.content, reserved: json.data.reserved },
        }))
      } else {
        setState((state) => ({ ...state, loading: false, fetched: true }))
      }
    },
    [pass]
  )
  useEffect(() => {
    ;(async () => {
      await getStatus()
    })()
  }, [getStatus])
  return { ...state, getStatus, requestRemove }
}
