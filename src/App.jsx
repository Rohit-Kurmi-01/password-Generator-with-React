import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setCharAllowed] = useState(false)
  const [copy ,setCopy] = useState("copy")
  const passwordRef = useRef(null)
  const passwordGenrator = () => {

    let pass = ""

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (specialCharAllowed) str += "!@#$%^&*()_+{}|<>?,./\][=-"

    for (let i = 0; i <= length; i++) {
      pass += str.charAt(Math.random() * str.length)
    }

    setPassword(pass)

  }

useEffect(() => {
  passwordGenrator()
  setCopy("copy")
} , [length ,numberAllowed,specialCharAllowed,setPassword])

const copyPasswordToClipbord = () => {
     passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3); //this is for perticuler field selection
     window.navigator.clipboard.writeText(password)
     setCopy("copied")
   }

  return (
    <>
      <div className='w-full max-w-md mx-auto bg-gray-900 rounded-xl shadow-md px-4 py-8 '>

        <h1 className='text-4xl text-center text-green-500 py-4'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            className='outline-none w-full py-1 px-3 dark:text-red-600 font-bold' />
          <button 
          onClick={copyPasswordToClipbord}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{copy}</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor=" " className='text-yellow-400'>length : ({length})</label>

          </div>

          <div className='flex items-center gap-x-1 text-yellow-400'>
            <input type="checkbox"
              name="" id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1 text-yellow-400'>
            <input type="checkbox"
              name="" id="charInput"
              defaultChecked={specialCharAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">specialCharacter</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
