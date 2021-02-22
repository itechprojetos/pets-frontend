import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import actions from '../actions'

export function* veterinariesGetAll() {
    try {
        const { data } = yield call(api.get, '/services/app/Veterinaries/GetAll')
        if (data.success) {
            const vets = data.result.items.map(i => i.veterinary)
            console.log('veterinariesGetAll success: ', vets)
            yield put({ type: actions.VeterinariesTypes.VETERINARIES_GET_ALL_SUCCESS, payload: vets })
        } else {
            console.log('veterinariesGetAll error: ', data)
            yield put({ type: actions.VeterinariesTypes.VETERINARIES_GET_ALL_ERROR })
        }
    } catch (e) {
        console.log('veterinariesGetAll exception: ', e)
        yield put({ type: actions.VeterinariesTypes.VETERINARIES_GET_ALL_ERROR })
    }
}

export function* veterinariesCreateOrEdit(action) {
    const {payload} = action
    try {
        const { data } = yield call(api.post, '/services/app/Veterinaries/CreateOrEdit', payload)
        if (data.success) {
            yield put({ type: actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT_SUCCESS })
        } else {
            console.log('veterinariesCreateOrEdit error: ', data)
            yield put({ type: actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT_ERROR })
        }
    } catch (e) {
        console.log('veterinariesCreateOrEdit exception: ', e)
        yield put({ type: actions.VeterinariesTypes.VETERINARIES_CREATE_OR_EDIT_ERROR })
    }
}
