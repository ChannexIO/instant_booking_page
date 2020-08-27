import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { OverlayTrigger } from 'react-bootstrap';

import PoliciesBreakdown from './policies_breakdown';

import styles from './policies_info.module.css';

export default function PoliciesInfo({ ratePlan }) {
  return (
    <OverlayTrigger
      placement="bottom"
      trigger="click"
      rootClose
      overlay={<PoliciesBreakdown ratePlan={ratePlan} />}
    >
      <InfoCircleOutlined className={styles.infoIcon} />
    </OverlayTrigger>
  );
}