import { BillingContact, ShippingContact } from '../contact';
import { CurrencyCodeValue } from '../money';
import { AchBankAccountDetails } from './ach/types';
import { CardDetails } from './cards/types';
import { GiftCardDetails } from './gift-card/types';
/** The payment methods accepted by the SDK */
declare enum MethodType {
    /** Apple Pay */
    APPLE_PAY = "Apple Pay",
    /** Credit or debit card */
    CARD = "Card",
    /** Sushi Pay */
    SUSHI_PAY = "Sushi Pay",
    /**
     * @hidden
     */
    CASH_APP = "Cash App",
    /** Google Pay */
    GOOGLE_PAY = "Google Pay",
    /** Gift Card */
    GIFT_CARD = "Gift Card",
    /** Automated clearing house (ACH) bank transfer*/
    ACH = "ACH"
}
/**
 * Digital Wallet shipping option choice
 *
 * The object used to set a product shipping option choice for the
 * buyer in a digital wallet payment such as Apple Pay or Google Pay
 * @example
 * const shippingOption1 = {
 *    "amount": "1.00",
 *    "id": "1",
 *    "label": "UPS Ground"
 * }
 */
interface ShippingOption {
    /**
     * A unique ID to reference the shipping option.
     */
    id: string;
    /**
     * A short description of this shipping option.
     *
     * Displayed in the Apple Pay and Google Pay payment sheets.
     */
    label: string;
    /**
     * The amount of this shipping option.
     *
     * Given as a string representation of a float with two decimal places
     * (e.g., `"15.00"`).
     *
     * Use `"0.00"` to indicate free or no cost.
     */
    amount: string;
}
/**
 * A single line item in an Apple Pay or Google Pay payment request
 *
 * Line items are optional and can be included in a payment request when there
 * are calculated charges such as taxes and shipping charges added on to a
 * purchase.
 * @example
 * {
 *   "label": "Shipping charges",
 *   "amount": "15.69",
 *   "pending": true
 * }
 */
interface LineItem {
    /**
     * The total amount of the line item. An amount is given as a string representation
     * float with two decimal places (e.g., `"15.00"`).
     *
     * This is typically the cost of an item or service, or additional charge
     * (e.g., taxes, shipping). Use `"0.00"` to indicate free or no cost, and
     * negative values to indicate discounts, etc.
     *
     * If the line item is a payment `total`, this is the total charge of the
     * payment and should equal the sum of the line items.
     */
    amount: string;
    /**
     * @hidden
     * @deprecated
     * An internal ID, such as a SKU, for the item.
     */
    id?: string;
    /**
     * @hidden
     * @deprecated
     * URL for an image of the item.
     *
     * This field does not apply to Apple Pay or Google Pay.
     */
    imageUrl?: string;
    /**
     * Description or purpose of the line item. This is typically the name of the
     * item or service purchased. If the line item is a payment `total`, the label
     * is instead the merchant name.
     */
    label: string;
    /**
     * Indicates whether the value in the `amount` field represents an estimated
     * or unknown cost.
     *
     * Default: `false`
     *
     * If the line item is a payment `total` and any other line item is pending,
     * the total must also be pending.
     *
     * **Notes**
     * - Apple Pay displays pending line items with an amount of `"pending"`
     * instead of the `amount` value.
     * - Google Pay does not display pending line items.
     */
    pending?: boolean;
    /**
     * @hidden
     * @deprecated
     * URL for the item's product page.
     *
     * This field does not apply to Apple Pay or Google Pay.
     */
    productUrl?: string;
}
/**
 * The payments.paymentRequest method argument
 *
 * This object contains the details of a payment request including line items,
 * shipping contact and options, and total payment request.
 *
 * @example
 * const paymentRequestOptions = {
 *    "countryCode": "US",
 *    "currencyCode": "USD",
 *    "lineItems": [
 *      {
 *        "amount": "22.15",
 *        "label": "Item to be purchased",
 *        "pending": true
 *      }
 *    ],
 *    "requestBillingContact": false,
 *    "requestShippingContact": false,
 *    "shippingOptions"[
 *      {
 *        "label": "Next Day",
 *        "amount": "15.69",
 *        "id": "1"
 *      },
 *      {
 *        "label": "Three Day",
 *        "amount": "2.00",
 *        "id": "2"
 *      }
 *    ],
 *    // pending is only required if it's true.
 *    "total": {
 *      "amount": "41.79",
 *      "label": "Total",
 *    },
 * };
 */
