import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import { UserProvider } from '../Core/Context/UserContext'

function App() {
  const routers = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    }
  ])
  return (
    <>
      <UserProvider>
        <RouterProvider router={routers}/>
      </UserProvider>

    </>
  )
}

export default App
