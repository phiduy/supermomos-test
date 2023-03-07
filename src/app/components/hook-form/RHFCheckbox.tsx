import Image from "next/image"
import React from "react"
// form
import { useFormContext, Controller } from "react-hook-form"
import Checkbox from "../StyledCheckbox"
import { FormGroup, FormHelpText } from "../StyledForm"

// ----------------------------------------------------------------------

type Props = {
  name: string
  helperText?: string
  label?: string
}

function RHFCheckbox({ name, helperText, label, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup>
          <label style={{ fontSize: 14, width: "fit-content" }}>
            <Checkbox checked={field.value} {...field} {...other} />
            {label && <span style={{ marginLeft: 8 }}>{label}</span>}
          </label>
          <FormHelpText>{error ? error?.message : helperText}</FormHelpText>
        </FormGroup>
      )}
    />
  )
}
export default RHFCheckbox
