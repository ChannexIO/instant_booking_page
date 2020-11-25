import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';

import ExpandButton from './expand_button';

export default function ExpandlableContainer({ title, children }) {
  const [activeKey, setActiveKey] = useState(null);
  const isExpanded = Boolean(activeKey);

  const toggleActiveTab = () => {
    setActiveKey(activeKey ? null : '0');
  };

  return (
    <div>
      <ExpandButton title={title} expanded={isExpanded} onClick={toggleActiveTab} />
      <Accordion activeKey={activeKey}>
        <Accordion.Collapse eventKey="0">
          <>
            {children}
          </>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}
