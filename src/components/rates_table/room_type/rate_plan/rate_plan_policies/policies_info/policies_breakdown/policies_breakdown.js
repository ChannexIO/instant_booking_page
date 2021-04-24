import React, { forwardRef, useMemo } from "react";
import { Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import PolicySection from "./policy_section";

import styles from "./policies_breakdown.module.css";

function PoliciesBreakdown({ ratePlan, className, ...popoverProps }, ref) {
  const { t } = useTranslation();
  const { cancellationPolicy, mealType } = ratePlan;

  const popoverClassName = [className, styles.popover].join(" ");

  const paymentPolicyText = useMemo(() => {
    if (!cancellationPolicy) {
      return null;
    }

    const { guaranteePaymentPolicy, currency, guaranteePaymentAmount } = cancellationPolicy;

    if (guaranteePaymentPolicy === "none") {
      return t("payment_policies:types:not_required");
    }

    const isPercentBased = guaranteePaymentPolicy === "percent_based";
    if (isPercentBased && guaranteePaymentAmount === 100) {
      return t("payment_policies:types:full");
    }

    const currencyUnit = isPercentBased ? "%" : currency;
    const policyTextParams = { amount: guaranteePaymentAmount, currency: currencyUnit };

    return t("payment_policies:types:partial", policyTextParams);
  }, [t, cancellationPolicy]);

  const cancellationPolicyText = useMemo(() => {
    if (!cancellationPolicy) {
      return null;
    }

    const {
      cancellationPolicyLogic,
      cancellationPolicyDeadline,
      cancellationPolicyDeadlineType,
      cancellationPolicyPenalty,
      currency,
      cancellationPolicyMode,
    } = cancellationPolicy;

    if (cancellationPolicyLogic === "non_refundable") {
      return t("cancellation_policies:types:non_refundable_detailed");
    }

    if (cancellationPolicyLogic === "free") {
      return t("cancellation_policies:types:free_detailed");
    }

    const unit = cancellationPolicyMode === "percent" ? "%" : currency;

    const cancellationParams = {
      time: cancellationPolicyDeadline,
      timeUnit: cancellationPolicyDeadlineType,
      amount: cancellationPolicyPenalty,
      unit,
    };

    return t("cancellation_policies:types:deadline_detailed", cancellationParams);
  }, [t, cancellationPolicy]);

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
