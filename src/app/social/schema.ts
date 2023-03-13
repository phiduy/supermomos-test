import * as Yup from "yup"

export type SocialValues = {
  title: string
  startAt: Date | string | null
  startDate: Date | string | null
  venue: string
  capacity: number
  price?: number
  description: string
  banner: string
  tags: string[]
  isManualApprove?: boolean
  privacy: string
}

// ----------------------------------------------------------------------
export const FormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid value"),
  startAt: Yup.date()
    .required("Start at is required")
    .typeError("Invalid value"),
  venue: Yup.string().required("Venue is required"),
  capacity: Yup.number().required("Capacity is required"),
  price: Yup.number(),
  description: Yup.string().required("Description is required"),
  banner: Yup.string().required("Banner is required"),
  tags: Yup.array().min(1, "Choose at least one tag"),
  isManualApprove: Yup.boolean(),
  privacy: Yup.string().required("Privacy is required")
})
