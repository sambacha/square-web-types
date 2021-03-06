import { CashApp, DigitalWalletOptions, PaymentRequestOptions } from './payment-method';
import { ACH } from './payment-method/ach/method';
import { ApplePay } from './payment-method/apple-pay/method';
import { Card } from './payment-method/cards/method';
import { CardOptions } from './payment-method/cards/types';
import { GiftCardOptions } from './payment-method/gift-card';
import { GiftCard } from './payment-method/gift-card/method';
import { GooglePay } from './payment-method/google-pay/method';
import { PaymentRequest } from './payment-request';
import { ChargeVerifyBuyerDetails, StoreVerifyBuyerDetails, VerifyBuyerResponseDetails } from './verify-buyer';
/**
 * The result of calling `setLocale()` on the WebPaySDK payments instance.
 **/
interface SetLocaleResult {
    /**
     * The previous [BCP 47](https://tools.ietf.org/rfc/bcp/bcp47.txt) locale string of
     * the WebPaySDK before `setLocale()` was called.
     **/
    previousLocale: string;
    /**
     * The new [BCP 47](https://tools.ietf.org/rfc/bcp/bcp47.txt) locale string after
     * WebPaySDK `setLocale()` was called.
     **/
    newLocale: string;
    /**
     * A message that indicates the result of the setLocale call.
     **/
    message?: string;
}
/**
 * Returned by `Square.payments(appId, locationId)`.
 *
 * Use this object to instantiate Payment methods.
 * @example
 * const payments = Square.payments(appId, locationId);
 */
