import {combineReducers} from 'redux'
import actions from '../actions'

const initialState = {
    highlights: [],
    products: [],
}

export const productStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.ProductTypes.GET_HIGHLIGHTS_SUCCESS:
            return {
                ...state,
                highlights: action.payload
            }
        case actions.ProductTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    productStatus,
})
