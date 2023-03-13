"use client"
import styled, { ThemeProvider } from "styled-components"
import { ToastContainer } from "react-toastify"
import ErrorBoundary from "../components/ErrorBoundary"
import SocialCreateForm from "./SocialCreateForm"

import "react-datepicker/dist/react-datepicker.css"
import "react-toastify/dist/ReactToastify.css"

const Background = styled.div`
  background: ${(props) =>
    `linear-gradient(152.24deg,${props.theme.secondary}  0%,${props.theme.primary} 100%)`};
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.gray};
`

const Container = styled.div`
  padding: 100px 96px 82px;
`

// Define what props.theme will look like
const theme = {
  primary: "#942F70",
  secondary: "#FEF452",
  darkBlue: "#14597A",
  black: "#344054",
  lightGray: "#F2F4F7",
  gray: "#333333"
}

export default function Page() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Background>
          <Container>
            <SocialCreateForm />
          </Container>
          <ToastContainer />
        </Background>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
