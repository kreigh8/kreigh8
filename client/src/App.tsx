import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
// import './App.css'
import Public from './components/Public'
import Login from './components/Login'
import AuthLayout from './components/AuthLayout'
import Welcome from './components/Welcome'


function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
  )
}

export default App