interface PaymentRequestOptions {
    /**
     * Required: two-letter ISO 3166-1 country code of the merchant.
     */
    countryCode: string;
    /**
     * Required: two-letter ISO 4217 country currency code
     */
    currencyCode: CurrencyCodeValue;
    /**
     * @hidden
     * @deprecated
     * Optional: Details of line items related to discounts.
     */
    discounts?: LineItem[];
    /**
     * Optional: Details line items.
     */
    lineItems?: LineItem[];
    /**
     * Optional: defaults to false. Requests the buyer to provide billing contact
     * information
     */
    requestBillingContact?: boolean;
    /**
     * Optional: defaults to false. Requests the buyer to provide shipping contact
     * information
     */
    requestShippingContact?: boolean;
    /**
     *
     * Pre set the shipping contact
     */
    shippingContact?: ShippingContact;
    /**
     * @hidden
     * @deprecated
     * Optional: Details of shipping related line items.
     */
    shippingLineItems?: LineItem[];
    /**
     * Optional: Shows a set of shipping options to the buyer
     */
    shippingOptions?: ShippingOption[];
    /**
     * @hidden
     * @deprecated
     * Optional: Details of tax related line items.
     */
    taxLineItems?: LineItem[];
    /**
     * Required: Total amount of purchase including line item amounts.
     */
    total: LineItem;
}
/** The events that can be invoked on payment methods that take a PaymentRequest object*/
declare enum PaymentRequestEvent {
    /**
     * Occurs when the buyer chooses a shipping address.
     *
     * Subscribe to this event in order to update the payment request when the
     * shipping address changes.
     *
     * ```js
     * req.addEventListener('shippingcontactchanged', (contact) => {
     *   const lineItems = [ ... ]
     *   const total = { ... }
     *   return { lineItems, total };
     * })
     * ```
     */
    SHIPPING_CONTACT_CHANGED = "shippingcontactchanged",
    /**
     * Occurs when the buyer chooses a shipping option.
     *
     * Subscribe to this event in order to update the payment request when the
     * shipping option changes.
     *
     * ```js
     * req.addEventListener('shippingoptionchanged', (option) => {
     *   const lineItems = [ ... ]
     *   const total = { ... }
     *   return { lineItems, total };
     * })
     * ```
     */
    SHIPPING_OPTION_CHANGED = "shippingoptionchanged"
}
/**
 * Union of [PaymentRequestEvent](https://developer.squareup.com/reference/sdks/web/payments/enums/PaymentRequestEvent) values
 */
declare type PaymentRequestEventValue = `${PaymentRequestEvent}`;
/**
 * Details about digital wallet shipping address errors
 *
 * `ShippingErrors` provides the address field whose value is in error and
 *  the details of the error. Each `ShippingError` object describes one address
 * field with its corresponding error.
 * @example
 *  const shippingErrors = {
 *    postalCode: 'A valid US Zip Code is required. Please check and try again.'
 * }
 */
interface ShippingErrors {
    /**
     * Indicate the address lines are not valid.
     */
    addressLines?: string;
    /**
     * Indicate the city/locality is not valid.
     */
    city?: string;
    /**
     * Indicate the state/province/region is not valid.
     */
    state?: string;
    /**
     * Indicate the postal code is not valid.
     */
    postalCode?: string;
    /**
     * Indicate the country is not valid.
     */
    country?: string;
}
/**
 * Interface that describes the object argument of the `paymentRequest.addEventListener` method
 * return value.
 *
 * Use this interface to create an object that contains payment request
 * properties that are to be updated in the digital wallet payment sheet after
 * recalculating fees or catching buyer input errors.
 * @example
 * req.addEventListener('shippingcontactchanged', (contact) => {
 *   const shippingErrors = "shippingErrors": {
 *       "addressLines": "1234 Nth Main Street",
 *       "city": "New Bork",
 *       "country": "XSA",
 *       "postalCode": "9468x",
 *       "MY"
 *   };
 *   const total = "total": "412.00";
 *   return { shippingErrors, total };
 * });
 *
 */
