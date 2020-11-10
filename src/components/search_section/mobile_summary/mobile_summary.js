import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';

import ActionButton from '../action_button';
import PriceBreakdown from '../price_breakdown';
import TotalPrice from '../total_price';

import ExpandButton from './expand_button';

import styles from './mobile_summary.module.css';

export default function MobileSummary(props) {
  const { selectedRatesByRoom, totalPrice, currency, loading, onSearch } = props;
  const [activeKey, setActiveKey] = useState(null);
  const isRateSelected = Boolean(Object.keys(selectedRatesByRoom).length);
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
                <PriceBreakdown selectedRatesByRoom={selectedRatesByRoom} currency={currency} />
                <TotalPrice totalPrice={totalPrice} currency={currency} />
              </>
            </Accordion.Collapse>
          </Accordion>
        </>
      )}
      <ActionButton
        isRateSelected={isRateSelected}
        total={totalPrice}
        currency={currency}
        loading={loading}
        onSearch={onSearch}
      />
    </div>
  );
}
