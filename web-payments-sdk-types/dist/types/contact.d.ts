/**
 * A buyer
 *
 * The `Contact` includes contact information about the buyer.
 * @example
 * const buyer = {
 *    "givenName": "John",
 *    "familyName": "Doe",
 *    "addressLines": [
 *       "123 East Main Street",
 *       "#111"
 *    ],
 *    "city": "Seattle",
 *    "state": "WA",
 *    "postalCode": "98111",
 *    "countryCode": "USA"
 * }
 */
interface Contact {
    /**
     * First/given name.
     *
     * For mononyms and other such names, provide the full name as `givenName`.
     */
    givenName?: string;
    /**
     * Last/family name.
     */
    familyName?: string;
    /**
     * Street address lines.
     */
    addressLines?: string[];
    /**
     * City/locality name.
     */
    city?: string;
    /**
     * State/province/region name.
     */
    state?: string;
    /**
     * Postal code.
     */
    postalCode?: string;
    /**
     * Two-letter ISO 3166-1 country code.
     */
    countryCode?: string;
}
declare type BillingContact = Contact;
/**
 * A digital wallet shipping contact
 *
 * `ShippingContact` contains name, address, email, and contact phone information
 * to be shown in a digital wallet payment form.
 * @example
 * const buyer = {
 *    "givenName": "John",
 *    "familyName": "Doe",
 *    "addressLines": [
 *       "123 East Main Street",
 *       "#111"
 *    ],
 *    "city": "Seattle",
 *    "state": "WA",
 *    "postalCode": "98111",
 *    "countryCode": "USA",
 *    "email": "johndoe@example.com",
 *    "phone": "+12065551212"
 * }
 */
interface ShippingContact extends Contact {
    /**
     * Email address.
     */
    email?: string;
    /**
     * Telephone number.
     */
    phone?: string;
}
export { BillingContact, ShippingContact };
