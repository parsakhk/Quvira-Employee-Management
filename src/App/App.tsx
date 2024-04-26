import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'

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
      <RouterProvider router={routers}/>
    </>
  )
}

export default App
