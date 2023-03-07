import Image from "next/image"
import { useFormContext } from "react-hook-form"
import { FormGroup, FormHelpText, Label } from "../components/StyledForm"
import StyledTag from "../components/StyledTag"
import { SocialValues } from "./schema"
import { Space } from "./SocialCreateForm"

const TAGS = ["Engineering", "Product", "Marketing", "Design"]

export default function SocialTagSelection() {
  const {
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useFormContext<SocialValues>()

  const selectedTags = watch("tags")
  return (
    <FormGroup>
      <div>
        <Label fontWeight="500" fontSize="16px">
          Tag your social
        </Label>
        <Label fontWeight="400" fontSize="16px" style={{ marginBottom: 24 }}>
          Tag your social Pick tags for our curation engine to work its magin
        </Label>
      </div>
      {selectedTags.length > 0 && (
        <Space direction="row" style={{ marginBottom: 16 }}>
          {selectedTags.map((tag) => (
            <div
              key={`selected_${tag}`}
              style={{ position: "relative", marginRight: 16 }}
            >
              <StyledTag selected style={{ paddingRight: 24, cursor: "none" }}>
                {tag}
              </StyledTag>
              <Image
                src={"/icon/ic_close.svg"}
                alt="ic_close"
                style={{
                  position: "absolute",
                  right: 6,
                  top: 4,
                  cursor: "pointer"
                }}
                width={18}
                height={18}
                onClick={() => {
                  setValue(
                    "tags",
                    selectedTags.filter((t: string) => t !== tag)
                  )
                }}
              />
            </div>
          ))}
        </Space>
      )}

      <Space direction="row">
        {TAGS.filter((t) => !selectedTags.includes(t)).map((tag) => (
          <StyledTag
            key={tag}
            onClick={() => {
              setValue("tags", [...selectedTags, tag])
            }}
          >
            {tag}
          </StyledTag>
        ))}
      </Space>
      <FormHelpText>{errors.tags ? errors.tags.message : ""}</FormHelpText>
    </FormGroup>
  )
}
