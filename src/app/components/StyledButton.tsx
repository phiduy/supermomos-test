import styled from "styled-components"

const StyledButton = styled.button`
  min-width: 80px;
  padding: 12px 6px;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primary};
  border-radius: 10px;
  border: none;

  transition: all 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: white;
  }
`

export default StyledButton
