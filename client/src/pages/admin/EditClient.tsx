import { Box, Button, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, OutlinedInput, Switch, TextField, Typography } from "@mui/material"
import AdminLayout from '../../layouts/AdminLayout'
import { FormikHelpers, useFormik } from 'formik'
import * as ClientApi from '../../network/clients_api'
import * as yup from 'yup'
import { useCallback, useEffect, useState } from 'react'
import { EditOutlined } from "@mui/icons-material"
import { useDropzone } from "react-dropzone"
import { useNavigate, useParams } from "react-router-dom"
import { Client } from "../../models/client"

interface editClientValues {
  client: string
  url: string
  picture?: File
  picturePath?: string
  description: string
  active: boolean

}

const editClientSchema = yup.object().shape({
  client: yup.string().required('required'),
  url: yup.string().required('required'),
  picture: yup.string().required('required'),
  description: yup.string(),
  active: yup.boolean().required('required')
})

const EditClient = () => {
  const navigate = useNavigate()
  const clientId = useParams()
  const [client, setClient] = useState<Client>()

  useEffect(() => {
    getClient()
  }, []) 

  const getClient = async () => {
    const client = await ClientApi.getClient(clientId.clientId)
    setClient(client)

    console.log('client', client)

    // form.setFieldValue('client', client.client)
    // form.setFieldValue('url', client.url)
    // form.setFieldValue('picture', client.picture)
    // form.setFieldValue('picturePath', client.picturePath)
    // form.setFieldValue('active', client.active)
    // form.setFieldValue('description', client.description)
  }

  

  const handleFormSubmit = async (values: any, onSubmitProps: FormikHelpers<editClientValues>) => {
    try {
      await ClientApi.editClient(clientId, values)
      onSubmitProps.resetForm()
      navigate('/admin/clients')
    } catch (error) {
      console.error(error)
    }
  }

  const onDrop = useCallback((acceptedFiles: any[]) => {
    form.setFieldValue('picture', acceptedFiles[0])
  }, [])
  
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({ accept: { 'image/*': [] }, onDrop, multiple: false })

  const form = useFormik({
    initialValues: {
      client: client?.client,
      url: client?.url,
      description: client?.description,
      picture: client?.picturePath,
      picturePath: client?.picturePath,
      active: client?.active
    },
    validationSchema: editClientSchema,
    enableReinitialize: true,
    onSubmit: handleFormSubmit
  })

  return (
    <AdminLayout>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12}>
          <Typography variant='h1'>Edit Client</Typography>
        </Grid>
        <form onSubmit={form.handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
          <Grid container item rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.client ?? ''}
                name="client"
                error={Boolean(form.touched.client) && Boolean(form.errors.client)}
                helperText={form.touched.client && form.errors.client}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="url"
                label="Client Url"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.url ?? ''}
                name="url"
                error={Boolean(form.touched.url) && Boolean(form.errors.url)}
                helperText={form.touched.url && form.errors.url}
              />
            </Grid>
            <Grid item xs={12}>
              <Box 
                border={`1px solid #ccc`}
                borderRadius="5px"
                p="1rem"
              >
                <Box
                  {...getRootProps()}
                  border={`2px dashed #ccc`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!form.values.picture && !form.values.picturePath ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography>{form.values.picture && form.values.picture.name ? form.values.picture.name : form.values.picturePath}</Typography>
                      <EditOutlined />
                    </Box>
                  )}
                </Box>                    
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size='medium'
                type="description"
                label="Description"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.description ?? ''}
                name="description"
                error={Boolean(form.touched.description) && Boolean(form.errors.description)}
                helperText={form.touched.description && form.errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                onBlur={form.handleBlur}
                name="active"
                onChange={form.handleChange}
                control={<Switch checked={!!form.values.active} onChange={() => form.setFieldValue("active", !form.values.active)} />}
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' fullWidth disabled={!form.dirty}>Edit</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </AdminLayout>
  )
}

export default EditClient