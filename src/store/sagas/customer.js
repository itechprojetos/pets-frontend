import { call, put } from 'redux-saga/effects'
import api, { USER_ID } from '../../services/api'
import actions from '../actions'
//import history from '../../routes/history'

export function* customerCreateOrEdit(action) {
    const { payload } = action
    try {
        if (payload.veterinary) {
            if (payload.veterinary.id && payload.veterinary.id > 0) {
                payload.data.veterinaryId = payload.veterinary.id
            } else {
                const { data } = yield call(api.post, '/services/app/Veterinaries/CreateOrEdit', payload.veterinary)
                if (data.success) {
                    const { data } = yield call(api.get, `/services/app/Veterinaries/GetAll?CRVMFilter=${payload.veterinary.crvm || ''}`)
                    if (data.success) {
                        if (data.result && data.result.items && data.result.items.length > 0 && data.result.items[0].veterinary) {
                            payload.data.veterinaryId = data.result.items[0].veterinary.id
                        } else {
                            console.log('Veterinário não encontrado: ', data)
                        }
                    }
                }
            }
        }
        const { data } = yield call(api.post, '/services/app/Customers/CreateOrEdit', payload.data)
        if (data.success) {
            yield put({ type: actions.CustomerTypes.SIGN_UP_SUCCESS })
            yield put({ type: actions.CustomerTypes.GET_CUSTOMER })
        } else {
            console.log('customerCreateOrEdit error: ', data)
            yield put({ type: actions.CustomerTypes.SIGN_UP_ERROR, payload: { error: 'Ocorreu um erro criando sua conta.' } })
        }
    } catch (e) {
        console.log('customerCreateOrEdit exception: ', e)
        yield put({ type: actions.CustomerTypes.SIGN_UP_ERROR, payload: { error: 'Ocorreu um erro criando sua conta.' } })
    }
}

export function* customerSignIn(action) {
    const { payload } = action
    try {
        // const { data } = yield call(api.post, '/services/app/Customers/LoginUserTriciclo', payload)
        const { data } = yield call(api.post, '/services/app/Customers/LoginCustomer', payload)
        if (data.success) {
            localStorage.setItem(USER_ID, data.result.customer.id.toString())
            yield put({ type: actions.CustomerTypes.SIGN_IN_SUCCESS })
            yield window.location.reload()
        } else {
            console.log('customerSignIn error: ', data)
            yield put({ type: actions.CustomerTypes.SIGN_IN_ERROR, payload: { error: 'Ocorreu um erro efetuando login.' } })
        }
    } catch (e) {
        console.log('customerSignIn exception: ', e)
        yield put({ type: actions.CustomerTypes.SIGN_IN_ERROR, payload: { error: 'Ocorreu um erro efetuando login.' } })
    }
}

export function* customerSignOut(action) {
    yield window.location.reload()
}

export function* customerGet() {
    try {
        const userId = localStorage.getItem(USER_ID)
        const { data } = yield call(api.get, `/services/app/Customers/GetCustomerForView?id=${userId}`)
        if (data.success) {
            yield put({ type: actions.CustomerTypes.GET_CUSTOMER_SUCCESS, payload: data.result.customer })
        } else {
            console.log('customerGet error: ', data)
            yield put({ type: actions.CustomerTypes.GET_CUSTOMER_ERROR, payload: { error: 'Ocorreu um erro obtendo os dados do usuário.' } })
        }
    } catch (e) {
        console.log('customerGet exception: ', e)
        yield put({ type: actions.CustomerTypes.GET_CUSTOMER_ERROR, payload: { error: 'Ocorreu um erro obtendo os dados do usuário.' } })
    }
}
