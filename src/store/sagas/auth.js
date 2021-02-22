// import { call, put } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
import api, { API_TOKEN_SYSTEM, API_TOKEN_SYSTEM_TIME, systemSigned } from '../../services/api'
import actions from '../actions'

// export function* systemSignIn(action) {
//     // const {payload} = action
//     // payload.id // store id
//     try {
//         if (systemSigned()) {
//             yield put({ type: actions.AuthTypes.SYSTEM_LOGIN_SUCCESS })
//         } else {
//             const { data } = yield call(api.post, '/TokenAuth/Authenticate', {
//                 userNameOrEmailAddress: 'admin',
//                 password: '123qwe'
//             })
//             if (data.success && data.result && data.result.accessToken) {
//                 console.log('data.result.accessToken', data.result.accessToken)
//                 localStorage.setItem(API_TOKEN_SYSTEM, data.result.accessToken)
//                 localStorage.setItem(API_TOKEN_SYSTEM_TIME, new Date().getTime().toString(10))
//                 yield put({ type: actions.AuthTypes.SYSTEM_LOGIN_SUCCESS })
//             } else {
//                 console.log('systemSignIn error: ', data)
//                 yield put({ type: actions.AuthTypes.SYSTEM_LOGIN_ERROR })
//             }
//         }
//     } catch (e) {
//         console.log('systemSignIn exception: ', e)
//         yield put({ type: actions.AuthTypes.SYSTEM_LOGIN_ERROR })
//     }
// }
