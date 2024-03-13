import styled from '@emotion/styled'
import type { Loadable, ObshchakUser } from 'app-common'
import React from 'react'
import { isNil } from 'lodash'
import { DotDivider, DotDividerSizeType } from '@OBSHCHAK-UI/app/_components'
import { ContactInfoLine } from './contact-info-line'

const ContactInfoSkeleton: React.FC = () => (
  <>
    <ContactInfoLine isLoading={true} text={''} />
    <DotDivider isLoading={true} size={DotDividerSizeType.small} />
    <ContactInfoLine isLoading={true} text={''} />
    <DotDivider isLoading={true} size={DotDividerSizeType.small} />
    <ContactInfoLine isLoading={true} text={''} />
  </>
)

type ContactInfoProps = Loadable<{
  contacts: Record<string, string>
}>
const ContactInfoBase: React.FC<ContactInfoProps> = ({ isLoading, contacts }) => {
  if (isLoading) {
    return <ContactInfoSkeleton />
  }

  if (isNil(contacts)) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return Object.entries(contacts).map(([key, value], index, array) => (
    <React.Fragment key={key}>
      <ContactInfoLine text={value} />
      {index < array.length - 1 && <DotDivider size={DotDividerSizeType.small} />}
    </React.Fragment>
  ))
}

export const ContactInfo: typeof ContactInfoBase = (props) => (
  <ContactInfoContainer>
    <ContactInfoBase {...props} />
  </ContactInfoContainer>
)

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 16px;
  min-width: 400px;
`
