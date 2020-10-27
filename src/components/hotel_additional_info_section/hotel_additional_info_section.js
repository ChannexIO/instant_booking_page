import React from 'react';
import { useTranslation } from 'react-i18next';

import Link from 'components/link';
import SectionTitle from 'components/section_title';

import InfoEntry from './info_entry';

export default function HotelInfoSection({ property }) {
  const { address, phone, email } = property;
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle>{t('hotel_page:additional_information')}</SectionTitle>

      {address && <InfoEntry name="address">{address}</InfoEntry>}
      {phone && <InfoEntry name="phone"><Link type="phone" to={phone}>{phone}</Link></InfoEntry>}
      {email && <InfoEntry name="email"><Link type="mail" to={email}>{email}</Link></InfoEntry>}
    </div>
  );
}
