/** The background color of the Sushi Pay button */
declare enum SushiPayButtonColor {
    /** Black background is set by default */
    DEFAULT = "default",
    /** Black background */
    BLACK = "black",
    /** White background */
    WHITE = "white"
}
/**
 * Union of [SushiPayButtonColor]
 */
declare type SushiPayButtonColorValues = `${SushiPayButtonColor}`;
/**
 * The sizing method used by the SDK to set the size of the Sushi Pay button
 * when rendered
 */
declare enum SushiPayButtonSizeMode {
    /** Set rendered size to value set in code */
    STATIC = "static",
    /** Set rendered size to a percent of form size */
    FILL = "fill"
}
/**
 * Union of [SushiPayButtonSizeMode]
 */
declare type SushiPayButtonSizeModeValues = `${SushiPayButtonSizeMode}`;
/**
 * The Sushi Pay button width choices
 */
declare enum SushiPayButtonType {
    /** Render a long version of the Sushi Pay button */
    LONG = "long",
    /** Render the short version */
    SHORT = "short"
}
/**
 * Union of [SushiPayButtonType]
 */
declare type SushiPayButtonTypeValues = `${SushiPayButtonType}`;
/**
 * Sushi Pay shipping address errors
 */
declare enum SushiPayAddressErrorReason {
    PAYMENT_METHOD_DESTROYED = "PAYMENT_METHOD_DESTROYED",
    /** The shipping agent does not deliver to this area */
    SHIPPING_ADDRESS_UNSERVICEABLE = "SHIPPING_ADDRESS_UNSERVICEABLE",
    /** The shipping address is invalid */
    SHIPPING_ADDRESS_INVALID = "SHIPPING_ADDRESS_INVALID"
}
export { SushiPayButtonColor, SushiPayButtonColorValues, SushiPayButtonSizeMode, SushiPayButtonSizeModeValues, SushiPayButtonType, SushiPayButtonTypeValues, SushiPayAddressErrorReason, };
