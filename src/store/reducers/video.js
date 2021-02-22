import {combineReducers} from 'redux'
import actions from '../actions'

const initialState = {
    videosHighlight: [],
}

export const videoStatus = (state = initialState, action) => {
    switch (action.type) {
        case actions.VideoTypes.GET_VIDEO_HIGHLIGHTS_SUCCESS:
            return {
                ...state,
                videosHighlight: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    videoStatus,
})
