import { call, put } from 'redux-saga/effects'
import api, { USER_ID } from '../../services/api'
import actions from '../actions'

export function* lostFinds(action) {
    const {payload} = action
    try {
        payload.customerId = localStorage.getItem(USER_ID)
        payload.petsTypeId = 1
        const { data } = yield call(api.post, '/services/app/LostFinds/CreateOrEdit', payload)
        if (data.success) {
            yield put({ type: actions.LostFindsTypes.LOST_FINDS_SUCCESS })
        } else {
            console.log('lostFinds error: ', data)
            yield put({ type: actions.LostFindsTypes.LOST_FINDS_ERROR })
        }
    } catch (e) {
        console.log('lostFinds exception: ', e)
        yield put({ type: actions.LostFindsTypes.LOST_FINDS_ERROR })
    }
}
