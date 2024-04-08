import { Box, Card, CardContent, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import * as ClientAPI from '../../network/clients_api'
import { Client } from '../../models/client'

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

  const handleChangeSort = (e: React.ChangeEvent<{ value: string }>) => {
    const copyArray = [...clients]

    copyArray.sort((a, b) => {
      return e.target.value === 'asc' ? a.client < b.client ? -1 : a.client > b.client ? 1 : 0 : a.client > b.client ? -1 : a.client < b.client ? 1 : 0
    });
    setClients(copyArray);
  }

  return (
    <Box component='section' id="clients">
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={8} lg={10}>
          <Typography variant='h3'>Clients</Typography>
        </Grid>
        <Grid item xs={4} lg={2}>
          {clients.length > 0 && <FormControl fullWidth>
            <Select defaultValue={'asc'} size='small' onChange={handleChangeSort}>
              <MenuItem value={'asc'}>Sort A-Z</MenuItem>
              <MenuItem value={'desc'}>Sort Z-A</MenuItem>
            </Select>
          </FormControl>}
        </Grid>
      </Grid>
      <Grid container marginTop='2rem' spacing={2} alignItems='stretch'>
        {clients.map((client) => {
          return (
            <Grid key={client._id} item lg={3} xs={6} display={'flex'}>
              <Card sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
                <CardContent component='a' href={client.url} target="_blank" sx={{ '&:last-child': { pb: 0 }, padding: '0', display: 'block', height: 'inherit', textAlign: 'center', backgroundImage: (theme) => theme.palette.mode ==='dark' ? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : 'inherit' }}>
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