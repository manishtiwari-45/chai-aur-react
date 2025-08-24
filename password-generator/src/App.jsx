import { useState, useCallback, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [pass, setPass] = useState("")

  // Ref for input box
  const passRef = useRef(null)

  const passGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (char) str += "~_+-!@#$%^"
    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length)
      pass += str.charAt(idx)
    }
    setPass(pass)
  }, [length, number, char])

  const copyToClipboard = () => {
    if (passRef.current) {
      passRef.current.select()                 // select full text
      passRef.current.setSelectionRange(0, 999) // for mobile support
      navigator.clipboard.writeText(passRef.current.value)
      alert("Password copied to clipboard! ✅")
    }
  }

  return (
    <> 
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        
        {/* Input + Copy Button */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={pass}   
            ref={passRef}   // <-- linked ref here
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
          />
          <button 
            onClick={copyToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div>
          <div className="mb-3">
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-full'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="ml-2">Length: {length}</label>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input 
              type="checkbox"
              id="numberInput"
              checked={number}
              className='cursor-pointer'
              onChange={() => setNumber(prev => !prev)}
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input 
              type="checkbox"
              id="charInput"
              checked={char}
              className='cursor-pointer'
              onChange={() => setChar(prev => !prev)}
            />
            <label htmlFor="charInput">Include Symbols</label>
          </div>

          <button 
            onClick={passGen}
            className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg mt-2"
          >
            Generate Password
          </button>
        </div>

      </div>
    </>
  )
}

export default App