interface PaymentRequestUpdate {
    /**
     * Allows for an error message when a valid shipping address is not usable.
     *
     * If the shipping address is valid but the item cannot be shipped there,
     * use this field to provide an appropriate error message to the buyer.
     *
     * ```js
     * req.addEventListener('shippingcontactchange', (contact) => {
     *   if (contact.countryCode !== 'US') {
     *     return { error: 'Unfortunately, we only ship to US addresses.'};
     *   }
     * }
     * ```
     *
     * @category Error
     */
    error?: string;
    /**
     * Allows for more granular messages when a shipping address is not valid.
     *
     * @category Error
     */
    shippingErrors?: ShippingErrors;
    /**
     * Replaces the current list of line items.
     *
     * @category Payment Request
     */
    lineItems?: LineItem[];
    /**
     * Replaces the current total.
     *
     * The sum of the amounts of the line items must equal the total.
     *
     * @category Payment Request
     */
    total?: LineItem;
    /**
     * Replaces the current list of shipping options.
     *
     * Typically used in response to the buyer choosing a new shipping address.
     *
     * @category Payment Request
     */
    shippingOptions?: ShippingOption[];
    /**
     * @hidden
     * @deprecated
     * Replaces the current list of tax line items.
     *
     * The most common updates are to sales tax amounts, based on
     * the buyer's shipping address.
     *
     * @category Payment Request
     */
    taxLineItems?: LineItem[];
    /**
     * @hidden
     * @deprecated
     * Replaces the current list of shipping line items.
     *
     * The most common updates are to shipping costs, based on
     * the buyer's shipping address and chosen shipping option.
     *
     * @category Payment Request
     */
    shippingLineItems?: LineItem[];
    /**
     * @hidden
     * @deprecated
     * Replaces the current list of discount related line items.
     *
     * @category Payment Request
     */
    discounts?: LineItem[];
}
/**
 * Represents validation errors in specific parts of a shipping address.
 *
 * Only the fields representative of the address parts in error should be given
 * with a string value describing the error and how the buyer can resolve it.
 *
 * ```js
 * req.addEventListener('shippingcontactchange', (contact) => {
 *   // Assume `validZip` returns a boolean indicating whether its argument
 *   // is a valid US Zip Code.
 *   if (!validZip(contact.postalCode)) {
 *     const shippingErrors = {
 *       postalCode: 'A valid US Zip Code is required. Please check and try again.'
 *     }
 *     return { shippingErrors }
 *   }
 *
 *   ...
 * })
 */
/**
 * Update the payment request with new information.
 *
 * Found as an argument of, and called in response to, a [[PaymentRequestEvent]].
 */
declare type PaymentRequestUpdater = (update: PaymentRequestUpdate) => void;
/**
 * Callback function of the [[PaymentRequestEvent.SHIPPING_CONTACT_CHANGED|`shippingcontactchanged`]] event.
 */
declare type ShippingContactCallback = (contact: ShippingContact) => PaymentRequestUpdate | Promise<PaymentRequestUpdate>;
/**
 * Callback function of the [[PaymentRequestEvent.SHIPPING_OPTION_CHANGED|`shippingoptionchanged`]] event.
 */
declare type ShippingOptionCallback = (option: ShippingOption) => PaymentRequestUpdate | Promise<PaymentRequestUpdate>;
/**
 * An appropriate callback function for the event subscription.
 */
declare type PaymentRequestCallback = ShippingContactCallback | ShippingOptionCallback;
/**
 * @internal
 */
declare class SqEvent<T = any> {
    readonly type: string;
    readonly detail: T;
    constructor(type: string, detail: T);
}
/**
 * @internal
 */
interface SqEventListener {
    (event: SqEvent): void;
}
declare enum TokenStatus {
    /**
     * Indicates an unknown tokenization status.
     */
    UNKNOWN = "Unknown",
    /**
     * Indicates tokenization was successful.
     */
    OK = "OK",
    /**
     * Indicates tokenization was not successful.
     */
    ERROR = "Error",
    /**
     * Indicated validation has failed during tokenization
     */
    INVALID = "Invalid",
    /**
     * Indicates tokenization was aborted.
     */
    ABORT = "Abort",
    /**
     * Indicates tokenization was cancelled by the user.
     */
    CANCEL = "Cancel"
}
/**
 * Details object of an error that occurred while attempting to tokenize.
 */
interface TokenErrorDetails {
    /**
     * Type of error thrown.
     */
    type: string;
    /**
     * Error message.
     */
    message: string;
    /**
     * Particular field that caused the error, if applicable. E.g. Card Number
     */
    field?: string;
}
/**
 * Digital wallet shipping contact information and the shipping options

 * The shipping contact information and the product shipping options that are
 * offered to a buyer in a digital payment method such as Apple Pay or Google Pay
 * @example
 * const shippingDetails = {
 *   "contact": {"givenName": "John",
 *      "familyName": "Doe",
 *      "addressLines": [
 *         "123 East Main Street",
 *         "#111"
 *      ],
 *      "city": "Seattle",
 *      "state": "WA",
 *      "postalCode": "98111",
 *      "countryCode": "USA",
 *      "email": "johndoe@example.com",
 *      "phone": "+12065551212"
 *   },
 *   "option": {
 *     "amount": "1.00",
 *     "id": "1",
 *     "label": "UPS Ground"
 *   }
 * }
 */
