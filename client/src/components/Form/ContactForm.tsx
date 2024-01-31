import { Alert, Box, Button, Fade, Grid, TextField } from '@mui/material'
import * as yup from 'yup'
import * as EmailApi from '../../network/email_api'
import { FormikHelpers, useFormik } from 'formik'
import { useState } from 'react'

const initialContactFormValues = {
  name: '',
  email: '',
  message: ''
}

interface contactFormValues {
  name: string
  email: string
  message: string
}

const contactFormSchema = yup.object().shape({
  name: yup.string().required('Your name is required'),
  email: yup.string().email().required('Your email is required'),
  message: yup.string().required('Please enter a message')
})

const ContactForm = () => {
  const [confirmAlert, setConfirmAlert] = useState<boolean>(false)

  const handleFormSubmit = async (values: typeof initialContactFormValues, onSubmitProps: FormikHelpers<contactFormValues>) => {
    try {
      await EmailApi.sendContactEmail(values)
      onSubmitProps.resetForm()
      setConfirmAlert(true)
    } catch (error) {
      console.error(error)
    }
  }

  const form = useFormik({
    initialValues: initialContactFormValues,
    validationSchema: contactFormSchema,
    onSubmit: handleFormSubmit
  })

  return (
    <Box>
      <form onSubmit={form.handleSubmit}>
        <Grid container item rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Name"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.name}
              name="name"
              error={Boolean(form.touched.name) && Boolean(form.errors.name)}
              helperText={form.touched.name && form.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Email"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.email}
              name="email"
              error={Boolean(form.touched.email) && Boolean(form.errors.email)}
              helperText={form.touched.email && form.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.message}
              name="message"
              error={Boolean(form.touched.message) && Boolean(form.errors.message)}
              helperText={form.touched.message && form.errors.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary'>Submit</Button>
          </Grid>
          <Grid item xs={12}>
            <Fade in={confirmAlert} timeout={{ exit: 1000 }} addEndListener={() => {
              setTimeout(() => {
                setConfirmAlert(false)
              }, 2000);
            }}>
              <Alert severity='success'>Your email has been sent successfully!</Alert>
            </Fade>
          </Grid>
        </Grid>
        
      </form>
    </Box>

  )
}

export default ContactForm