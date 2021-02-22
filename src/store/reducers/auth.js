import { combineReducers } from 'redux'
import actions from '../actions'
import { systemSigned, userSigned } from '../../services/api'

const initialState = {
    systemSigned: systemSigned(),
    userSigned: userSigned(),
}

export const authStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.AuthTypes.SYSTEM_LOGIN_SUCCESS:
            return {
                ...state,
                systemSigned: true
            }
        case actions.CustomerTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                userSigned: true
            }
        case actions.AuthTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userSigned: true,
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    authStatus,
})
