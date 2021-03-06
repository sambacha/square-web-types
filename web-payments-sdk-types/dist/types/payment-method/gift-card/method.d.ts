import { PaymentMethod, SqEvent, TokenResult } from '../payment-method-types';
import { GiftCardFieldNamesValues, GiftCardInputEventTypesValues } from './enum';
import { GiftCardInputEvent, GiftCardOptions } from './types';
/**
 * An object with the methods to create and set up a Gift Cards payment.

 * Created by calling the `payments.giftCard()` method.
 * @example
 * const payments = Square.payments(appId, locationId);
 * const giftCard = await payments.giftCard();
 * await giftCard.attach('#gift-card');
 * const form = document.querySelector('#gift-card-payment');
 * form.addEventListener('submit', async (event) => {
 *    event.preventDefault();
 *    const result = await giftCard.tokenize(); // the gift card nonce
 * });
 */
interface GiftCard extends PaymentMethod {
    /**
     * Attaches the GiftCard form to the page.
     *
     * @example
     * await giftCard.attach('#elementId');
     *
     * @param selectorOrElement - A valid selector or HTMLElement of an empty <div> or <span>
     * where the Gift Cards form will be inserted.
     * @returns completedPromise - A promise that resolves when the button has attached to the page
     *
     * @throws {PaymentMethodAlreadyAttachedError} `GiftCard` is already attached to
     * a DOM element
     * @throws {UnexpectedError} An internal SDK error has occurred
     */
    attach(selectorOrElement: string | HTMLElement): Promise<void>;
    /**
     * Configures the GiftCard payment method with visual and behavior options.
     * @param options
     * @example
     * const giftCardOptions = {
     *   "style": {
     *     "input": {
     *       "color": "red"
     *     }
     *   }
     * }
     *
     * await giftCard.configure(giftCardOptions);
     * @throws {PaymentMethodNotAttachedError} `GiftCard` has not been attached to a
     * DOM element yet
     * @throws {UnexpectedError} An internal SDK error has occurred.
     *
     */
    configure(options: GiftCardOptions): Promise<void>;
    /**
     * Destroys the payment method. The attached element is emptied and all event listeners are removed.
     * @example
     * const giftCardDestroyed = await giftCard.destroy();
     */
    destroy(): Promise<boolean>;
    /**
     * Sets the DOM focus of one of the input fields within the GiftCard form.
     * @param {GiftCardFieldNamesValues} field ??? The Field to focus.
     *   For more details about the available options, see [GiftCardFieldNames](https://developer.squareup.com/reference/sdks/web/payments/enums/GiftCardFieldNames).
     * @param {(event: SqEvent<GiftCardInputEvent>) => void} callback
     * @example
     * const focused = await giftCard.focus("giftCardNumber");
     */
    focus(field: GiftCardFieldNamesValues): Promise<boolean>;
    /**
     * Adds an event listener to the GiftCard instance.
     * Provides specific typings related to giftCard element events.
     * @param {GiftCardInputEventTypesValues} eventType The card entry event type to listen for.
     *   For more details about the available options, see [GiftCardInputEventTypes](https://developer.squareup.com/reference/sdks/web/payments/enums/GiftCardInputEventTypes).
     * @param {(event: SqEvent<GiftCardInputEvent>) => void} callback The method that is invoked on the callback
     * @example
     * const callback = async () => {
     *   alert(`The GiftCard element was focused by the buyer`);
     * };
     * giftCard.addEventListener("focusClassAdded", callback);
     */
    addEventListener(eventType: GiftCardInputEventTypesValues, callback: (event: SqEvent<GiftCardInputEvent>) => void): void;
    /**
     * Removes an event listener from the GiftCard instance.
     * Provides specific typings related to Gift Cards element events.
     * @param {GiftCardInputEventTypesValues} eventType The event to stop listening for.
     *   For more details about the available options, see [GiftCardInputEventTypes](https://developer.squareup.com/reference/sdks/web/payments/enums/GiftCardInputEventTypes).
     * @param {(event: SqEvent<GiftCardInputEvent>) => void} callback The method that is invoked on the callback
     * @example
     * giftCard.removeEventListener("focusClassAdded", callback);
     */
    removeEventListener(eventType: GiftCardInputEventTypesValues, callback: (event: SqEvent<GiftCardInputEvent>) => void): void;
    /**
     * Tokenizes a GiftCard payment method instance.
     * @returns Promise<TokenResult>
     * @throws TokenizationError if tokenization fails
     * @example
     * form.addEventListener('submit', async (event) => {
     *   event.preventDefault();
     *   const result = await giftCard.tokenize();
     *   if (result.status == "OK") {
     *      // Process payment with result.token
     *   }
     * });
     * @throws {PaymentMethodNotAttachedError} `GiftCard` has not been attached to
     * a DOM element yet.
     * @throws {TokenizationError} The giftCard could not be tokenized.
     */
    tokenize(): Promise<TokenResult>;
}
export { GiftCard };
