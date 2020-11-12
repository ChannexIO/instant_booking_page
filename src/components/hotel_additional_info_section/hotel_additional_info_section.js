import React from 'react';
import { useTranslation } from 'react-i18next';

import SectionWrapper from 'components/layout/section_wrapper';
import SectionTitle from 'components/section_title';

import GeneralPolicies from './policies/general_policies';
import InternetAccessPolicies from './policies/internet_access_policies';
import ParkingPolicies from './policies/parking_policies';
import PetsPolicies from './policies/pets_policies';
import SmokingPolicies from './policies/smoking_policies';

export default function HotelInfoSection({ property }) {
  const { t } = useTranslation();
  const { hotelPolicy } = property;

  if (!hotelPolicy) {
    return null;
  }

  return (
    <SectionWrapper theme="dark">
      <SectionTitle>{t('hotel_page:additional_information')}</SectionTitle>
      <GeneralPolicies hotelPolicy={hotelPolicy} />
      <InternetAccessPolicies hotelPolicy={hotelPolicy} />
      <ParkingPolicies hotelPolicy={hotelPolicy} />
      <SmokingPolicies hotelPolicy={hotelPolicy} />
      <PetsPolicies hotelPolicy={hotelPolicy} />
    </SectionWrapper>
  );
}
