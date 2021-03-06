import { BillingContact } from './contact';
interface BaseVerifyBuyerDetails {
    /**
     * The `Contact` information needed to help verify the buyer.
     */
    readonly billingContact: BillingContact;
}
/**
 * The verification details parameter passed, to the `payments.verifyBuyer()` function, for cases in which the buyer is being charged.
 * @example
 * const verificationDetails = {
 *   amount: '1.00',
 *   currencyCode: 'GBP',
 *   intent: 'CHARGE',
 *   billingContact: {
 *     addressLines: ['123 Main Street', 'Apartment 1'],
 *     familyName: 'Doe',
 *     givenName: 'John',
 *     email: 'jondoe@gmail.com',
 *     country: 'GB',
 *     phone: '3214563987',
 *     region: 'LND',
 *     city: 'London',
 *   },
 * };
 */
interface ChargeVerifyBuyerDetails extends BaseVerifyBuyerDetails {
    /**
     *  3-letter ISO 4217 currency code.
     */
    readonly currencyCode: string;
    /**
     *  The total cost of the purchase as a string representation of a number.
     *  example value: `'1.00'`.
     */
    readonly amount: string;
    /**
     *  Transactional intent of the payment
     */
    readonly intent: 'CHARGE';
}
/**
 * The verification details parameter, passed to the `payments.verifyBuyer()` function, for cases in which the card is being stored on file.
 * @example
 * const verificationDetails = {
 *   intent: 'STORE',
 *   billingContact: {
 *     addressLines: ['123 Main Street', 'Apartment 1'],
 *     familyName: 'Doe',
 *     givenName: 'John',
 *     email: 'jondoe@gmail.com',
 *     country: 'GB',
 *     phone: '3214563987',
 *     region: 'LND',
 *     city: 'London',
 *   },
 * };
 */
interface StoreVerifyBuyerDetails extends BaseVerifyBuyerDetails {
    /**
     *  Transactional intent of the payment
     */
    readonly intent: 'STORE';
}
/**
 * Response details from the `await payments.verifyBuyer()` function.
 */
interface VerifyBuyerResponseDetails {
    /**
     * Whether the buyer went through the Card Issuer's challenge flow to verify the buyer.
     */
    userChallenged: boolean;
    /**
     * The verification token that is passed to the Payments API.
     */
    token: string;
}
export { ChargeVerifyBuyerDetails, StoreVerifyBuyerDetails, VerifyBuyerResponseDetails, };
