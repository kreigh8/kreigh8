import { Box, Card, CardContent, CardMedia, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material"
import { useEffect, useState } from 'react'
import * as ClientAPI from '../../network/clients_api'
import { Client } from "../../models/client"

const ClientContainer = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    getClients()
  }, [])

  const getClients = async () => {
    const clientResponse = await ClientAPI.getClients()
    clientResponse.sort((a, b) => a.client < b.client ? -1 : a.client > b.client ? 1 : 0)
    setClients(clientResponse)
  }

  const handleChangeSort = (e: React.ChangeEvent<{ value: number }>) => {
    const copyArray = [...clients]

    copyArray.sort((a, b) => {
      return e.target.value === 0 ? a.client < b.client ? -1 : a.client > b.client ? 1 : 0 : a.client > b.client ? -1 : a.client < b.client ? 1 : 0
    });
    setClients(copyArray);
  }

  return (
    <Box>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={10}>
          <Typography variant='h3'>Clients</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <Select defaultValue={0} size='small' onChange={handleChangeSort}>
              <MenuItem value={0}>Sort A-Z</MenuItem>
              <MenuItem value={1}>Sort Z-A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container marginTop='2rem' spacing={2} alignItems='stretch'>
        {clients.map((client) => {
          return (
            <Grid key={client._id} item xs={3} display={'flex'}>
              <Card sx={{ width: '100%'}}>
                <CardContent component='a' href={client.url} target="_blank" sx={{ display: 'block', height: '100%', textAlign: 'center', backgroundImage: (theme) => theme.palette.mode ==='dark' ? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : 'inherit' }}>
                  <img src={`${import.meta.env.VITE_API_URL}/assets/${client.picturePath}`} width='150' />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default ClientContainer