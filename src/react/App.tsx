import { useState } from 'react'
import Sharee from "./Sharee";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>React Demo</h1>
      <Sharee lang="en" />
    </div>
  )
}

export default App
