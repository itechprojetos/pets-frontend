import axios from 'axios'

export const API_TOKEN_SYSTEM = 'API_TOKEN_SYSTEM'
export const API_TOKEN_SYSTEM_TIME = 'API_TOKEN_SYSTEM_TIME'
// export const API_TOKEN = 'API_TOKEN'
// export const API_TOKEN_TIME = 'API_TOKEN_TIME'
export const USER_ID = 'USER_ID'

export const systemSigned = () => {
    const tokenSystem = localStorage.getItem(API_TOKEN_SYSTEM)
    const tokenSystemTime = parseInt(localStorage.getItem(API_TOKEN_SYSTEM_TIME), 10)
    const timeDiff = (new Date().getTime() - (tokenSystemTime || 0)) / 1000
    return tokenSystem && timeDiff < 86400
}

export const userSigned = () => {
    // const token = localStorage.getItem(API_TOKEN)
    // const tokenTime = localStorage.getItem(API_TOKEN_TIME)
    const userId = parseInt(localStorage.getItem(USER_ID))
    // const timeDiff = (new Date().getTime() - (tokenTime || 0)) / 1000
    // return token && timeDiff < 86400 && userId
    return !isNaN(userId) && (userId + 0) > 0
}

console.log('REACT_APP_API_URL: ', process.env.REACT_APP_API_URL)
const url = process.env.REACT_APP_API_URL || 'http://api-wbctech-dev.us-east-1.elasticbeanstalk.com'
// const url = process.env.REACT_APP_API_URL || 'http://localhost:8081'

axios.defaults.baseURL = `${url}/api`

export const AxiosWithInterceptors = axios.create({
    headers: {
        common: {
            // authorization: `Bearer ${localStorage.getItem(API_TOKEN)}`,
            'Abp.TenantId': 3
        }
    }
})

AxiosWithInterceptors.interceptors.request.use(request => {
    if (window.localStorage.getItem(API_TOKEN_SYSTEM)) {
        request.headers.Authorization = `Bearer ${localStorage.getItem(API_TOKEN_SYSTEM)}`
    }
    // console.log('request: ', request)
    return request
})

AxiosWithInterceptors.interceptors.response.use(
    response => {
        // console.log('response: ', response)
        return response
    },
    error => {
        if (error.response && error.response.status === 401) {
            // localStorage.removeItem(API_TOKEN)
            localStorage.removeItem(USER_ID)
        }
        return Promise.reject(error)
    }
)

// export const AxiosWithoutInterceptors = axios.create({
//     headers: {
//         common: {
//             'Abp.TenantId': 2
//         }
//     }
// })
// AxiosWithoutInterceptors.interceptors.request.use(request => {
//     console.log('AxiosWithoutInterceptors request: ', request)
//     return request
// })

const api = AxiosWithInterceptors

export default api
