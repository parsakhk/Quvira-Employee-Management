import React, { useState } from 'react'
import logo from '../Assets/vite.svg'
import users from '../Constant/Users.json'
import { setItem } from '../Core/Storage/storage'
import { useNavigate } from 'react-router-dom'
import Alert from '../Components/Common/Alert'

const Login = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [success, setSuccess] = useState<any>(null)
  
  const navigate = useNavigate()

  const submitform = () => {
    const userExists: any[] = users.filter((user) => (user.username === username || user.email === username) && user.password === password && user.isAdmin === true)
    if(userExists.length > 0) {
      setItem("userData",JSON.stringify(userExists[0]))
      setSuccess(true)

      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    } else {
      setSuccess(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-full py-12 sm:px-6 lg:px-8'>
      <div className='sm:sm-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-10 w-auto' src={logo} alt='Your company'/>
        <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to Quvira Employe Management.
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
        {success && <Alert message='Login successful.' />}
        {success === false && <Alert error={true} errorMessage='Username or password is wrong.' />}
        <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='Username' className='block text-sm font-medium leading-6 text-gray-900 undefined'>Username</label>
              <div className='mt-2'>
                <input 
                  id='username' 
                  name='username' 
                  type='text' 
                  className='px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300' 
                  onChange={(e) => setUsername(e.target.value)}
                >
                  
                </input>
              </div>
            </div>
            <div>
              <label htmlFor='Password' className='block text-sm font-medium leading-6 text-gray-900 undefined'>Password</label>
              <div className='mt-2'>
                <input 
                  id='password' 
                  name='password' 
                  type='password' 
                  className='px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                  onChange={(e) => setPassword(e.target.value)}
                >
                  
                </input>
              </div>
            </div>
            <button 
              type='submit' 
              onClick={submitform}
              className='flex w-full justify-center rounded-md bg-[#0099cc] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login