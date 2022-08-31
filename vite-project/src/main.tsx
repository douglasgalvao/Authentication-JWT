import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/home/Login'
import SignIn from './pages/home/SignIn'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ContextProvider } from './context/AuthContext'
import Home from './pages/home/SignIn'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <BrowserRouter>
  <ContextProvider>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signIn' element={<Home />} />
    </Routes>
    </ContextProvider>
  </BrowserRouter>
  </React.StrictMode>
)
