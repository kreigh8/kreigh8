import { Grid, TableContainer, Table, TableBody, TableHead, TableCell, Button, Typography, TableRow, Switch, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { Add, Delete, Edit } from "@mui/icons-material"
import AdminLayout from "../../layouts/AdminLayout"
import { Client } from '../../models/client'
import { useEffect, useState } from "react"
import * as ClientAPI from '../../network/clients_api'
import { useNavigate } from "react-router-dom"

const Clients = () => {
  const navigate = useNavigate()
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false)

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

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client)
    setOpenConfirmDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    await ClientAPI.deleteClient(selectedClient?._id ?? '')
    setOpenConfirmDeleteModal(false)
    const clientResponse = await ClientAPI.getClients()
    setClients(clientResponse)
  }

  const handleCloseDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const handleEditClient = (id: string) => {
    navigate(`/admin/clients/${id}`)
  }

  return (
    <AdminLayout>
      <Dialog
        open={openConfirmDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-client-title"
        aria-describedby="delete-client-description"
      >
        <DialogTitle id="delete-client-title">Are you sure you want to delete the '{selectedClient?.client}' client?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-client-description">
            To confirm, this client will be deleted from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type='button' variant='outlined' onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={handleConfirmDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
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
                {clients.length ? clients.map((client) => (
                  <TableRow key={client._id}>
                    <TableCell><IconButton onClick={() => handleDeleteClient(client)}><Delete /></IconButton><IconButton onClick={() => handleEditClient(client._id)}><Edit /></IconButton></TableCell>
                    <TableCell>{client.client}</TableCell>
                    <TableCell><Typography component='a' href={client.url}>{client.url}</Typography></TableCell>
                    <TableCell>{client.description}</TableCell>
                    <TableCell><img width="150" src={`${import.meta.env.VITE_API_URL}/assets/${client.picturePath}`} /></TableCell>
                    <TableCell><Switch checked={client.active} /></TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={6}><Typography variant='body1' align="center">There are no clients</Typography></TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default Clients