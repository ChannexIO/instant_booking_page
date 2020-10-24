import React, { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';

import BookButton from '../book_button';
import RateBreakdown from '../rate_breakdown';
import TotalPrice from '../total_price';

import ExpandButton from './expand_button';

import styles from './mobile_summary.module.css';

export default function MobileSummary({ selectedRatesList, totalPrice, currency }) {
  const [activeKey, setActiveKey] = useState(null);
  const isRateSelected = Boolean(selectedRatesList.length);
  const isExpanded = Boolean(activeKey);

  const toggleActiveTab = () => {
    setActiveKey(activeKey ? null : '0');
  };

  return (
    <div className={styles.mobileSummaryContainer}>
      {isRateSelected && (
        <>
          <ExpandButton expanded={isExpanded} onClick={toggleActiveTab} />
          <Accordion activeKey={activeKey}>
            <Accordion.Collapse eventKey="0">
              <>
                <RateBreakdown selectedRatesList={selectedRatesList} currency={currency} />
                <TotalPrice totalPrice={totalPrice} currency={currency} />
              </>
            </Accordion.Collapse>
          </Accordion>
        </>
      )}
      <BookButton isRateSelected={isRateSelected} total={totalPrice} currency={currency} />
    </div>
  );
}
