import React, { useContext, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { BookingDataContext } from "containers/data_context";

import getCancellationPolicyText from "utils/get_cancellation_policy_text";
import getHotelPolicyText from "utils/get_hotel_policy_text";
import getPaymentPolicyText from "utils/get_payment_policy_text";

import PolicyInfoSection from "./policy_info_section";

const buildSelectedRatesList = (ratesOccupancyPerRoom, roomsData) => {
  if (!ratesOccupancyPerRoom || !roomsData) {
    return [];
  }

  return Object.keys(ratesOccupancyPerRoom).reduce((acc, roomId) => {
    const selectedRoom = roomsData.find((room) => room.id === roomId);
    const selectedRatesOccupancyById = ratesOccupancyPerRoom[roomId];

    const selectedRates = selectedRoom.ratePlans.filter(
      (rate) => selectedRatesOccupancyById[rate.id],
    );

    return [...acc, ...selectedRates];
  }, []);
};

const buildPoliciesList = (selectedRatesList) => {
  return selectedRatesList
    .map(({ cancellationPolicy }) => {
      if (!cancellationPolicy) {
        return null;
      }

      const cancellationPolicyText = getCancellationPolicyText(cancellationPolicy);
      const paymentPolicyText = getPaymentPolicyText(cancellationPolicy);
      const policyText = [cancellationPolicyText, paymentPolicyText].join(". ");

      return {
        id: cancellationPolicy.id,
        text: policyText,
      };
    })
    .filter(Boolean);
};

const groupPoliciesBySimiliarContent = (policiesList) => {
  const groupedPoliciesByContent = policiesList.reduce((acc, policy) => {
    const matchingPolicy = acc[policy.text];

    if (!matchingPolicy) {
      return { ...acc, [policy.text]: policy };
    }

    return acc;
  }, {});

  return Object.values(groupedPoliciesByContent);
};

export default function PolicyInfoModal({ show, onHide }) {
  const { property, roomsInfo, params } = useContext(BookingDataContext);
  const { t } = useTranslation();

  const { data: roomsData } = roomsInfo;
  const { data: propertyData } = property;
  const { ratesOccupancyPerRoom } = params;

  const selectedRatesPolicies = useMemo(() => {
    const selectedRatesList = buildSelectedRatesList(ratesOccupancyPerRoom, roomsData);
    const policiesList = buildPoliciesList(selectedRatesList);
    const groupedPoliciesList = groupPoliciesBySimiliarContent(policiesList);

    return groupedPoliciesList.map(({ id, text }) => (
      <PolicyInfoSection key={id} title={t("payment_page:policy_info:policy")} text={text} />
    ));
  }, [t, roomsData, ratesOccupancyPerRoom]);

  const hotelPolicyText = getHotelPolicyText(propertyData?.hotelPolicy);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <h6>{t("payment_page:policy_info:modal_header")}</h6>
      </Modal.Header>
      <Modal.Body>
        <PolicyInfoSection
          title={t("payment_page:policy_info:hotel_policy")}
          text={hotelPolicyText}
        />
        {selectedRatesPolicies}
      </Modal.Body>
    </Modal>
  );
}
