import { API_URL, fetchData } from "./config"

export interface ContactEmailRequestBody {
  name: string
  email: string
  message: string
}

export const sendContactEmail = async (contactEmailRequestBody: ContactEmailRequestBody): Promise<unknown> => {
  const response = await fetchData(`${API_URL}/api/email`, {
    method: 'POST',
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactEmailRequestBody)
  })
  return response.json()
}