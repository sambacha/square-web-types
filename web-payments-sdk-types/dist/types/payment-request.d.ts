import { PaymentRequestCallback, PaymentRequestEventValue, PaymentRequestOptions } from './payment-method';
/**
 * An object that represents an Apple Pay or Google Pay payment request
 *
 * `PaymentRequest` encapsulates the details of an Apple Pay or Google Pay request
 * for payment and a method for connecting event listeners to the payment request.
 *
 * @example
 * const payments = Square.payments(appId, locationId);
 *
 * const paymentRequest = payments.paymentRequest({
 *   countryCode: 'US',
 *   currencyCode: 'USD',
 *   requestBillingContact: true,
 *   requestShippingContact: true,
 *   lineItems: [
 *      { amount: '2.00', label: 'Item Cost' },
 *      { amount: '0.00', label: 'Shipping' },
 *      { amount: '0.00', label: 'Tax' },
 *   ],
 *   shippingOptions: [
 *      {
 *        amount: '0.00',
 *        id: 'shipping-option-1',
 *        label: 'Free',
 *      },
 *   ],
 *   total: {
 *     amount: '1.00',
 *     label: 'Total',
 *   }
 * });
 *
 * const applePay = await payments.applePay(paymentRequest);
 * const googlePay = await payments.googlePay(paymentRequest);
 */
interface PaymentRequest {
    /**
     * Adds an event listener to the PaymentRequest.
     * @example
     * req.addEventListener('shippingcontactchanged', (contact) => {
     *   // action
     *   return { lineItems, total, shippingOptions };
     * });
     * req.addEventListener('shippingoptionchanged', (option) => {
     *  // action
     *  // the callback can be either async or sync.
     *  return Promise.resolve({ lintItems, total });
     * });
     * @param {PaymentRequestEvent} event
     * @param {PaymentRequestCallback} callback
     */
    addEventListener(event: PaymentRequestEventValue, callback: PaymentRequestCallback): void;
    /**
     * Updates the specified options of the PaymentRequest. Returns `true` if the update was
     * successful. Updates are not allowed while the Apple Pay or Google Pay payment sheets are
     * currently being displayed to the buyer. In these cases, `update()` will return `false`.
     *
     * @example
     * const updateSuccessful = req.update({ currencyCode: 'USD' });
     * @throws {InvalidPaymentRequestError}
     * @param {Partial<PaymentRequestOptions} options
     * @return {boolean} success
     **/
    update(options: Partial<PaymentRequestOptions>): boolean;
}
export { PaymentRequest };
