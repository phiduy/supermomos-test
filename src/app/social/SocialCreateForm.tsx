import { useForm } from "react-hook-form"
import styled, { useTheme } from "styled-components"
import moment from "moment"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "../components/StyledButton"
import { FormGroup, Label, Textfield } from "../components/StyledForm"
import StyledTag from "../components/StyledTag"
import FormProvider, {
  RHFCheckbox,
  RHFDatePicker,
  RHFTextArea,
  RHFTextField,
  RHFTitle
} from "../components/hook-form"
import Spinner from "../components/Spinner"
import SocialPrivacy from "./SocialPrivacy"
import SocialTagSelection from "./SocialTagSelection"
import SocialBanner from "./SocialBanner"
import { FormSchema, SocialValues } from "./schema"
import { useState } from "react"

export const SubTitle = styled.h2<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : props.theme.primary};
  padding: 0 4px;
  text-transform: capitalize;
  color: white;
  font-size: 32px;
  width: fit-content;
  margin-bottom: 28px;
`

export const Space = styled.div`
  display: flex;
  ${({
    justifyContent = "flex-start",
    alignItems = "flex-start",
    direction = "row"
  }: {
    justifyContent?: string
    alignItems?: string
    direction?: string
  }) =>
    `
      flex-direction: ${direction};
      justify-content: ${justifyContent};
      alignItems: ${alignItems}
      & > ${Textfield}:not(:last-child) {
        margin-right: 16px;
      };
      & > ${FormGroup}:not(:last-child) {
        margin-right: 16px;
      };
      & > ${Label}:not(:last-child) {
        margin-right: 32px;
      }
      & > ${StyledTag}:not(:last-child) {
        margin-right: 12px;
      }
    `};
`

export const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const headers = new Headers({
  "content-type": "application/json",
  "access-control-allow-origin": "*"
})

const createSocial = (values: Omit<SocialValues, "startDate">) => {
  return fetch("https://api.supermomos-dev.com/interview/social", {
    method: "POST",
    headers,
    body: JSON.stringify(values)
  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    return res.text().then((text: string) => {
      throw new Error(text)
    })
  })
}

const defaultValues = {
  title: "",
  startAt: null,
  startDate: null,
  venue: "",
  capacity: 0,
  description: "",
  banner: "",
  tags: [],
  privacy: ""
}

export default function SocialCreateForm() {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const methods = useForm<SocialValues>({
    resolver: yupResolver(FormSchema),
    defaultValues
  })

  const { handleSubmit } = methods

  const combineDateAndTime = (date: Date, time: Date): string => {
    let temptDate = moment(date).format("MM/DD/YYYY")
    let temptTime = moment(time).format("HH:mm:ss")
    return `${temptDate}T${temptTime}`
  }

  const onSubmit = async (data: SocialValues) => {
    try {
      setLoading(true)
      const startAt = combineDateAndTime(
        data.startDate as Date,
        data.startAt as Date
      ) as string
      let body: Omit<SocialValues, "startDate"> = {
        title: data.title,
        startAt,
        venue: data.venue,
        capacity: data.capacity,
        price: data.price,
        description: data.description,
        isManualApprove: data.isManualApprove,
        privacy: data.privacy,
        banner: data.banner,
        tags: data.tags
      }

      /**
       * ! CORS Problems in API
       */
      const response = await createSocial(body)
      console.log("response", response)
    } catch (error: any) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      toast.error(message || "Error")
      setLoading(false)
    }
  }

  return (
    <Space direction="column">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Space justifyContent="center">
          {loading && (
            <LoadingScreen>
              <Spinner />
            </LoadingScreen>
          )}
          <div style={{ marginRight: 40, flex: 1 }}>
            <RHFTitle name="title" placeholder="Untitle Event" autoFocus />
            <Space>
              <div style={{ marginRight: 16 }}>
                <RHFDatePicker
                  startIcon="/icon/ic_calendar.svg"
                  name="startDate"
                  placeholderText="StartDate"
                />
              </div>
              <RHFDatePicker
                startIcon="/icon/ic_date.svg"
                name="startAt"
                placeholderText="StartAt"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </Space>

            <RHFTextField
              startIcon="/icon/ic_location_marker.svg"
              name="venue"
              placeholder="Venue"
            />
            <Space>
              <RHFTextField
                startIcon="/icon/ic_people.svg"
                name="capacity"
                placeholder="Max capacity"
                type="number"
              />
              <RHFTextField
                startIcon="/icon/ic_cost.svg"
                name="price"
                type="number"
                placeholder="Cost per person"
              />
            </Space>
          </div>
          <SocialBanner />
        </Space>
        <Space style={{ margin: "16px 0" }}>
          <Space direction="column" style={{ flex: 1 }}>
            <div>
              <RHFTextArea name="description" placeholder="Description" />
            </div>
            <Space
              direction="column"
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                padding: 32,
                marginBottom: 32
              }}
            >
              <SubTitle
                backgroundColor={theme.secondary}
                style={{
                  color: theme.primary,
                  padding: "8px 4px",
                  fontSize: 32
                }}
              >
                Settings
              </SubTitle>
              <RHFCheckbox
                name="isManualApprove"
                label="I want to approve attendees"
              />

              <SocialPrivacy />
              <SocialTagSelection />
            </Space>

            <Button type="submit">CREATE SOCIAL</Button>
          </Space>
          <div style={{ flex: 1 }} />
        </Space>
      </FormProvider>
    </Space>
  )
}
