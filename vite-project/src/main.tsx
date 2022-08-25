import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/home/Login'
import NavTest from './pages/home/NavTest'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ContextProvider } from './context/AuthContext'
import Home from './pages/home/Home'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <BrowserRouter>
  <ContextProvider>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<NavTest />} />
    </Routes>
    </ContextProvider>
  </BrowserRouter>
  </React.StrictMode>
)
