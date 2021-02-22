import { call, put } from 'redux-saga/effects'
import api, { USER_ID } from '../../services/api'
import actions from '../actions'
import awsS3Service from '../../services/aws-s3.service'
import { Service } from '../../models/Service'

export function* servicesCreateOrEdit(action) {
  const { payload } = action
  // payload.file
  // payload.description
  // payload.id
  try {
    const customerId = localStorage.getItem(USER_ID)
    const payloadData = {
      description: payload.description,
      url_image: '',
      customerId,
      value: payload.value
    }
    if (payload.id && payload.id > 0) {
      payloadData.id = payload.id
    }
    if (payload.file) {
      const url = yield call(servicesCreateOrEditUploadFile, action)
      if (url) {
        payloadData.url_image = url
      }
    }
    const { data } = yield call(
      api.post,
      '/services/app/ProfessionalServices/CreateOrEdit',
      payloadData
    )
    if (data.success) {
      const { data } = yield call(
        api.get,
        `/services/app/ProfessionalServices/GetAll?CustomerIdFilter=${customerId}`
      )
      let items = []
      if (data.success) {
        items = data.result.items.map(i => i.professionalService)
      }
      yield put({
        type: actions.ServicesTypes.CREATE_OR_EDIT_SUCCESS,
        payload: items
      })
    } else {
      console.log('servicesCreateOrEdit error: ', data)
      yield put({
        type: actions.ServicesTypes.CREATE_OR_EDIT_ERROR,
        payload: { error: 'Erro cadastrando serviço.' }
      })
    }
  } catch (e) {
    console.log('servicesCreateOrEdit exception: ', e)
    yield put({
      type: actions.ServicesTypes.CREATE_OR_EDIT_ERROR,
      payload: { error: 'Erro cadastrando serviço.' }
    })
  }
}

const servicesCreateOrEditUploadFile = async action => {
  const {
    payload: { file }
  } = action
  console.log('servicesCreateOrEditUploadFile', file)
  const userId = localStorage.getItem(USER_ID)
  try {
    return await awsS3Service.upload(file, `media/${userId}/services/`)
  } catch (e) {
    console.log('servicesCreateOrEditUploadFile exception: ', e)
  }
  return undefined
}

export function* servicesGetAll() {
  try {
    const { data } = yield call(api.get, `/services/app/Services/GetAll`)
    if (data.success) {
      const items = data.result.items.map(
        i => new Service(i.service)
      )
      yield put({ type: actions.ServicesTypes.GET_ALL_SUCCESS, payload: items })
    } else {
      console.log('servicesGetAll error: ', data)
      yield put({
        type: actions.ServicesTypes.GET_ALL_ERROR,
        payload: { error: 'Ocorreu um erro obtendo os serviços.' }
      })
    }
  } catch (e) {
    console.log('servicesGetAll exception: ', e)
    yield put({
      type: actions.ServicesTypes.GET_ALL_ERROR,
      payload: { error: 'Ocorreu um erro obtendo os serviços.' }
    })
  }
}

export function* servicesGetAllUser() {
  try {
    const userId = localStorage.getItem(USER_ID)
    const { data } = yield call(
      api.get,
      `/services/app/ProfessionalServices/GetAll?CustomerIdFilter=${userId}`
    )
    if (data.success) {
      const items = data.result.items.map(
        i => new Service(i.professionalService)
      )
      yield put({
        type: actions.ServicesTypes.GET_ALL_USER_SUCCESS,
        payload: items
      })
    } else {
      console.log('servicesGetAll error: ', data)
      yield put({
        type: actions.ServicesTypes.GET_ALL_USER_ERROR,
        payload: { error: 'Ocorreu um erro obtendo os seus serviços.' }
      })
    }
  } catch (e) {
    console.log('servicesGetAll exception: ', e)
    yield put({
      type: actions.ServicesTypes.GET_ALL_USER_ERROR,
      payload: { error: 'Ocorreu um erro obtendo os seus serviços.' }
    })
  }
}

export function* servicesDelete(action) {
  const {
    payload: { id }
  } = action
  try {
    const { data } = yield call(
      api.delete,
      `/services/app/ProfessionalServices/Delete?Id=${id}`
    )
    console.log('servicesDelete data: ', data)
    if (data.success) {
      const userId = localStorage.getItem(USER_ID)
      const { data } = yield call(
        api.get,
        `/services/app/ProfessionalServices/GetAll?CustomerIdFilter=${userId}`
      )
      if (data.success) {
        const items = data.result.items.map(i => i.professionalService)
        yield put({
          type: actions.ServicesTypes.GET_ALL_USER_SUCCESS,
          payload: items
        })
        yield put({ type: actions.ServicesTypes.DELETE_SUCCESS })
      } else {
        console.log('servicesDelete error: ', data)
        yield put({ type: actions.ServicesTypes.DELETE_ERROR })
      }
    }
  } catch (e) {
    console.log('servicesDelete exception: ', e)
    yield put({
      type: actions.ServicesTypes.DELETE_ERROR,
      payload: { error: 'Ocorreu um erro deletando o serviço.' }
    })
  }
}
