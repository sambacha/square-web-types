import { SqError } from './types';
/**
 * The specified field name is invalid
 */
declare class InvalidFieldNameError extends SqError {
    /**
     * @inheritdoc
     */
    constructor(name: string);
}
/**
 * The specified option name does not exist
 */
declare class InvalidConfigurationPropertyError extends SqError {
    /**
     * @param {string} property - the invalid configuration property
     */
    constructor(property: string);
}
/**
 * The specified option has an invalid value
 */
declare class InvalidConfigurationValueError extends SqError {
    /**
     * @param {string} property - the invalid configuration value
     */
    constructor(property: string, value: string);
}
export { InvalidFieldNameError, InvalidConfigurationPropertyError, InvalidConfigurationValueError, };
