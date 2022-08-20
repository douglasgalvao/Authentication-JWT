import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/home/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
)
