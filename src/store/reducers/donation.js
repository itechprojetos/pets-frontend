import { combineReducers } from 'redux'
import actions from '../actions'

const initialState = {
    donationSuccess: false,
    donationErrorMessage: undefined,
    donations: [],
    userDonations: [],
}

export const donationStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.DonationTypes.DONATE:
            return {
                ...state,
                donationSuccess: false,
                donationErrorMessage: undefined,
            }
        case actions.DonationTypes.DONATE_SUCCESS:
            return {
                ...state,
                donationSuccess: true,
                donationErrorMessage: undefined,
            }
        case actions.DonationTypes.DONATE_ERROR:
            return {
                ...state,
                donationSuccess: false,
                donationErrorMessage: 'Erro cadastrando doação de pet.',
            }
        case actions.DonationTypes.DONATE_SET_ERROR:
            return {
                ...state,
                donationSuccess: false,
                donationErrorMessage: action.payload.error,
            }
        case actions.DonationTypes.DONATE_GET_ALL_SUCCESS:
            return {
                ...state,
                donations: action.payload
            }
        case actions.DonationTypes.DONATE_GET_ALL_USER_SUCCESS:
            return {
                ...state,
                userDonations: action.payload
            }
        case actions.DonationTypes.CLEAR:
            return {
                ...state,
                donationSuccess: false,
                donationErrorMessage: undefined,

            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    donationStatus,
})
