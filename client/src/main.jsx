import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Auth from './utils/auth.js'
import ContactForm from './pages/ContactForm.jsx'
import ContactPage from './pages/ContactPage.jsx'
import EditContactForm from './pages/EditContactForm.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

// FONTS
import './assets/fonts/Playwright/PlaywriteNZ-VariableFont_wght.ttf'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: Auth.loggedIn() ? <Home /> : <LoginPage />
      },
      {
        path: '/add',
        element: Auth.loggedIn() ? <ContactForm /> : <LoginPage />
      },
      {
        path: '/Contact/:id',
        element: <ContactPage />
      },
      {
        path: '/Contact/edit/:id',
        element: <EditContactForm />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
