import React from 'react'
import Nav from './components/Nav'
import Form from './pages/Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminPanel from './components/AdminPanel'

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Nav/>
      <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Form/>}/>
      <Route path='/admin' element={<AdminPanel/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
