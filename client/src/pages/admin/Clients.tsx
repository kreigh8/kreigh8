import { Grid, TableContainer, Table, TableBody, TableHead, TableCell, Button, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect } from "react"
import * as ClientAPI from '../../network/clients_api'
import { useNavigate } from "react-router-dom"

const Clients = () => {
  const navigate = useNavigate()

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    const clients = await ClientAPI.getClients()
    console.log('clients', clients)
  }

  const handleCreateClient = () => {
    navigate('/admin/clients/create')
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

              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default Clients