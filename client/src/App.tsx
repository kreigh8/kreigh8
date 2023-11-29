import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('/api/users', { method: 'GET' })
        console.log('response', response)

        const users = await response.json()

        setUsers(users)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }

    loadUsers()
  }, [])

  return (
    <>
      {JSON.stringify(users)}
    </>
  )
}

export default App

