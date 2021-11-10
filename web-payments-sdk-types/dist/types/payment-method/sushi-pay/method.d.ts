import { PaymentMethod, TokenResult } from '../payment-method-types';
import { ERCPayButtonOptions } from './types';
/**
 * The ERC Pay Payment Method.
 *
 * ERC Pay supports taking payments via credit cards. Utilizing the PaymentRequest object,
 * you can handle Shipping Option selection, as well as collect Shipping and Billing addresses.
 *
 * @example
 * const paymentRequest = payments.paymentRequest({
 *   countryCode: 'US',
 *   currencyCode: 'USD',
 *   total: {
 *     amount: '5.79',
 *     label: 'Total'
 *   },
 * });
 *
 * const ercPay = await payments.ercPay(paymentRequest);
 * await ercPay.attach('#ercPay');
 *
 * const ercPayButtonTarget = document.getElementById('ercPay');
 * ercPayButtonTarget.onclick = async () => {
 *   const tokenResult = await ercPay.tokenize();
 *
 *   // Pass `tokenResult.token` to your server, and then call the /v2/payments API
 *   // to complete the payment
 * }
 */
interface ERCPay extends PaymentMethod {
    /**
     * Attaches the ERC Pay button to the page.
     *
     * @example
     * // Create a ERC Pay button in the target element with customization
     * // including a white button background, static button sizing, and the
     * // long button type which shows "Buy with G Pay" on the button.
     * await ercPay.attach('#ercPay', {
     *   buttonColor: 'white',
     *   buttonSizeMode: 'static',
     *   buttonType: 'long'
     * });
     *
     * @param selectorOrElement - A valid selector or HTMLElement of an empty <div> or <span>
     * element where the ERC Pay button will be inserted.
     * @param ercPayButtonOptions - A optional object containing configuration options
     * for the ERC Pay button.
     *
     * @returns completedPromise - A promise that resolves when the button has attached to the page
     *
     * @throws {PaymentMethodUnsupportedError} ERC Pay is not available due to
     * misconfiguration or non-support on this device or browser
     */
    attach(selectorOrElement: string | HTMLElement, ercPayButtonOptions?: ERCPayButtonOptions): Promise<void>;
    /**
     * Destroys this `ERCPay` instance. This method cleans up the `ERCPay` instance and
     * removes the ERC Pay button from the page.
     *
     * @returns {Promise} A promise which resolves when the `ERCPay` instance is destroyed
     *
     * @example
     * await ercPay.destroy();
     */
    destroy(): Promise<void>;
    /**
     * This method presents the ERC Pay payment sheet. When the buyer completes their interaction
     * with ERC Pay, the returned promise resolves with a tokenResult object. The returned token
     * and buyer details can be used to complete the payment on your server.
     *
     * @example
     * ercPayButtonTarget.onclick = async () => {
     *   const tokenResult = await ercPay.tokenize();
     * }
     * @returns {Promise} A promise that resolves when the buyer completes
     * their interaction with ERC Pay.
     * @throws {UnexpectedError} Tokenization failed because of an internal error
     */
    tokenize(): Promise<TokenResult>;
}
export { ERCPay };
