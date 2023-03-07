import styled from "styled-components"

const StyledTitleTextField = styled.input`
  background-color: ${(props) => props.theme.primary};
  padding: 4px 8px;
  text-transform: capitalize;
  color: white;
  width: fit-content;
  font-size: 28px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: white;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: white;
  }
`

export default StyledTitleTextField
