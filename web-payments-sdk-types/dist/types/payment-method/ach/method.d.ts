import { AchTokenOptions, PaymentMethod, SqEvent, TokenResult } from '../payment-method-types';
/**
 * The ACH Payment Method
 *
 * Initiate ACH transfers by allowing the buyer to choose their bank and enter
 * their bank credentials in a Plaid form.
 *
 * @example
 * const ach = await payments.ach()
 *
 * const achButton = document.getElementById('ach-button')
 * const buyerNameField = document.getElementById('buyer-name-field');
 * achButton.onclick = () => {
 *   try {
 *     const result = ach.tokenize({ accountHolderName: buyerNameField.value });
 *     // Process payment with result.token
 *   }
 *   catch (e) {
 *   }
 * }
 */
interface ACH extends PaymentMethod {
    /**
     * Trigger the ACH authentication flow.
     * Use the token returned to process the payment on your server.
     * Note: If the buyer cancels by closing the Plaid window without completing the
     * transaction, an exception is thrown.
     *
     * @example
     * const achButton = document.getElementById('ach-button')
     * const buyerNameField = document.getElementById('buyer-name-field');
     * achButton.onclick = () => {
     *   try {
     *     const result = await ach.tokenize({
     *       accountHolderName: 'Bryce'
     *     });
     *
     *     if (result.status === "OK") {
     *        alert (`Tokenization succeeded: ${result.token}.` )
     *     }
     *
     *     if (result.status === "CANCEL") {
     *        alert(`The buyer abandoned the tokenization flow.`);
     *     }
     *   }
     *   catch (e){
     *     // Something went wrong
     *     alert(`${e.name} ${e.message}`);
     *   }
     * }
     * @throws {PlaidUninitializedError} The plaid handler was not initialized correctly
     * @throws {PlaidMissingNameError} `{ accountHolderName: string }` is a required parameter
     * @throws {TokenizationError} The bank transfer request could not be tokenized
     */
    tokenize(options: AchTokenOptions): Promise<TokenResult>;
    /**
     * Destroys the ACH payment method. The attached element is emptied and all event listeners are removed.
     *
     * @returns {Promise} A promise which resolves when the ACH instance is destroyed
     * @example
     * await ach.destroy();
     */
    destroy(): Promise<void>;
    /**
     * Adds an event listener to the instance of ach.
     * See the Plaid documentation for supported event types and expected metadata.
     * https://plaid.com/docs/#onevent-callback
     * @param {string} eventType The Plaid event type to listen for
     * @param {(event: unknown) => void} callback The method that is invoked on the callback
     * @example
     * const callback = async (metadata) => {
     *   alert(`Buyer searched for an institution using query ${metadata.institution_search_query}`);
     * };
     * ach.addEventListener("SEARCH_INSTITUTION", callback);
     */
    addEventListener(eventType: string, callback: (event: SqEvent) => void): void;
    /**
     * Removes an event listener from the instance of ach.
     * @param {string} eventType The Plaid event type to stop listening for
     * @param {(event: unknown) => void} callback The method that is invoked on the callback
     * @example
     * ach.removeEventListener("SEARCH_INSTITUTION", callback);
     */
    removeEventListener(eventType: string, callback: (event: SqEvent) => void): void;
}
export { ACH };
