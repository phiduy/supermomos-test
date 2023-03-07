import Image from "next/image"
import { forwardRef, useState } from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"

// form
import { useFormContext, Controller } from "react-hook-form"
import styled from "styled-components"
import { FormGroup, FormHelpText } from "../StyledForm"

// ----------------------------------------------------------------------

const StyledCustomInput = styled.button`
  color: ${(props) => props.theme.gray};
  min-width: 120px;
  border: 1px solid
    ${({ error }: { error?: boolean }) => (error ? `red` : `transparent`)};
  outline: ${({ error }: { error?: boolean }) => (error ? `red` : `grey`)};
  border-radius: 4px;
  height: 40px;
  background-color: white;
  font-size: 16px;
  padding: 0 12px;
  text-align: left;
  font-weight: bold;
`
// eslint-disable-next-line react/display-name
const DatePickerCustomInput = forwardRef<any>(
  ({ value, placeholder, startIcon, endIcon, onClick }, ref) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
      ref={ref}
    >
      {startIcon && (
        <Image
          style={{ marginRight: 8 }}
          src={startIcon}
          alt={`${startIcon}`}
          width={24}
          height={24}
        />
      )}
      <StyledCustomInput onClick={onClick}>
        {value || placeholder}
      </StyledCustomInput>
      {endIcon && (
        <Image
          style={{ marginRight: 8 }}
          src={endIcon}
          alt={`${endIcon}`}
          width={24}
          height={24}
        />
      )}
    </div>
  )
)

type Props = Omit<ReactDatePickerProps, "onChange"> & {
  name: string
  helperText?: string
  placeholder?: string
  startIcon?: string
  endIcon?: string
}

function RHFDatePicker({
  name,
  helperText,
  placeholder,
  startIcon,
  endIcon,
  ...other
}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup>
          <ReactDatePicker
            selected={field.value ?? null}
            onChange={(date) => field.onChange(date)}
            customInput={
              <DatePickerCustomInput
                startIcon={startIcon}
                endIcon={endIcon}
                placeholder={placeholder}
              />
            }
            {...other}
          />
          <FormHelpText style={{ marginLeft: startIcon ? 32 : 0 }}>
            {error ? error?.message : helperText}
          </FormHelpText>
        </FormGroup>
      )}
    />
  )
}
export default RHFDatePicker
