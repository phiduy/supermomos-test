import styled, { keyframes } from "styled-components"

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 2s linear infinite;

  border: 4px solid rgba(0,0,0,0.1);
  border-top: 4px #14597A solid;
  border-radius: 50%;
  height: 48px;
  width: 48px;
`

export default Spinner
