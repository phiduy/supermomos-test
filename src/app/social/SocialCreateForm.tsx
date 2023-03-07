import { useForm } from "react-hook-form"
import styled, { useTheme } from "styled-components"
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFTextArea,
  RHFTextField,
  RHFTitle
} from "../components/hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "../components/StyledButton"
import { FormGroup, Label, Textfield } from "../components/StyledForm"
import StyledTag from "../components/StyledTag"
import { FormSchema, SocialValues } from "./schema"
import FormProvider from "../components/hook-form/FormProvider"
import SocialPrivacy from "./SocialPrivacy"
import SocialTagSelection from "./SocialTagSelection"
import SocialBanner from "./SocialBanner"
import moment from "moment"

export const FormContainer = styled.div``

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

const createSocial = async (values: Omit<SocialValues, "startDate">) => {
  const response = await fetch(
    "https://api.supermomos-dev.com/interview/social",
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  )
  return response.json()
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
      const response = await createSocial({
        title:
          "Web3 Founders & Designers Mixer + fireside chat with Coinbase Senior Designer & Airfoil founder",
        startAt: "2022-10-11T19:00:00+00:00",
        venue: "Chelsea Market (163 W 20nd Street). Manhattan, NYC",
        capacity: 50,
        price: 30,
        description:
          "Calling all web3 founders and designers for an exciting night of exchanging ideas and making new friends! Make friends with fellow designers and founders in web3. There will also be lots of insights to be gained through an intimate chat\n+Q&A with two giants in the industry: \n\nPhil Hedayatnia, Founder & CEO of Airfoil, a\ngrowth design studio that has designed and built products in web3, the creator economy,\nthe future of work, and much more for 80+ startups since 2018 \n\nJihoon Suh, Senior\nProduct Designer at Coinbase, who was previously Senior Product Designer for Messenger\nfor Meta. \n\nThis will be a curated group with limited spots, so do sign up early!\n\nAbout\nAirfoil: \n\nAirfoil Studio is the design, branding, and engineering team helping web3 take flight. As one of crypto's first large-scale design firms, we aim to design a friendlier\nfinancial layer for the internet. We're a team of 85+ creatives, working from Airfoil's hubs in\nToronto, Singapore, and Seoul, who've worked on 100+ projects since 2018, including\nSolana Pay, Drift Protocol, Bonfida Solana Name Service, Utopia Labs, Planetarium,\nLayer3.xyz, MarginFi, Hyperspace, VBA Game, and more.\n\nLearn more about Airfoil and\nour work at airfoil.studio.",
        isManualApprove: true,
        privacy: "Public",
        banner:
          "https://supermomos-app-resourcesus.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
        tags: ["Product", "Design"]
      })
      console.log("response", response)
    } catch (error) {}
  }

  return (
    <Space direction="column">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Space justifyContent="center">
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