import { useAuthenticationContext } from '../../../hooks/useAuthentication'
import { useAdd } from './hooks/useAdd'

import { TOPICS_KEYS, TOPICS_LABEL } from '../../../types/notification'

import type { TopicsKeysKey, TopicsKeys } from '../../../types/notification'

import './Add.scss'

export const Add = () => {
  const { pass } = useAuthenticationContext()
  const { state, updateAdd, updateTopic, updateCheckbox, requestSend } = useAdd(pass)
  return (
    <div className="add">
      <details>
        <summary>
          <h2>Add</h2>
        </summary>
        <div className="details">
          <label>タイトル</label>
          <input value={state.notification.title} onChange={(e) => updateAdd('title', e.target.value)} />
          <label>本文</label>
          <input value={state.notification.body} onChange={(e) => updateAdd('body', e.target.value)} />
          <label>パス</label>
          <input value={state.notification.path} onChange={(e) => updateAdd('path', e.target.value)} />
          <select value={state.notification.topic} onChange={(e) => updateTopic(e.target.value as TopicsKeys)}>
            {(Object.keys(TOPICS_KEYS) as TopicsKeysKey[]).map((t) => (
              <option value={TOPICS_KEYS[t]}>{TOPICS_LABEL[t]}</option>
            ))}
          </select>
          <div>
            <input
              type="checkbox"
              checked={state.notification.immediately}
              onChange={(e) => updateCheckbox(e.target.checked)}
              id="immediately"
            />
            <label htmlFor="immediately">すぐに送る</label>
          </div>
          <button onClick={() => requestSend()}>送信</button>
        </div>
      </details>
    </div>
  )
}
