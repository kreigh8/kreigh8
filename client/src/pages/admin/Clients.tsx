import { Container, Grid, TableContainer, Table, TableBody, TableHead, TableCell } from "@mui/material"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect } from "react"
import * as ClientAPI from '../../network/clients_api'

const Clients = () => {

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    const clients = await ClientAPI.getClients()
    console.log('clients', clients)
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Clients List Page</h1></Grid>
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
              </Table>
            </TableContainer>
          </Grid>
      </Container>
    </AdminLayout>
  )
}

export default Clients