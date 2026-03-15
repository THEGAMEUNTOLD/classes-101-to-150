import React from 'react'
import { router } from './App.routes'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App