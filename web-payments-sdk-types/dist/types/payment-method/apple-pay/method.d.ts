import { PaymentMethod, TokenResult } from '../payment-method-types';
/**
 * The ApplePay Payment Method.
 *
 * Requests a payment nonce for a payment card stored in an Apple Pay digital wallet.
 *
 * @example
 * // Create a request to pay 1.00 USD
 * const paymentRequest = payments.paymentRequest({
 *   total: {
 *     amount: 100,
 *     currencyCode: 'USD'
 *   }
 * });
 *
 * // Get a new Apple Pay method
 * const applePay = await payments.applePay(paymentRequest);
 *
 * const applePayButtonTarget = document.getElementById('applePay');
 * applePayButtonTarget.onclick = async () => {
 *   //Start the Apple Pay flow and await the secure token result
 *   const tokenResult = await applePay.tokenize();
 *
 *   // Pass the TokenResult to your server to complete the payment
 * }
 */
interface ApplePay extends PaymentMethod {
    /**
     * Tokenizes a payment request after validating the buyer. When the buyer completes their interaction
     * with Apple Pay, the returned promise resolves with a tokenResult object. The returned token
     * and buyer details can be used to complete the payment on your server.
     *
     * @example
     * applePayButtonTarget.onclick = async () => {
     *  try {
     *    const result = await applePay.tokenize();
     *
     *    if (result.status === "OK"){
     *       console.log(result);
     *       // Pass the TokenResult to your server to complete the payment
     *       await processPayment(result.token);
     *       alert('Apple Pay Payment Complete for '
     *          '${result.details.shipping.contact.givenName} '
     *          '${result.details.shipping.contact.familyName}');
     *    }
     *
     *    if (result.status === "CANCEL"){
     *       alert('Buyer cancelled the tokenization');
     *    }
     *  }
     *  catch (e){
     *    // Something went wrong
     *    console.error(e)
     *  }
     * }
     * @throws {UnexpectedError} ApplePay failed to initialize for unknown reasons.
     * @throws {TokenizationError} The payment request could not be tokenized.
     */
    tokenize(): Promise<TokenResult>;
    /**
     * Destroys the ApplePay payment method. The attached element is emptied and all event listeners are removed.
     *
     * @returns {Promise} A promise which resolves when the ApplePay instance is destroyed
     * @example
     * await applePay.destroy();
     */
    destroy(): Promise<void>;
}
export { ApplePay };
