import { Grid, TableContainer, Table, TableBody, TableHead, TableCell, Button, Typography, TableRow, Switch, IconButton } from "@mui/material"
import { Add, Edit } from "@mui/icons-material"
import AdminLayout from "../../layouts/AdminLayout"
import { Client } from '../../models/client'
import { useEffect, useState } from "react"
import * as ClientAPI from '../../network/clients_api'
import { useNavigate } from "react-router-dom"

const Clients = () => {
  const navigate = useNavigate()
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    const clientResponse = await ClientAPI.getClients()
    setClients(clientResponse)
  }

  const handleCreateClient = () => {
    navigate('/admin/clients/create')
  }

  const handleEditClient = (id: string) => {
    navigate(`/admin/clients/${id}`)
  }

  return (
    <AdminLayout>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={9}>
          <Typography variant='h1'>Clients List Page</Typography>
        </Grid>
        <Grid item xs={3} textAlign='right'>
          <Button type='button' variant='contained' color='primary' onClick={handleCreateClient}><Add /> Create Client</Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell></TableCell>
                <TableCell>
                  Client
                </TableCell>
                <TableCell>
                  Client URL
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Active
                </TableCell>
              </TableHead>
              <TableBody>
                {clients.length && clients.map((client) => (
                  <TableRow>
                    <TableCell><IconButton onClick={() => handleEditClient(client._id)}><Edit /></IconButton></TableCell>
                    <TableCell>{client.client}</TableCell>
                    <TableCell><Typography component='a' href={client.url}>{client.url}</Typography></TableCell>
                    <TableCell>{client.description}</TableCell>
                    <TableCell><img width="150" src={`${import.meta.env.VITE_API_URL}/assets/${client.picturePath}`} /></TableCell>
                    <TableCell><Switch checked={client.active} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default Clients