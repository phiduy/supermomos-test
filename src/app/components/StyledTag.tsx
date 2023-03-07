import styled from "styled-components"

const StyledTag = styled.span<{ selected?: boolean }>`
  display: inline-flex;
  background-color: ${(props) => props.theme.lightGray};
  color: ${(props) =>
    props.selected ? props.theme.primary : props.theme.black};
  padding: 2px 8px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? props.theme.lightGray : props.theme.primary};
    color: ${(props) => (props.selected ? props.theme.primary : "white")};
  }
`

export default StyledTag
