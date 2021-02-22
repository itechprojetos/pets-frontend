export const DonationTypes = {
    DONATE: 'donations/DONATE',
    DONATE_SUCCESS: 'donations/DONATE_SUCCESS',
    DONATE_ERROR: 'donations/DONATE_ERROR',
    DONATE_SET_ERROR: 'donations/DONATE_SET_ERROR',
    DONATE_GET_ALL_USER: 'donations/DONATE_GET_ALL_USER',
    DONATE_GET_ALL_USER_SUCCESS: 'donations/DONATE_GET_ALL_USER_SUCCESS',
    DONATE_GET_ALL_USER_ERROR: 'donations/DONATE_GET_ALL_USER_ERROR',
    DONATE_GET_ALL: 'donations/DONATE_GET_ALL',
    DONATE_GET_ALL_SUCCESS: 'donations/DONATE_GET_ALL_SUCCESS',
    DONATE_GET_ALL_ERROR: 'donations/DONATE_GET_ALL_ERROR',
    CLEAR: 'donations/CLEAR',
}

export const DonationActions = {

    donate: (data) => ({
        type: DonationTypes.DONATE,
        payload: data
    }),

    donateSetError: (message) => ({
        type: DonationTypes.DONATE_SET_ERROR,
        payload: {error: message}
    }),

    donateClear: () => ({
        type: DonationTypes.CLEAR
    }),

    donateGetAll: () => ({
        type: DonationTypes.DONATE_GET_ALL
    }),

    donateGetAllUser: () => ({
        type: DonationTypes.DONATE_GET_ALL_USER
    }),

}
