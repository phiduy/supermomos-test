import { useFormContext } from "react-hook-form"
import { FormGroup, FormHelpText, Label } from "../components/StyledForm"
import { StyledRadio } from "../components/StyledRadio"
import { SocialValues } from "./schema"

export default function SocialPrivacy() {
  const {
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useFormContext<SocialValues>()

  return (
    <FormGroup>
      <Label
        fontSize="16px"
        lineHeight="24px"
        fontWeight="500"
        style={{ marginBottom: 8 }}
      >
        Privacy
      </Label>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <StyledRadio
          name="privacy"
          value="Public"
          labelText="Public"
          onChange={(e) => setValue("privacy", e.target.value)}
        />
        <StyledRadio
          name="privacy"
          value="curatedAudience"
          labelText="Curated Audience"
          onChange={(e) => setValue("privacy", e.target.value)}
        />
        <StyledRadio
          name="privacy"
          value="curatedAudience"
          labelText="Curated Audience"
          onChange={(e) => setValue("privacy", e.target.value)}
        />
      </div>
      <FormHelpText>
        {errors.privacy ? errors.privacy.message : ""}
      </FormHelpText>
    </FormGroup>
  )
}
