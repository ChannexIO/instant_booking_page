import i18n from 'i18next';

export default {
  required: () => i18n.t('validation_messages:required'),
  number: () => i18n.t('validation_messages:number'),
  positive: () => i18n.t('validation_messages:positive_number'),
  phone: () => i18n.t('validation_messages:phone'),
  email: () => i18n.t('validation_messages:email'),
};
