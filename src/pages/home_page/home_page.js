import React from "react";

import MainSearch from "components/main_search";

import styles from "./home_page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>The Best Family Booking Site</p>
        <p className={styles.subTitle}>
          We have curated and pre selected the top family friendly hotels in central <br /> London.
          <br />
          All hotels have a lift, breakfast and family rooms.
        </p>

        <MainSearch />
      </div>
    </div>
  );
}
