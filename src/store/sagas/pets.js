import { call, put } from 'redux-saga/effects'
import api, { USER_ID } from '../../services/api'
import actions from '../actions'
import awsS3Service from '../../services/aws-s3.service'

export function* petsCreateOrEdit(action) {
    const {payload} = action
    try {

        const payloadData = payload.pet
        if (payload.id && payload.id > 0) {
            payloadData.id = payload.id
        }
        if (payload.file) {
            const url = yield call(petsCreateOrEditUploadFile, action)
            if (url) {
                payloadData.url_image = url
            }
        }

        payloadData.customerId = localStorage.getItem(USER_ID)
        // payload.petsTypeId = 1
        const { data } = yield call(api.post, '/services/app/Pets/CreateOrEdit', payloadData)
        if (data.success) {
            yield put({ type: actions.PetsTypes.CREATE_OR_EDIT_SUCCESS })
        } else {
            console.log('petsCreateOrEdit error: ', data)
            yield put({ type: actions.PetsTypes.CREATE_OR_EDIT_ERROR })
        }
    } catch (e) {
        console.log('petsCreateOrEdit exception: ', e)
        yield put({ type: actions.PetsTypes.CREATE_OR_EDIT_ERROR })
    }
}

const petsCreateOrEditUploadFile = async (action) => {
    const {payload: {file}} = action
    console.log('petsCreateOrEditUploadFile', file)
    const userId = localStorage.getItem(USER_ID)
    try {
        return await awsS3Service.upload(file, `media/${userId}/pets/`)
    } catch (e) {
        console.log('servicesCreateOrEditUploadFile exception: ', e)
    }
    return undefined
}

export function* petsGetAll(action) {
    try {
        const { data } = yield call(api.get, `/services/app/Pets/GetAll`)
        if (data.success) {
            const items = data.result.items && data.result.items.length > 0 ? data.result.items.map(i => i.pet) : []
            yield put({ type: actions.PetsTypes.GET_ALL_SUCCESS, payload: items })
        } else {
            console.log('petsGetAll error: ', data)
            yield put({ type: actions.PetsTypes.GET_ALL_ERROR })
        }
    } catch (e) {
        console.log('petsGetAll exception: ', e)
        yield put({ type: actions.PetsTypes.GET_ALL_ERROR })
    }
}

export function* petsGetAllUser(action) {
    try {
        const customerId = localStorage.getItem(USER_ID)
        // payload.petsTypeId = 1
        const { data } = yield call(api.get, `/services/app/Pets/GetAll?CustomerIdFilter=${customerId}`)
        if (data.success) {
            const items = data.result.items && data.result.items.length > 0 ? data.result.items.map(i => i.pet) : []
            yield put({ type: actions.PetsTypes.GET_ALL_USER_SUCCESS, payload: items })
        } else {
            console.log('petsGetAll error: ', data)
            yield put({ type: actions.PetsTypes.GET_ALL_USER_ERROR })
        }
    } catch (e) {
        console.log('petsGetAll exception: ', e)
        yield put({ type: actions.PetsTypes.GET_ALL_USER_ERROR })
    }
}
