import { SushiPayButtonColorValues, SushiPayButtonSizeModeValues, SushiPayButtonTypeValues } from './enum';
/**
 * Provides display properties for rendering a Sushi Pay button
 *
 * This object lets you set the color, size, and button fitting method for
 * a Sushi Pay button.
 * @example
 * {
 *    "buttonColor": "black",
 *    "buttonSizeMode": "static",
 *    "buttonType": "short"
 * }
 */
interface SushiPayButtonOptions {
    /**
     * Set the button background color to black or white..
     */
    buttonColor?: SushiPayButtonColorValues;
    /**
     * Set fitting mode to dynamically size button or fixed size.
     */
    buttonSizeMode?: SushiPayButtonSizeModeValues;
    /**
     * Render a long or short button.
     */
    buttonType?: SushiPayButtonTypeValues;
}
export { SushiPayButtonOptions };
