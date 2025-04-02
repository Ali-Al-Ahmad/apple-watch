import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Upload from './pages/Upload/Upload'
import ProtectedRoutes from './utils/protectedRoutes'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route
          path='/'
          element={<Login />}
        ></Route>
        <Route
          path='/signup'
          element={<Signup />}
        ></Route>
        <Route element={<ProtectedRoutes />}>
          <Route
            path='/home'
            element={<Home search={search} />}
          />

          <Route
            path='/upload'
            element={<Upload />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