interface ShippingDetails {
    /**
     * The shipping contact information for the token.
     */
    contact?: ShippingContact;
    /**
     * The shipping option for the token.
     */
    option?: ShippingOption;
}
/**
 * Details about the payment card used to create a payment token
 *
 * `TokenDetails` provides the payment card information needed to match a token
 * returned by the SDK with payment card information input by a buyer.
 * @example
 * try {
 *   const result = await card.tokenize();
 *   alert(`Payment for  ${result.details.card.brand},
 *     number ${result.details.card.last4}
 *     expiration year ${result.details.card.expYear} was processed`);
 * } catch (e) {
 *     e.errorList.forEach(err => {
 *       const li = document.createElement('li');
 *       li.innerText = err.message;
 *       document.querySelector('#errors').appendChild(li);
 *     });
 * }
 */
interface TokenDetails {
    /**
     * Additional information about a tokenized bank account.
     */
    bankAccount?: AchBankAccountDetails;
    /**
     * Additional information about a tokenized card.
     */
    card?: CardDetails;
    /**
     * Additional information about a tokenized gift card.
     */
    giftCard?: GiftCardDetails;
    /**
     * @internal
     *
     * Additional information about a Cash App token.
     */
    cashApp?: {
        cashtag: string;
        transactionId: string;
    };
    /**
     * Identifies the payment method that created the token.
     */
    method: MethodType;
    /**
     * Additional information about shipping.
     */
    shipping?: ShippingDetails;
    /**
     * Cardholder billing information.
     *
     * The information available depends on the payment method used, and on
     * specific circumstances of the payment method.
     *
     * For the Card payment method:
     *
     * If the buyer fills the postal code field in the card form, the postal
     * code will be given back in the billing object. Otherwise it will be empty.
     *
     * For Digital Wallet payment methods:
     *
     * The billing details given by the buyer will be populated in the billing object. Note
     * that the amount of the data in this object may change depending on whether
     * [requestBillingContact](https://developer.squareup.com/reference/sdks/web/payments/objects/PaymentRequestOptions#PaymentRequestOptions.requestBillingContact)
     * is set to true or false in [paymentRequestOptions](https://developer.squareup.com/reference/sdks/web/payments/objects/PaymentRequestOptions) when creating
     * a [paymentRequest](https://developer.squareup.com/reference/sdks/web/payments/objects/PaymentRequest).
     *
     * @category Situational
     */
    billing?: BillingContact;
}
/**
 * Defines an ACH payment options object
 * @example
 * const achPaymentOptions = {
 *    "accountHolderName": "John Doe"
 * }
 */
interface AchTokenOptions {
    /** Given name and surname of the bank account holder */
    accountHolderName: string;
}
/**
 * Optional parameters provided to the Card payment `tokenize` method
 *
 * Use `CardTokenOptions` to provide a billing contact when required by
 * the seller.
 * @example
 * const billingContact = {
 *   addressLines: ['555 Maple Street', '#222'],
 *   city: 'Seattle',
 *   countryCode: 'US',
 *   email: 'johndoe@example.com',
 *   familyName: 'Doe',
 *   givenName: 'john',
 *   phone: '2065551212',
 *   postalCode: '98539',
 *   state: 'WA',
 * }
 */
interface CardTokenOptions {
    /** The buyer to be billed */
    billing: BillingContact;
}
declare type TokenError = TokenErrorDetails | Error;
/**
 * The result of a request to tokenize a payment card
 *
 * The `TokenResult` carries the status of the request, resulting token, any
 * errors, and details about the payment card used.
 */
interface TokenResult {
    /**
     * Indicates whether the tokenization request was successful.
     */
    status: TokenStatus;
    /**
     * Errors that occurred while attempting to tokenize.
     */
    errors?: TokenError[];
    /**
     * Payment token representing tokenized payment information; for use with
     * relevant Square APIs and buyer verification.
     */
    token?: string;
    /**
     * Additional details about the token.
     */
    details?: TokenDetails;
}
/**
 * @internal
 */
interface PaymentMethod {
    /**
     * @internal
     */
    addEventListener(type: string, listener: SqEventListener): void;
    /**
     * @internal
     */
    removeEventListener(type: string, listener: SqEventListener): void;
    /**
     * @internal
     */
    destroy(): Promise<boolean | void>;
}
export { LineItem, MethodType, PaymentMethod, PaymentRequestCallback, PaymentRequestEvent, PaymentRequestEventValue, PaymentRequestOptions, PaymentRequestUpdater, PaymentRequestUpdate, ShippingContactCallback, ShippingErrors, ShippingOptionCallback, ShippingOption, SqEvent, SqEventListener, TokenResult, TokenError, CardTokenOptions, AchTokenOptions, TokenDetails, ShippingDetails, TokenStatus, };
