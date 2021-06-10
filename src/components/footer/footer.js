import React from "react";

import Link from "components/link";
import PolicyLink from "components/policy_link";
import SectionTitle from "components/section_title";

import FooterLinkContainer from "./footer_link_container";
import GetChannelAd from "./get_channel_ad";

import styles from "./footer.module.css";

const MAX_ADDRESS_LINE_SIZE = 2;

const getFormattedAddress = (address) => {
  if (!address) {
    return null;
  }

  const addressChunks = address.split(", ");
  const groupedAddressChunks = [];

  while (addressChunks.length) {
    const newChunk = addressChunks.splice(0, MAX_ADDRESS_LINE_SIZE);

    groupedAddressChunks.push(newChunk.join(", "));
  }

  return (
    <>
      {groupedAddressChunks.map((chunk, index) => (
        <div key={index.toString()}>{chunk}</div>
      ))}
    </>
  );
};

export default function Footer({ property = {} }) {
  const { title, address, email, phone } = property;

  const formattedAddress = getFormattedAddress(address);

  return (
    <div className={styles.footerWrapper}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className={styles.footer}>
        {formattedAddress && (
          <Link to="#/" type="location">
            {formattedAddress}
          </Link>
        )}
        {email && (
          <Link to={email} type="mail">
            {email}
          </Link>
        )}
        {phone && (
          <Link to={phone} type="phone">
            {phone}
          </Link>
        )}
      </div>
      <FooterLinkContainer>
        <GetChannelAd />
      </FooterLinkContainer>
      <FooterLinkContainer>
        <PolicyLink />
      </FooterLinkContainer>
    </div>
  );
}
