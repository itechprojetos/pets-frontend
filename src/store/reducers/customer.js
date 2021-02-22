import { combineReducers } from 'redux'
import actions from '../actions'
import { USER_ID, userSigned } from '../../services/api'

const initialState = {
    signUpSuccess: false,
    signUpError: false,
    signUpErrorMessage: undefined,
    signingIn: false,
    signInSuccess: false,
    signInError: false,
    signInErrorMessage: undefined,
    customer: undefined,
    userSigned: userSigned(),
}

export const customerStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.CustomerTypes.SIGN_OUT:
            localStorage.removeItem(USER_ID)
            return {
                ...state,
                userSigned: false,
                customer: undefined,
            }
        case actions.CustomerTypes.SIGN_UP:
            return {
                ...state,
                signUpSuccess: false,
                signUpError: false,
                signUpErrorMessage: undefined
            }
        case actions.CustomerTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpSuccess: true,
            }
        case actions.CustomerTypes.SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: true,
                signUpErrorMessage: action.payload.error
            }
        case actions.CustomerTypes.SHOW_SIGN_UP_ERROR_MESSAGE:
            return {
                ...state,
                signUpError: true,
                signUpErrorMessage: action.payload.error
            }
        case actions.CustomerTypes.SIGN_IN:
            return {
                ...state,
                signingIn: true,
                signInSuccess: false,
                signInError: false,
                signInErrorMessage: undefined,
            }
        case actions.CustomerTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                signingIn: false,
                signInSuccess: true,
                userSigned: true,
                signInErrorMessage: undefined,
            }
        case actions.CustomerTypes.SIGN_IN_ERROR:
            return {
                ...state,
                signingIn: false,
                signInError: true,
                signInErrorMessage: 'Ocorreu um erro efetuando login. Verifique suas credenciais e tente novamente.',
            }
        case actions.CustomerTypes.SHOW_SIGN_IN_ERROR_MESSAGE:
            return {
                ...state,
                signInError: true,
                signInErrorMessage: action.payload.error
            }
        case actions.CustomerTypes.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    customerStatus,
})
