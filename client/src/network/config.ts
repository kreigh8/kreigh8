export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init)

  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    throw Error(errorMessage)
  }
}