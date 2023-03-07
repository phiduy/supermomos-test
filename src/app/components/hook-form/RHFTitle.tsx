import Image from "next/image"
import React from "react"
// form
import { useFormContext, Controller } from "react-hook-form"
import { FormGroup, FormHelpText } from "../StyledForm"
import StyledTitleTextField from "../StyledTitleTextField"

// ----------------------------------------------------------------------

type Props = any & {
  name: string
  helperText?: string
  placeholder?: string
}

function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup>
          <StyledTitleTextField
            {...field}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            {...other}
          />
          <FormHelpText>{error ? error?.message : helperText}</FormHelpText>
        </FormGroup>
      )}
    />
  )
}
export default RHFTextField
