import Image from "next/image"
import React from "react"
// form
import { useFormContext, Controller } from "react-hook-form"
import { FormGroup, FormHelpText, Textfield } from "../StyledForm"

// ----------------------------------------------------------------------

type Props = any & {
  name: string
  helperText?: string
  startIcon?: string
  endIcon?: string
  placeholder?: string
}

function RHFTextField({
  name,
  helperText,
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
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
            <Textfield
              style={{ width: "100%" }}
              {...field}
              value={
                typeof field.value === "number" && field.value === 0
                  ? ""
                  : field.value
              }
              error={!!error}
              {...other}
            />
            {endIcon && (
              <Image src={endIcon} alt={`${endIcon}`} width={24} height={24} />
            )}
          </div>
          <FormHelpText style={{ marginLeft: startIcon ? 32 : 0 }}>
            {error ? error?.message : helperText}
          </FormHelpText>
        </FormGroup>
      )}
    />
  )
}

export default RHFTextField
