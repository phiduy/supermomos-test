import Image from "next/image"
import React from "react"
// form
import { useFormContext, Controller } from "react-hook-form"
import { FormGroup, FormHelpText, Textarea, Textfield } from "../StyledForm"

// ----------------------------------------------------------------------

type Props = {
  name: string
  helperText?: string
  placeholder?: string
}

function RHFTextArea({ name, helperText, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup>
          <Textarea
            {...field}
            value={field.value}
            error={!!error}
            style={{
              minHeight: "200px"
            }}
            {...other}
          />
          <FormHelpText>{error ? error?.message : helperText}</FormHelpText>
        </FormGroup>
      )}
    />
  )
}

export default RHFTextArea
