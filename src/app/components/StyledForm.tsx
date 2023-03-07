import styled from "styled-components"

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`

export const FormHelpText = styled.p`
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 14px;
  color: red;
`
export const Label = styled.label`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.black};

  ${({
    fontWeight = "500",
    fontSize = "14px",
    lineHeight = "20px"
  }: {
    fontWeight?: string
    fontSize?: string
    lineHeight?: string
  }) => `
    font-size: ${fontSize};
    line-height: ${lineHeight};
    font-weight: ${fontWeight};
    `}
`

export const Textfield = styled.input`
  color: ${(props) => props.theme.gray};
  border: 1px solid
    ${({ error }: { error?: boolean }) => (error ? `red` : `transparent`)};
  outline: ${({ error }: { error?: boolean }) => (error ? `red` : `grey`)};
  border-radius: 4px;
  height: 40px;
  background-color: white;
  font-size: 16px;
  padding: 0 12px;

  &::placeholder {
    font-weight: bold;
    color: ${(props) => props.theme.gray};
  }
`

export const Textarea = styled.textarea`
  color: ${(props) => props.theme.gray};
  border: 1px solid
    ${({ error }: { error?: boolean }) => (error ? `red` : `transparent`)};
  outline: ${({ error }: { error?: boolean }) => (error ? `red` : `grey`)};
  border-radius: 4px;
  height: 40px;
  background-color: white;
  font-size: 16px;
  padding: 12px;
  &::placeholder {
    font-weight: bold;
    color: ${(props) => props.theme.gray};
  }
`
