import { combineReducers } from 'redux'
import actions from '../actions'

const initialState = {
    veterinaries: [],
    veterinariesCreateOrEditSuccess: false,
    veterinariesErrorMessage: undefined,
}

export const veterinariesStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.VeterinariesTypes.VETERINARIES_GET_ALL:
            return {
                ...state,
                veterinaries: [],
            }
        case actions.VeterinariesTypes.VETERINARIES_GET_ALL_SUCCESS:
            return {
                ...state,
                veterinaries: action.payload,
            }
        case actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT:
            return {
                ...state,
                veterinariesCreateOrEditSuccess: false,
                veterinariesErrorMessage: undefined,
            }
        case actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT_SUCCESS:
            return {
                ...state,
                veterinariesCreateOrEditSuccess: true,
                lostFindsErrorMessage: undefined,
            }
        case actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT_ERROR:
            return {
                ...state,
                veterinariesCreateOrEditSuccess: true,
                lostFindsErrorMessage: 'Ocorreu um erro criando veterinário.',
            }
        case actions.VeterinariesTypes.VETERINARIES_SET_ERROR:
            return {
                ...state,
                veterinariesCreateOrEditSuccess: false,
                veterinariesErrorMessage: action.payload.error,
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    veterinariesStatus,
})
