import { useState } from 'react'

import './App.scss'

function App() {
  const [pass, setPass] = useState<string>('')
  const send = async () => {
    const response = await fetch('/manager/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pass }),
    })
    const json = await response.json()
    console.log({ json })
  }
  return (
    <div>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button onClick={() => send()}>送信</button>
    </div>
  )
}

export default App
