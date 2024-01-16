import * as yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import * as UserApi from '../network/users_api'
import { useAppDispatch } from '../state/hooks'
import { setLogin } from '../state/authSlice'
import { useNavigate } from 'react-router-dom'


const initialLoginValues = {
  username: '',
  password: ''
}

interface loginValues {
  username: string
  password: string
}

const loginSchema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required')
})

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const user = useAppSelector(state => state.auth.user)

  const handleFormSubmit = async (values: typeof initialLoginValues, onSubmitProps: FormikHelpers<loginValues>) => {
    try {
      const user = await UserApi.login(values)
      onSubmitProps.resetForm()
      dispatch(setLogin(user))
      navigate('/admin')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h1' textAlign='center'>Login</Typography>
        </Grid>
        <Formik 
          onSubmit={handleFormSubmit}
          initialValues={initialLoginValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            // setFieldValue,
            // resetForm
          }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container item rowSpacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={Boolean(touched.username) && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit' fullWidth>Login</Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Container>
    
  )
}

export default Login
