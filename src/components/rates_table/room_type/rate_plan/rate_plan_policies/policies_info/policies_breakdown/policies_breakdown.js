import React, { forwardRef, useMemo } from "react";
import { Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import getCancellationPorlicyText from "utils/get_cancellation_policy_text";
import getPaymentPolicyText from "utils/get_payment_policy_text";

import PolicySection from "./policy_section";

import styles from "./policies_breakdown.module.css";

function PoliciesBreakdown({ ratePlan, className, ...popoverProps }, ref) {
  const { t } = useTranslation();
  const { cancellationPolicy, mealType } = ratePlan;

  const popoverClassName = [className, styles.popover].join(" ");

  const paymentPolicyText = useMemo(() => getPaymentPolicyText(cancellationPolicy), [
    cancellationPolicy,
  ]);

  const cancellationPolicyText = useMemo(() => getCancellationPorlicyText(cancellationPolicy), [
    cancellationPolicy,
  ]);

  return (
    <Popover
      className={popoverClassName}
      ref={ref}
      // OverlayTrigger add bunch of props that should be bypassed to popover
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...popoverProps}
    >
      <Popover.Content className={styles.popoverContent}>
        <PolicySection title={t("rates_table:meals")} text={t(`meal_types:${mealType}`)} />
        {cancellationPolicyText && (
          <PolicySection title={t("rates_table:cancellation")} text={cancellationPolicyText} />
        )}
        {paymentPolicyText && (
          <PolicySection title={t("rates_table:prepayment")} text={paymentPolicyText} />
        )}
      </Popover.Content>
    </Popover>
  );
}

export default forwardRef(PoliciesBreakdown);
