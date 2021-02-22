import { call, put } from 'redux-saga/effects'
import api, { USER_ID } from '../../services/api'
import actions from '../actions'
import awsS3Service from '../../services/aws-s3.service'

export function * donate (action) {
  const { payload } = action
  try {
    const payloadData = payload.pet
    if (payload.id && payload.id > 0) {
      payloadData.id = payload.id
    }
    // if (payload.file) {
    //     const url = yield call(donateCreateOrEditUploadFile, action)
    //     if (url) {
    //         payloadData.url_image = url
    //     }
    // }

    payloadData.customerId = localStorage.getItem(USER_ID)
    // payloadData.petsTypeId = 1
    const { data } = yield call(
      api.post,
      '/services/app/Donations/CreateOrEdit',
      payloadData
    )
    if (data.success) {
      yield put({ type: actions.DonationTypes.DONATE_SUCCESS })
    } else {
      console.log('donate error: ', data)
      yield put({ type: actions.DonationTypes.DONATE_ERROR })
    }
  } catch (e) {
    console.log('donate exception: ', e)
    yield put({ type: actions.DonationTypes.DONATE_ERROR })
  }
}

const donateCreateOrEditUploadFile = async action => {
  const {
    payload: { file }
  } = action
  console.log('donateCreateOrEditUploadFile', file)
  const userId = localStorage.getItem(USER_ID)
  try {
    return await awsS3Service.upload(file, `media/${userId}/pets/donation/`)
  } catch (e) {
    console.log('donateCreateOrEditUploadFile exception: ', e)
  }
  return undefined
}

export function * donateGetAll (action) {
  try {
    // payload.petsTypeId = 1
    const { data } = yield call(api.get, `/services/app/Donations/GetAll`)
    console.log(data.result.items)
    if (data.success) {
      const items =
        data.result.items && data.result.items.length > 0
          ? data.result.items.map(i => i.donation)
          : []
      yield put({
        type: actions.DonationTypes.DONATE_GET_ALL_SUCCESS,
        payload: items
      })
    } else {
      console.log('donateGetAllUser error: ', data)
      yield put({ type: actions.DonationTypes.DONATE_GET_ALL_ERROR })
    }
  } catch (e) {
    console.log('donateGetAllUser exception: ', e)
    yield put({ type: actions.DonationTypes.DONATE_GET_ALL_ERROR })
  }
}

export function * donateGetAllUser (action) {
  try {
    const customerId = localStorage.getItem(USER_ID)
    // payload.petsTypeId = 1
    const { data } = yield call(
      api.get,
      `/services/app/Donations/GetAll?CustomerIdFilter=${customerId}`
    )
    if (data.success) {
      const items =
        data.result.items && data.result.items.length > 0
          ? data.result.items.map(i => i.donation)
          : []
      yield put({
        type: actions.DonationTypes.DONATE_GET_ALL_USER_SUCCESS,
        payload: items
      })
    } else {
      console.log('donateGetAllUser error: ', data)
      yield put({ type: actions.DonationTypes.DONATE_GET_ALL_USER_ERROR })
    }
  } catch (e) {
    console.log('donateGetAllUser exception: ', e)
    yield put({ type: actions.DonationTypes.DONATE_GET_ALL_USER_ERROR })
  }
}
