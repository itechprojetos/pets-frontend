export const CustomerTypes = {
    SIGN_UP: 'customer/SIGN_UP',
    SIGN_UP_SUCCESS: 'customer/SIGN_UP_SUCCESS',
    SIGN_UP_ERROR: 'customer/SIGN_UP_ERROR',
    SHOW_SIGN_UP_ERROR_MESSAGE: 'customer/SHOW_SIGN_UP_ERROR_MESSAGE',
    SIGN_IN: 'customer/SIGN_IN',
    SIGN_IN_SUCCESS: 'customer/SIGN_IN_SUCCESS',
    SIGN_IN_ERROR: 'customer/SIGN_IN_ERROR',
    SHOW_SIGN_IN_ERROR_MESSAGE: 'customer/SHOW_SIGN_IN_ERROR_MESSAGE',
    GET_CUSTOMER: 'customer/GET_CUSTOMER',
    GET_CUSTOMER_SUCCESS: 'customer/GET_CUSTOMER_SUCCESS',
    GET_CUSTOMER_ERROR: 'customer/GET_CUSTOMER_ERROR',
    SIGN_OUT: 'customer/SIGN_OUT',
}

export const CustomerActions = {

    customerCreateOrEdit: (data, veterinary) => ({
        type: CustomerTypes.SIGN_UP,
        payload: {data, veterinary}
    }),

    showSignUpErrorMessage: (message) => ({
        type: CustomerTypes.SHOW_SIGN_UP_ERROR_MESSAGE,
        payload: {error: message}
    }),

    customerSignIn: (data) => ({
        type: CustomerTypes.SIGN_IN,
        payload: data
    }),

    showSignInErrorMessage: (message) => ({
        type: CustomerTypes.SHOW_SIGN_IN_ERROR_MESSAGE,
        payload: {error: message}
    }),

    customerGet: () => ({
        type: CustomerTypes.GET_CUSTOMER,
    }),

    customerSignOut: () => ({
        type: CustomerTypes.SIGN_OUT,
    }),

}
