import { User } from '../models/user'
import { API_URL } from './config'

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)

  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    throw Error(errorMessage)
  }
}


export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData(`${API_URL}/api/users`, { method: 'GET' })
  return response.json()
}

export interface SignUpCredentials {
  username: string
  email: string
  password: string
}

export const signup = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData(`${API_URL}/api/users/signup`,
  {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  return response.json()
}

export interface LoginCredentials {
  username: string
  password: string
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchData(`${API_URL}/api/users/login`,
  {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  return response.json()
}

export const logout = async () => {
  await fetchData(`${API_URL}/api/users/logout`, { method: 'POST' })
}