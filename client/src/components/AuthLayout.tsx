// import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import AuthHeader from "./AuthHeader"

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>

  )
}

export default AuthLayout