/**
 * Multi-currency converter helper for diaspora & international bridal orders
 */

const EXCHANGE_RATES_INR = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0094,
  AED: 0.044,
  EUR: 0.011,
};

export const convertFromINR = (amountInINR, targetCurrency = "INR") => {
  const rate = EXCHANGE_RATES_INR[targetCurrency] || 1;
  return Math.round(amountInINR * rate * 100) / 100;
};

export const getSupportedCurrencies = () => Object.keys(EXCHANGE_RATES_INR);
