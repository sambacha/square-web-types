import { SqError } from './types';
/**
 * Thrown when a script tag injecting a global fails to load the global.
 */
export declare class ScriptLoaderError extends SqError {
    /**
     * @param {string} windowProperty - The global property on window that the script is mean to set
     * @param {string} scriptSource - The script tag's src property
     */
    constructor(windowProperty: string, scriptSource: string);
}
