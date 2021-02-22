import { combineReducers } from 'redux'
import actions from '../actions'

const initialState = {
    services: [],
    servicesUser: [],
    servicesErrorMessage: undefined,
    servicesCreateEditSuccess: false,
    serviceEditing: undefined
}

export const servicesStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.ServicesTypes.CREATE_OR_EDIT:
            return {
                ...state,
                servicesCreateEditSuccess: false,
                servicesErrorMessage: undefined
            }
        case actions.ServicesTypes.CREATE_OR_EDIT_SUCCESS:
            return {
                ...state,
                servicesCreateEditSuccess: true
            }
        case actions.ServicesTypes.CREATE_OR_EDIT_ERROR:
            return {
                ...state,
                servicesErrorMessage: action.payload,
            }
        case actions.ServicesTypes.GET_ALL_SUCCESS:
            return {
                ...state,
                services: action.payload,
                servicesErrorMessage: undefined,
            }
        case actions.ServicesTypes.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                servicesUser: action.payload,
                servicesErrorMessage: undefined,
            }
        case actions.ServicesTypes.ERROR_MESSSAGE:
            return {
                ...state,
                servicesErrorMessage: action.payload.error
            }
        case actions.ServicesTypes.EDIT:
            return {
                ...state,
                serviceEditing: action.payload
            }
        case actions.ServicesTypes.CLEAR:
            return {
                ...state,
                servicesCreateEditSuccess: false,
                servicesErrorMessage: undefined,
                serviceEditing: undefined
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    servicesStatus,
})