interface Payments {
    /**
     * Starts the **Strong Customer Authentication** flow to verify the identity of
     * the payment card holder.
     * @param source The payment token received from a tokenization call or the unique ID of a card on file.
     * @param details Details about the buyer to help verify their identify.
     * @throws {VerifyBuyerError} Something went wrong trying to verify the buyer
     */
    verifyBuyer(source: string, details: ChargeVerifyBuyerDetails | StoreVerifyBuyerDetails): Promise<VerifyBuyerResponseDetails | null>;
    /**
     * Creates a new PaymentRequest instance that sets up event listeners for GooglePay and ApplePay payment methods.
     * @param {PaymentRequestOptions} options
     * @returns {PaymentRequestImpl}
     *
     * @example
     * const paymentRequest = {
     *    countryCode: 'US',
     *    currencyCode: 'USD',
     *    lineItems: [
     *       { amount: '1.23', label: 'Cat', pending: false },
     *       { amount: '4.56', label: 'Dog', pending: false },
     *    ],
     *    requestBillingContact: false,
     *    requestShippingContact: true,
     *    shippingContact: {
     *       addressLines: ['1 Test St', ''],
     *       city: 'San Francisco',
     *       countryCode: 'US',
     *       email: 'test@squareup.com',
     *       familyName: 'First Name',
     *       givenName: 'Last Name',
     *       phone: '+12345678910',
     *        postalCode: '11111',
     *       state: 'CA',
     *     },
     *     shippingOptions: [
     *       { amount: '0.00', id: 'FREE', label: 'Free' },
     *       { amount: '9.99', id: 'XP', label: 'Express' },
     *     ],
     *     total: { amount: '5.79', label: 'Total', pending: false },
     *   };
     * const payments = Square.payments(appId, locationId);
     * const req = payments.paymentRequest(paymentRequest);
     */
    paymentRequest(options: PaymentRequestOptions): PaymentRequest;
    /**
     * Sets the locale of the Payments instance. If this method is not called explicitly, the user's browser
     * language specified by `navigator.language` will be used instead. If the language returned by
     * `navigator.language` is unsupported, the SDK falls back to `en-US`.
     *
     * If the specified language passed to setLocale() is not supported, the operation is a no-op.
     * If the specified language is supported, but the specified region is not, Web Payments SDK will fall
     * back to using the desired language in a different supported region.
     *
     * @param {String} locale The [BCP 47](https://tools.ietf.org/rfc/bcp/bcp47.txt) locale string
     * to set the WebPaySDK language to.
     *
     * @throws {UnexpectedError} if the payment context cannot initialize or the locale cannot be set
     * @returns {SetLocaleResult} An object denoting the result of calling setLocale
     */
    setLocale(locale: string): Promise<SetLocaleResult>;
    /**
     * Creates a Card payment method.
     * For more information about customizing the card form, see available [CardOptions](https://developer.squareup.com/reference/sdks/web/payments/objects/CardOptions).
     * @param options
     * @example
     * const payments = Square.payments(appId, locationId);
     * const card = await payments.card({
     *   "postalCode" : "12345",
     *   "style": {
     *     "input": {
     *       "color": "red",
     *     }
     *     "@media screen and (max-width: 600px)": {
     *         "input": {
     *           "fontSize": "12px",
     *        }
     *      }
     *   }
     * });
     * await card.attach('#card');
     * const form = document.querySelector('#card-payment');
     * form.addEventListener('submit', async (event) => {
     *    event.preventDefault();
     *    const result = await card.tokenize(); // the card nonce
     * });
     * @throws {UnexpectedError} if the payment context cannot initialize
     */
    card(options?: CardOptions): Promise<Card>;
    /**
     * Create a GooglePay payment method instance.
     *
     * @example
     * const paymentRequest = payments.paymentRequest({
     *   total: {
     *     amount: 100,
     *     currencyCode: 'USD'
     *   }
     * });
     *
     * const googlePay = await payments.googlePay(paymentRequest);
     * // Must be an element ID.
     * await googlePay.attach('#target-element');
     *
     * const googlePayButtonTarget = document.getElementById('target-element');
     * googlePayButtonTarget.onclick = async () => {
     *   const tokenResult = await googlePay.tokenize();
     *
     *   // Pass the TokenResult to your server to complete the payment
     * }
     * @param paymentRequest - the payment request object created by [payments.paymentRequest(...)](https://developer.squareup.com/reference/sdks/web/payments/objects/Payments#Payments.paymentRequest)
     * @throws {InvalidPaymentRequestError} the provided payment request was invalid
     * @throws {UnexpectedError} if the payment context cannot initialize
     * @throws {ScriptLoaderError} if the Google Pay script cannot be loaded
     */
    googlePay(paymentRequest: PaymentRequest): Promise<GooglePay>;
    /**
     * Create an ApplePay payment method instance.
     *
     * @example
     * const paymentRequest = payments.paymentRequest({
     *   total: {
     *     amount: 100,
     *     currencyCode: 'USD'
     *   }
     * });
     *
     * const applePay = await payments.applePay(paymentRequest);
     *
     * const applePayButtonTarget = document.getElementById('target-element');
     * applePayButtonTarget.onclick = async () => {
     *   const tokenResult = await applePay.tokenize();
     *
     *   // Pass the TokenResult to your server to complete the payment
     * }
     * @param paymentRequest - the payment request object created by [payments.paymentRequest(...)](https://developer.squareup.com/reference/sdks/web/payments/objects/Payments#Payments.paymentRequest)
     * @throws {InvalidPaymentRequestError} the provided payment request was invalid
     * @throws {UnexpectedError} if the payment context cannot initialize
     */
    applePay(paymentRequest: PaymentRequest): Promise<ApplePay>;
    /**
     * Creates an ACH payment method instance
     *
     * @example
     * const ach = await payments.ach()
     *
     * const achButton = document.getElementById('ach-button')
     * const buyerNameField = document.getElementById('buyer-name-field');
     * achButton.onclick = () => {
     *   const tokenResult = ach.tokenize({ accountHolderName: buyerNameField.value });
     *
     *   // Process payment with tokenResult
     * }
     * @throws {UnexpectedError} if the payment context cannot initialize
     * @throws {ScriptLoaderError} if the Plaid script cannot be loaded
     */
    ach(): Promise<ACH>;
    /**
     * Creates a GiftCard payment method instance.
     * @param options
     * @example
     * const payments = Square.payments(appId, locationId);
     * const giftCard = await payments.giftCard({
     *   "style": {
     *     "input": {
     *       "color": "red"
     *     }
     *   }
     * });
     * await giftCard.attach('#gift-card');
     * const form = document.querySelector('#gift-card-payment');
     * form.addEventListener('submit', async (event) => {
     *    event.preventDefault();
     *    const result = await giftCard.tokenize(); // the gift card nonce
     * });
     * @throws {UnexpectedError} if the payment context cannot initialize
     */
    giftCard(options?: GiftCardOptions): Promise<GiftCard>;
    /**
     * @internal
     * Creates a CashApp payment method instance.
     *
     * @example
     * const cashApp = await payments.cashApp({
     *   redirectURI: `${window.location.href}`,
     *   totalTransactionAmount: {
     *     amount: 100, // $1.00
     *     currencyCode: 'USD',
     *   },
     *   transactionId,
     * });
     *
     * await cash.attachAll({
     *     button: '#pay-with-cash-button',
     *     qrCode: '#pay-with-cash-qr-code',
     *   },
     *   {
     *     button: {
     *       shape: 'Semirounded',
     *       theme: 'dark',
     *     },
     *   }
     * );
     *
     * const cashButton = document.getElementById('#pay-with-cash-button');
     *
     * // Desktop flow
     * cashButton.addEventListener('click', async function () {
     *   try {
     *     const result = await cashApp.tokenize();
     *    // Process payment with result.token
     *   }
     *   catch (e) {
     *   }
     * });
     *
     * // Mobile Flow
     * const result = await cashApp.getRedirectResult();
     * if (result !== null) {
     *   // Process payment with result.token
     * }
     * @param {DigitalWalletOptions} options
     */
    cashApp(options: DigitalWalletOptions): Promise<CashApp>;
}
export { SetLocaleResult, Payments };
