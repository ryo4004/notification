import { useAuthenticationContext } from '../../../hooks/useAuthentication'
import { useAdd } from './hooks/useAdd'

import { TOPICS_KEYS, TOPICS_LABEL } from '../../../types/notification'

import type { TopicsKeysKey, TopicsKeys } from '../../../types/notification'

import './Add.scss'

export const Add = () => {
  const { pass } = useAuthenticationContext()
  const { state, updateAdd, updateTopic, updateCheckbox, requestSend } = useAdd(pass)
  const buttonLabel = state.notification.immediately ? 'リアルタイムで送信する' : '送信予約する'
  return (
    <div className="add">
      <details>
        <summary>
          <h2>新しい通知を追加</h2>
        </summary>
        <div className="details">
          <label>タイトル</label>
          <input type="text" value={state.notification.title} onChange={(e) => updateAdd('title', e.target.value)} />
          <label>本文</label>
          <textarea value={state.notification.body} onChange={(e) => updateAdd('body', e.target.value)} />
          <label>パス</label>
          <input type="text" value={state.notification.path} onChange={(e) => updateAdd('path', e.target.value)} />
          <label>カテゴリ</label>
          <select value={state.notification.topic} onChange={(e) => updateTopic(e.target.value as TopicsKeys)}>
            {(Object.keys(TOPICS_KEYS) as TopicsKeysKey[]).map((t) => {
              const disabled = TOPICS_KEYS[t] === TOPICS_KEYS.IMPORTANT_SCHEDULE
              return (
                <option value={TOPICS_KEYS[t]} disabled={disabled}>
                  {TOPICS_LABEL[t]}
                </option>
              )
            })}
          </select>
          <div className="checkbox">
            <input
              type="checkbox"
              checked={state.notification.immediately}
              onChange={(e) => updateCheckbox(e.target.checked)}
              id="immediately"
            />
            <label htmlFor="immediately">リアルタイムで送る</label>
          </div>
          <button onClick={() => requestSend()}>{buttonLabel}</button>
        </div>
      </details>
    </div>
  )
}
