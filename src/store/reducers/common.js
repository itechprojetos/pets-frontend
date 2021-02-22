import {combineReducers} from 'redux'
import actions from '../actions'
//import { LostFindsTypes } from '../actions/lostfinds'

const initialState = {
    loading: false,
    snackbar: false,
    snackbarMessage: '',
    menuActive: false
}

export const commonStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.CommonTypes.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        // case actions.CustomerTypes.SIGN_IN:
        case actions.PetsTypes.CREATE_OR_EDIT:
        case actions.PetsTypes.GET_ALL:
        case actions.PetsTypes.GET_ALL_USER:
        case actions.LostFindsTypes.LOST_FINDS:
        case actions.ServicesTypes.CREATE_OR_EDIT:
        case actions.ServicesTypes.DELETE:
        case actions.DonationTypes.DONATE:
        case actions.CustomerTypes.SIGN_UP:
            return {
                ...state,
                loading: true
            }
        // case actions.CustomerTypes.SIGN_IN_SUCCESS:
        // case actions.CustomerTypes.SIGN_IN_ERROR:
        case actions.PetsTypes.CREATE_OR_EDIT_SUCCESS:
        case actions.PetsTypes.CREATE_OR_EDIT_ERROR:
        case actions.PetsTypes.GET_ALL_SUCCESS:
        case actions.PetsTypes.GET_ALL_ERROR:
        case actions.PetsTypes.GET_ALL_USER_SUCCESS:
        case actions.PetsTypes.GET_ALL_USER_ERROR:
        case actions.LostFindsTypes.LOST_FINDS_SUCCESS:
        case actions.LostFindsTypes.LOST_FINDS_ERROR:
        case actions.ServicesTypes.CREATE_OR_EDIT_SUCCESS:
        case actions.ServicesTypes.CREATE_OR_EDIT_ERROR:
        case actions.ServicesTypes.DELETE_SUCCESS:
        case actions.ServicesTypes.DELETE_ERROR:
        case actions.DonationTypes.DONATE_SUCCESS:
        case actions.DonationTypes.DONATE_ERROR:
        case actions.CustomerTypes.SIGN_UP_SUCCESS:
        case actions.CustomerTypes.SIGN_UP_ERROR:
            return {
                ...state,
                loading: false
            }
        case actions.CommonTypes.SNACKBAR_SHOW:
            return {
                ...state,
                snackbar: true,
                snackbarMessage: action.payload,
            }
        case actions.CommonTypes.SNACKBAR_HIDE:
            return {
                ...state,
                snackbar: false,
                snackbarMessage: '',
            }
        case actions.CommonTypes.TOGGLE_MENU:
            return {
                ...state,
                menuActive: !state.menuActive
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    commonStatus,
})
