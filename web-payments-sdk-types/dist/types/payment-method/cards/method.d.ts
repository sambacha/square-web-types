import { PaymentMethod, SqEvent, TokenResult } from '../payment-method-types';
import { CardFieldNamesValues, CardInputEventTypesValues } from './enum';
import { CardInputEvent, CardOptions } from './types';
/**
 * The credit or debit card payment method
 *
 * An object that has the methods to create and set up a single card payment.
 * Created by `payments.card()`.
 *
 * Note: The Card payment method automatically infers whether to display the
 * postal code field and prompt based on the issuing country of the buyer
 * payment card.
 *
 * @example
 * const payments = Square.payments(appId, locationId);
 * const card = await payments.card();
 * await card.attach('#card');
 * const form = document.querySelector('#card-payment');
 * form.addEventListener('submit', async (event) => {
 *    event.preventDefault();
 *    const result = await card.tokenize(); // the card nonce
 * });
 */
interface Card extends PaymentMethod {
    /**
     * Set field input style and behavior of the card payment input fields.
     * For more information about customizing the card form, see available [CardOptions](https://developer.squareup.com/reference/sdks/web/payments/objects/CardOptions).
     * @param {CardOptions} options Input field configuration and style options
     * @example
     * const cardOptions = {
     *    "postalCode": "12345",
     *    "style": {
     *      "input": {
     *        "color": "red",
     *      },
     *      // You can use media queries with valid selectors:
     *      "@media screen and (max-width: 600px)": {
     *        "input": {
     *           "fontSize": "12px",
     *        }
     *      }
     *    }
     * }
     *
     * await card.configure(cardOptions);
     *
     * @throws {PaymentMethodNotAttachedError} `Card` is not attached to a DOM element yet.
     * @throws {UnexpectedError} An unexpected SDK error has occurred
     */
    configure(options: CardOptions): Promise<void>;
    /**
     * Destroys the card payment object. The attached element is emptied and all event listeners are removed.
     * @example
     * const destroyed = await card.destroy();
     */
    destroy(): Promise<boolean>;
    /**
     * Attaches the Card form to the page.
     *
     * @example
     * await card.attach('#elementId');
     *
     * @param selectorOrElement - A valid selector or HTMLElement of an empty <div> or <span>
     * where the Card form will be inserted.
     * @returns completedPromise - A promise that resolves when the button has attached to the page
     *
     * @throws {PaymentMethodAlreadyAttachedError} `Card` is already attached to a DOM element
     * @throws {UnexpectedError} An unexpected SDK error has occurred
     */
    attach(selectorOrElement: string | HTMLElement): Promise<void>;
    /**
     * Recalculates the size of the card form.
     *
     * The Card component normally automatically resizes based on the size of the buyer's browser,
     * however if the Card component is contained with an element that has a computed style property
     * of "display: none", then the Card component will no longer have a defined width and therefore
     * will not properly resize between mobile and desktop configurations. Upon being displayed again,
     * the Card component will not automatically update its size to match the browser window.
     *
     * This method recalculateSize() can be used to handle this edge case by forcing the Card
     * component to recalculate its size and display appropriately for mobile or desktop.
     *
     * @example
     * card.recalculateSize()
     *
     * @throws {PaymentMethodNotAttachedError} `Card` is has not been attached to a DOM element
     */
    recalculateSize(): void;
    /**
     * Sets the DOM focus of one of the input fields within the credit card form.
     * @param {CardFieldNamesValues} field The Field to focus.
     *   For more details about the available options, see [CardFieldNames](https://developer.squareup.com/reference/sdks/web/payments/enums/CardFieldNames).
     * @throws {InvalidFieldNameError} the specified field name is invalid
     */
    focus(field: CardFieldNamesValues): Promise<boolean>;
    /**
     * Adds an event listener to the instance of the Card element.
     * Provides specific typings related to card element events.
     * @param {CardInputEventTypesValues} eventType The card entry event type to listen for.
     *   For more details about the available options, see [CardInputEventTypes](https://developer.squareup.com/reference/sdks/web/payments/enums/CardInputEventTypes).
     * @param {(event: SqEvent<CardInputEvent>) => void} callback The method that is invoked on the callback
     * @example
     * const callback = async (cardInputEvent) => {
     *   alert(`Card brand changed to ${cardInputEvent.detail.cardBrand}`);
     * };
     * card.addEventListener("cardBrandChanged", callback);
     */
    addEventListener(eventType: CardInputEventTypesValues, callback: (event: SqEvent<CardInputEvent>) => void): void;
    /**
     * Removes an event listener from the instance of the Card element.
     * Provides specific typings related to card element events.
     * @param {CardInputEventTypesValues} eventType The event to stop listening for.
     *   For more details about the available options, see [CardInputEventTypes](https://developer.squareup.com/reference/sdks/web/payments/enums/CardInputEventTypes).
     * @param {(event: SqEvent<CardInputEvent>) => void} callback The method that is invoked on the callback
     * @example
     * card.removeEventListener("cardBrandChanged", callback);
     */
    removeEventListener(eventType: CardInputEventTypesValues, callback: (event: SqEvent<CardInputEvent>) => void): void;
    /**
     * Tokenizes the card payment and returns a nonce.
     * @returns {Promise<TokenResult>}
     * @throws TokenizationError if tokenization fails
     * @example
     * const form = document.querySelector('#card-payment');
     *    form.addEventListener('submit', async (event) => {
     *    event.preventDefault();
     *    const result = await card.tokenize(); // the card nonce
     *    if (result.status == "OK") {
     *      alert(`Card: ${result.details.card.brand} -
     *        ${result.details.card.type} ${result.details.card.last4} charged successfully.`);
     *    }
     *    if (result.status == "INVALID") {
     *      result.errors.forEach(error => {
     *        console.log(`ValidationError: ${result.errors[0].field}: ${result.errors[0].message}`);
     *      })
     *    }
     * });
     * @throws {PaymentMethodNotAttachedError} `Card` is not attached to a DOM element yet.
     * @throws {TokenizationError} Tokenization of the payment card failed.
     */
    tokenize(): Promise<TokenResult>;
}
export { Card };
