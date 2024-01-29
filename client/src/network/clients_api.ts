import { Client } from '../models/client'
import { API_URL, fetchData } from './config'

export const getClients = async (): Promise<Client[]> => {
  const response = await fetchData(`${API_URL}/api/clients`, { method: 'GET', credentials: 'include' })
  return response.json()
}

export interface ClientInput {
  client: string,
  url: string,
  picture: File,
  description?: string,
  active: string
}

export const createClient = async (client: ClientInput): Promise<Client> => {
  const formData = new FormData()

  formData.append('client', client.client)
  formData.append('url', client.url)
  formData.append('picturePath', client.picture.name)
  formData.append('description', client.description ?? '')
  formData.append('active', client.active.toString())
  formData.append('picture', client.picture)
  const response = await fetchData(`${API_URL}/api/clients`, {
    method: 'POST',
    body: formData,
    credentials: 'include' }
  )
  return response.json()
}

export const getClient = async (clientId: string): Promise<Client> => {
  const response = await fetchData(`${API_URL}/api/clients/${clientId}`, {
    method: 'GET',
    credentials: 'include'
  })
  return response.json()
}

export const editClient = async (clientId: string, client: ClientInput): Promise<Client> => {
  console.log('client', client)
  const formData = new FormData()

  formData.append('client', client.client)
  formData.append('url', client.url)
  formData.append('picturePath', client.picture.name)
  formData.append('description', client.description ?? '')
  formData.append('active', client.active.toString())
  formData.append('picture', client.picture)
  const response = await fetchData(`${API_URL}/api/clients/${clientId}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include' }
  )
  return response.json()
}

export const deleteClient = async (clientId: string) => {
  await fetchData(`${API_URL}/api/clients/${clientId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}