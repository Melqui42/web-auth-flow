import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/global.css'

import RecoverPassword from './pages/RecoverPassword'
import UpdatePassword from './pages/RecoverPassword/UpdatePassword'
import VerifyCode from './pages/RecoverPassword/VerifyCode'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/recover-password',
    element: <RecoverPassword />,
  },
  {
    path: '/recover-password/verify-code',
    element: <VerifyCode />,
  },
  {
    path: '/recover-password/update-password',
    element: <UpdatePassword />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
reportWebVitals()
