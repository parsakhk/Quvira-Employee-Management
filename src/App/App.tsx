import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import { UserProvider } from '../Core/Context/UserContext'
import Users from '../Pages/Users/Users.tsx'

function App() {
  const routers = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/dashboard',
      element: <Dashboard/>
    },
    {
      path: '/users',
      element: <Users/>
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
