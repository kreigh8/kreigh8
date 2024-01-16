import { Client } from '../models/client'
import { API_URL, fetchData } from './config'

export const getClients = async (): Promise<Client[]> => {
  const response = await fetchData(`${API_URL}/api/clients`, { method: 'GET', credentials: 'include' })
  return response.json()
}