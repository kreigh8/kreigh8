export interface Client {
  _id: string
  client: string
  url: string
  picture: File
  picturePath: string
  description?: string
  active: boolean
}