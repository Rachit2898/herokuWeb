export const httpConstants = {
    METHOD_TYPE: {
      POST: "POST",
      PUT: "PUT",
      GET: "GET",
      DELETE: "DELETE",
    },
    CONTENT_TYPE: {
      APPLICATION_JSON: "application/json",
      MULTIPART_FORM_DATA: "multipart/form-data",
      APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
      IMAGE_PNG: "image/png",
    },
    DEVICE_TYPE: {
      WEB: "web",
    },
    API_END_POINT: {
      FORGOT_PASSWORD: "/forgot-password",
      RESET_PASSWORD: "/reset-password",
      GET_USERS_LIST: "/get-user-list",
      INVITE_ADMIN_USER: "/invite-admin-user",
      UPDATE_USER: "/update-user",
      GET_USER: "/user",
      GET_USER_INFO: "/user-info",
  
      INVITE_USER: "/invite-user",
      ACCEPT_USER: "/accept-user",
      REJECT_USER: "/reject-user",
      EXPORT_USER: "/export-user",
      SUBSCRIPTION_PLANS: "/subscription-plan",
      FEEDS: "/feeds",
      GEY_USERS_BY_ROLE: "/get-users-by-role",
  
      POST: "/post",
    },
  };
  
  export const cookiesConstants = {
    USER: "USER",
    SESSION_TOKEN: "SESSION_TOKEN",
    USER_PERMISSION: "USER_PERMISSION",
    AUTH0_ACCESS_TOKEN: "AUTH0_ACCESS_TOKEN",
    USER_DETAIL: "USER_DETAIL",
    USER_SUB: "USER_SUB",
  
    USER_PICTURE: "USER_PICTURE",
    USER_ID: "USER_ID",
    EMAIL_ID: "EMAIL_ID",
    AUTH0_ID_TOKEN: "AUTH0_ID_TOKEN",
    JWT_TOKEN: "JWT_TOKEN",
  };
  
  export const eventConstants = {
    HIDE_LOADER: "HIDE_LOADER",
    SHOW_LOADER: "SHOW_LOADER",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
  };
  
  export const genericConstants = {
    INCORRECT_USERNAME_PASS: "Incorrect username or password",
    ENTER_REQUIRED_FIELD: "Please enter the required information",
    INVALID_EMAIL: "Invalid email",
    PASSWORD_DID_NOT_MATCH: "Both the passwords did not match",
    PASSWORD_UPDATE_SUCCESS: "Your Password has been updated.",
    RESET_PASSWORD_MAIL_SENT: "A reset password email has been sent.",
    PASSWORD_UPDATE_FAILED: "Failed to update your password",
    CANNOT_GET_NOTIFICATIONS: "No notifications",
    CANNOT_CLEAR_NOTIFICATIONS: "No notifications",
    WATCHLIST_DELETED: "WatchList deleted",
    CANNOT_DELETE_WATCHLIST: "Cannot delete watchlist",
    CANNOT_DELETE_TXN_PRIVATE_NOTE: "Cannot delete Txn private notes",
    TXN_PRIVATE_NOTE_DELETED: "Txn Private Note Deleted",
    CANNOT_DELETE_TAGGED_ADDRESS: "Cannot delete Tagged Addresses",
    TAGGED_ADDRESS_DELETED: "Tagged Address Deleted",
  };
  
  export const statusConstants = {
    PENDING: "PENDING",
    INACTIVE: "INACTIVE",
    INVITED: "INVITED",
    ACTIVE: "ACTIVE",
    PUBLISHED: "PUBLISHED",
    REJECTED: "REJECTED",
  };
  
  export const sidebarConstants = {
    USERS: "users",
  };
  export const reduxEvent = {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
  };
  
  export const messages = {
    MARKET_CAP:
      "The total market value of a cryptocurrency's circulating supply. \nMarket Cap = Current Price x Circulating Supply.",
    CIRCULATING_SUPPLY:
      "The amount of coins that are circulating in the market and are tradeable by the public.",
    TOTAL_SUPPLY:
      "The amount of coins that have been already created, minus any coins that have been burned.",
    VOLUMEX24:
      "A measure of how much of a cryptocurrency was traded in the last 24 hours.",
    FDMP: 
      "Fully Diluted Market Cap = Price x Total supply.",
    HASH:
      "Unique transaction identifier, also known as the Transaction ID.",
    AMOUNT:
      "The number of tokens being transferred.",
    DATE:
      "Transaction creation date.",
    AGE:
      "Time when was the transaction created",
    BLOCK:
      "Block number associated with the transaction.",
    FROM:
      "Sender’s account",
    TO:
      "Receiver’s account",
    SI_NO:
      "Sl. No.",
    SYMBOL:
      "A virtual currency token.",
    NAME:
      "Name of the token.",
    TOKEN:
      "A virtual currency token or a denomination of a cryptocurrency.",
    TOKEN_TYPE:
      "Token type may include XRC20, XRC721 or XRC1155.",
    CONTRACT:
      "Smart Contract associated with the particular token.",
    HOLDER:
      "The number of holders.",
    TOKEN_TOTAL_SUPPLY:
      "Amount of tokens being transferred",
    STATUS:
      "The token is either verified or unverified.",
    ACCOUNT_ADDRESS:
      "The unique address of a particular account.",
    ACCOUNT_TYPE:
      "Account type is either Account, Contract or Token.",
    ACCOUNT_BALANCE:
      "Balance held by a particular account.",
    WATCHLIST_ADDRESS:
      "Users' wallet address",
    WATCHLIST_DESCRIPTION:
      "The description provided by the user while creating the watchlist",
    WATCHLIST_BALANCE:
    "The amount available in the wallet",
    WATCHLIST_ADDED_ON:
      "Watchlist creation date",
    WATCHLIST_NOTIFICATION:
      "Notification priorities set by the users",
    PRIVATE_NOTE:
      "A private note added to a transaction",
    PRIVATE_NOTE_ADDED_ON:
      "Private note creation date",
    TAG_ADDRESS:
      "Wallet addresses with tag names",
    NAME_TAG:
      "The tag name that is given to an address",
    TAG_ADDED_ON:
      "The date on which the address was tagged",
    CONTRACT_ADDRESS:
      "The unique address of the contract",
    TOKEN_NAME:
      "Name of the token associated with the contract",
    CONTRACT_NAME:
      "Name of the Smart Contract",
    TOKEN_YES_NO:
      "Whether the token is associated with the Smart Contract or not",
      
  };
  
  export const toolTipMessages = {
    hashid: "A transaction hash is a unique character identifier that is generated whenever the transaction is executed.",
    blocknumber: "The number of block in which transaction was recorded. Block confirmation indicate how many blocks since the transaction is mined.",
    timestamp: "The date and time at which a transaction is mined.",
    from: "The sending party of the transaction(could be from a contact address)",
    to: "The receiving party of the transaction(could be from a contact address) ",
    value: "The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction",
    txnfee: "The value being transacted in XDC and fiat value. Note: You can click the fiat value(if available) to see historical value at the time of Transaction",
    gasprovided: "Maximum amount of gas provided for the transaction. For normal XDC transfers the value is 21,000. For contract this value is higher an bound by block gas limit.",
    gasprice: "Cost per unit of gas specified for the transaction, in XDC and Gwei. The higher the gas price the higher hance of getting included in a block",
    gasused: "The exact unit of gas that was used for the transactions.",
    nounced: "Sequential running number for an address, beginning with 0 for the first transaction. For example, if the nonce of a transaction is 10, it would be 11th transaction sent from the sender's address.",
    input: "Additional information that is required for the transaction",
    transferToken: "The value being transacted in XDC and fiat value. Note: You can click the fiat value (if available) to see historical value at the time of transaction.",
    privatenote: "Private notes"
  }
  
  export const decimalDivisionValue = {
    DECIMAL_DIVISON_VALUE: 1000000000000000000
  }