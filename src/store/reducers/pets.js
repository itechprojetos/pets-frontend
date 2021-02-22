import { combineReducers } from 'redux'
import actions from '../actions'

const initialState = {
    pets: [],
    userPets: [],
    petsCreateOrEditSuccess: false,
    petsCreateOrEditErrorMessage: undefined,
}

export const petsStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.PetsTypes.CREATE_OR_EDIT:
            return {
                ...state,
                petsCreateOrEditSuccess: false,
                petsCreateOrEditErrorMessage: undefined,
            }
        case actions.PetsTypes.CREATE_OR_EDIT_SUCCESS:
            return {
                ...state,
                petsCreateOrEditSuccess: true,
                petsCreateOrEditErrorMessage: undefined,
            }
        case actions.PetsTypes.CREATE_OR_EDIT_ERROR:
            return {
                ...state,
                petsCreateOrEditSuccess: false,
                petsCreateOrEditErrorMessage: 'Erro efetuando cadastro.',
            }
        case actions.PetsTypes.CREATE_OR_EDIT_SET_ERROR:
            return {
                ...state,
                petsCreateOrEditSuccess: false,
                petsCreateOrEditErrorMessage: action.payload.error,
            }
        case actions.PetsTypes.GET_ALL_SUCCESS:
            return {
                ...state,
                pets: action.payload
            }
        case actions.PetsTypes.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                userPets: action.payload
            }
        case actions.PetsTypes.CLEAR:
            return {
                ...state,
                petsCreateOrEditSuccess: false,
                petsCreateOrEditErrorMessage: undefined,
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    petsStatus,
})
