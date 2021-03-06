/**
 * Three-letter ISO 4217 currency code for the payment.
 *
 * This enum is an example and not exhaustive, refer to the ISO standard for a complete listing
 */
declare enum CurrencyCode {
    GBP = "GBP",
    USD = "USD"
}
/**
 * Union of [CurrencyCode](https://developer.squareup.com/reference/sdks/web/payments/enums/CurrencyCode) values.
 */
declare type CurrencyCodeValue = `${CurrencyCode}`;
/**
 * Interface for handling any currency
 * @example
 * const paymentAmount = {
 *    "amount": 1.00,
 *    "currencyCode": "USD"
 * }
 */
interface Money {
    amount: number;
    currencyCode: CurrencyCodeValue;
}
export { CurrencyCode, CurrencyCodeValue, Money };
