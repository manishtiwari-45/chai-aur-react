import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(15)

  const addValue = () => {
    setCounter(counter + 1)
  }

  const removeValue = () => {
    if(counter > 0){
      setCounter(counter - 1)
    } else {
      setCounter(0)
    }
    
  }

  return (
    <>
      <h1>Manish Tiwari</h1>
      <h1>Anuradha</h1>
      <h2>Counter Value: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
