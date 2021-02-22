import { combineReducers } from 'redux'
import actions from '../actions'

const initialState = {
    lostFindsSuccess: false,
    lostFindsErrorMessage: undefined,
}

export const lostFindsStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.LostFindsTypes.LOST_FINDS:
            return {
                ...state,
                lostFindsSuccess: false,
                lostFindsErrorMessage: undefined,
            }
        case actions.LostFindsTypes.LOST_FINDS_SUCCESS:
            return {
                ...state,
                lostFindsSuccess: true,
                lostFindsErrorMessage: undefined,
            }
        case actions.LostFindsTypes.LOST_FINDS_ERROR:
            return {
                ...state,
                lostFindsSuccess: false,
                lostFindsErrorMessage: 'Erro cadastrando achados e perdidos.',
            }
        case actions.LostFindsTypes.LOST_FINDS_SET_ERROR:
            return {
                ...state,
                lostFindsSuccess: false,
                lostFindsErrorMessage: action.payload.error,
            }
        case actions.LostFindsTypes.CLEAR:
            return {
                ...state,
                lostFindsSuccess: false,
                lostFindsErrorMessage: undefined,
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    lostFindsStatus,
})
