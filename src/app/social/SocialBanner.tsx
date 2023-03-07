import Image from "next/image"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Modal from "react-modal"
import styled, { useTheme } from "styled-components"
import StyledButton from "../components/StyledButton"
import DropzoneContainer from "../components/StyledDropzone"
import { FormHelpText } from "../components/StyledForm"

import { BANNERS } from "../_mock/banner"
import { SocialValues } from "./schema"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
}

const StyledSelectButton = styled.button<{ banner?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.banner ? props.theme.lightGray : "transparent"};
  border-radius: 10px;

  span {
    margin-left: 8px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 400;
    color: ${(props) => props.theme.darkBlue};
  }
`

const StyledModalContainer = styled.div`
  width: 900px;
  border-radius: 12px;
  margin: -20px;
`

const StyledModalHeader = styled.div`
  position: relative;
  font-size: 24px;
  font-weight: bold;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.lightGray};
  color: ${(props) => props.theme.darkBlue};
`

const StyledModalFooter = styled.div`
  position: relative;
  padding: 12px 16px;
  border-top: 1px solid ${(props) => props.theme.lightGray};
  display: flex;
  justify-content: flex-end;
`

const StyledModalContent = styled.div`
  padding: 16px;
`

const StyledImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: ;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`

const StyledImageWrapper = styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding: 4px;
  background: ${(props) => (props.selected ? props.theme.darkBlue : "inherit")};
  display: flex;
  justify-content: center;
`

export default function SocialBanner() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<null | string>(null)
  const theme = useTheme()
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<SocialValues>()

  const banner = watch("banner")

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  const handleSave = () => {
    if (selected) {
      setValue("banner", selected)
      handleClose()
    }
  }

  return (
    <>
      <div
        style={{
          flex: 1
        }}
      >
        <DropzoneContainer>
          {banner && (
            <div
              style={{
                position: "absolute",
                zIndex: 0,
                width: "100%",
                height: "100%"
              }}
            >
              <Image src={banner} alt={`${banner}`} fill />
            </div>
          )}
          <StyledSelectButton
            banner={banner}
            onClick={() => setOpen(true)}
            style={{ zIndex: banner && !open ? 1 : 0 }}
          >
            <Image
              src={"/icon/ic_picture.svg"}
              alt="ic_picture"
              width={24}
              height={24}
            />
            <span>Add a banner</span>
          </StyledSelectButton>
        </DropzoneContainer>
        <FormHelpText>
          {errors.banner ? errors.banner.message : ""}
        </FormHelpText>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StyledModalContainer>
          <StyledModalHeader>
            Choose a banner
            <Image
              src={"/icon/ic_close.svg"}
              alt="ic_picture"
              width={24}
              height={24}
              style={{ fill: "#000", position: "absolute", right: 20, top: 14 }}
              onClick={handleClose}
            />
          </StyledModalHeader>
          <StyledModalContent>
            <StyledImageGrid>
              {BANNERS.map((url) => (
                <StyledImageWrapper
                  key={url}
                  selected={selected === url}
                  onClick={() => {
                    setSelected(url)
                  }}
                >
                  <Image
                    src={url}
                    alt={`${url}`}
                    width={118}
                    height={80}
                    priority
                    onClick={() => {}}
                  />
                </StyledImageWrapper>
              ))}
            </StyledImageGrid>
            <FormHelpText>
              {errors.banner ? errors.banner.message : ""}
            </FormHelpText>
          </StyledModalContent>
          <StyledModalFooter>
            <StyledButton
              style={{
                fontWeight: 600,
                marginRight: 16,
                backgroundColor: "transparent",
                color: theme.gray
              }}
              onClick={handleClose}
            >
              Close
            </StyledButton>
            <StyledButton style={{ fontWeight: 600 }} onClick={handleSave}>
              Save
            </StyledButton>
          </StyledModalFooter>
        </StyledModalContainer>
      </Modal>
    </>
  )
}
