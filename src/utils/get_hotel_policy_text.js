import i18n from "i18next";

const t = (subPath) => i18n.t(`hotel_page:hotel_policy:${subPath}`);

const concatSentences = (sentences) => sentences.filter(Boolean).join(". ");

const getAgePolicy = (hotelPolicy) => {
  const { isAdultsOnly } = hotelPolicy;

  return isAdultsOnly ? t("adults_only") : t("all_ages");
};

const getInternetPolicy = (hotelPolicy) => {
  const { currency, internetAccessCost, internetAccessCoverage, internetAccessType } = hotelPolicy;

  if (internetAccessType === "none") {
    return t("internet:not_available");
  }

  const coverage = `${t("internet:coverage_title")} ${i18n.t("global:in")} ${t(
    `internet:coverage_options:${internetAccessCoverage}`,
  )}`;
  const type = `${t("internet:type_title")} ${i18n.t("global:is")} ${t(
    `internet:type_options:${internetAccessType}`,
  )}`;
  const costValue = internetAccessCost
    ? `${internetAccessCost} ${currency}`
    : t("internet:cost_options:free");
  const cost = `${t("internet:cost_title")} ${i18n.t("global:is")} ${costValue}`;

  return concatSentences([type, coverage, cost]);
};

const getParkingPolicy = (hotelPolicy) => {
  const { parkingIsPrivate, parkingReservation, parkingType } = hotelPolicy;

  if (parkingType === "none") {
    return t("parking:not_available");
  }

  const type = `${t("parking:type_title")} ${i18n.t("global:is")} ${t(
    `parking:type_options:${parkingType}`,
  )}`;
  const reservation = `${t("parking:reservation_title")} ${t(
    `parking:reservation_options:${parkingReservation}`,
  )}`;
  const propertyType = parkingIsPrivate
    ? t("parking:property_options:private")
    : t("parking:property_options:public");
  const property = `${t("parking:property_title")} ${i18n.t("global:is")} ${propertyType}`;

  return concatSentences([type, reservation, property]);
};

const getPetsPolicy = (hotelPolicy) => {
  const { petsNonRefundableFee, petsPolicy, petsRefundableDeposit, currency } = hotelPolicy;

  if (petsPolicy === "not_allowed") {
    return t("pets:options:not_allowed");
  }

  const policy = t(`pets:options:${petsPolicy}`);
  const parsedFee = parseFloat(petsNonRefundableFee);
  const fee =
    parsedFee &&
    `${t("pets:non_refundable_fee")} ${i18n.t("global:is")} ${petsNonRefundableFee} ${currency}`;
  const parsedDeposit = parseFloat(petsRefundableDeposit);
  const deposit =
    parsedDeposit &&
    `${t("pets:refundable_deposit")} ${i18n.t("global:is")} ${petsRefundableDeposit} ${currency}`;

  return concatSentences([policy, fee, deposit]);
};

const getSmokingPolicy = (hotelPolicy) => {
  const { smokingPolicy } = hotelPolicy;

  return t(`smoking:options:${smokingPolicy}`);
};

const getHotelPolicyText = (hotelPolicy) => {
  if (!hotelPolicy) {
    return null;
  }

  const agePolicy = getAgePolicy(hotelPolicy);
  const internetPolicy = getInternetPolicy(hotelPolicy);
  const parkingPolicy = getParkingPolicy(hotelPolicy);
  const petsPolicy = getPetsPolicy(hotelPolicy);
  const smokingPolicy = getSmokingPolicy(hotelPolicy);

  return concatSentences([agePolicy, internetPolicy, parkingPolicy, petsPolicy, smokingPolicy]);
};

export default getHotelPolicyText;
