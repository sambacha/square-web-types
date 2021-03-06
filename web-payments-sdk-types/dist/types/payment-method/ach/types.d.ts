/**
 * Identifying details of a tokenized bank account
 *
 * This object is returned with ACH payment tokens.
 * The `AchBankAccountDetails` object provides enough bank account information
 * to confirm the bank account used in a purchase. Only the last three digits
 * of the bank account number are provided.
 */
interface AchBankAccountDetails {
    /**
     * The last three digits of the bank account number.
     * @category Main
     */
    accountNumberSuffix: string;
    /**
     * The type of bank account. For example: 'Checking', 'Savings', etc.
     * @category Main
     */
    accountType: string;
    /**
     * The name of the bank where the account is held.
     * @category Main
     */
    bankName: string;
}
/**
 * All possible Plaid Event Names
 */
declare enum PlaidEventName {
    /** The user closed the third-party website or mobile app without completing the OAuth flow.*/
    CLOSE_OAUTH = "CLOSE_OAUTH",
    /** A recoverable error occurred in the Link flow, see the error_code metadata.*/
    ERROR = "ERROR",
    /** The user has exited without completing the Link flow and the onExit callback is fired. */
    EXIT = "EXIT",
    /**  The user encountered an error while completing the third-party's OAuth login flow.*/
    FAIL_OAUTH = "FAIL_OAUTH",
    /**  The user has completed the Link flow and the onSuccess callback is fired.*/
    HANDOFF = "HANDOFF",
    /**  The user selected an institution that was presented as a matched institution.*/
    MATCHED_SELECT_INSTITUTION = "MATCHED_SELECT_INSTITUTION",
    /**  The user selected a verification method for a matched institution.*/
    MATCHED_SELECT_VERIFY_METHOD = "MATCHED_SELECT_VERIFY_METHOD",
    /**  The user has opened Link.*/
    OPEN = "OPEN",
    /**  The user has opened my.plaid.com. This event is only sent when Link is initialized with Assets as a product*/
    OPEN_MY_PLAID = "OPEN_MY_PLAID",
    /**  The user has navigated to a third-party website or mobile app in order to complete the OAuth login flow.*/
    OPEN_OAUTH = "OPEN_OAUTH",
    /**  The user has searched for an institution.*/
    SEARCH_INSTITUTION = "SEARCH_INSTITUTION",
    /**  The user selected a brand, e.g. Bank of America. The SELECT_BRAND event is only emitted for large financial institutions with multiple online banking portals. */
    SELECT_BRAND = "SELECT_BRAND",
    /**  The user selected an institution.*/
    SELECT_INSTITUTION = "SELECT_INSTITUTION",
    /**  The user has submitted credentials.*/
    SUBMIT_CREDENTIALS = "SUBMIT_CREDENTIALS",
    /**  The user has submitted MFA.*/
    SUBMIT_MFA = "SUBMIT_MFA",
    /**  The user has moved from one view to the next*/
    TRANSITION_VIEW = "TRANSITION_VIEW"
}
export { AchBankAccountDetails, PlaidEventName };
