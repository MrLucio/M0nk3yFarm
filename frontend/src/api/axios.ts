import { auth, logout } from '@/stores/auth'
import { buildAuthorization } from '@/utils/api'
import { getStringEnv } from '@/utils/env'
import axios from 'axios'

const authAxios = axios.create({
    baseURL: getStringEnv('VITE_SERVER_URL'),
    headers: {
        'Content-Type': 'application/json',
    },
})

const unauthAxios = axios.create({
    baseURL: getStringEnv('VITE_SERVER_URL'),
    headers: {
        'Content-Type': 'application/json',
    },
})

authAxios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = buildAuthorization(
            auth.username ?? '',
            auth.password ?? ''
        )
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

authAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        error.response?.status === 403 && logout()
        return Promise.reject(error)
    }
)

export { unauthAxios, authAxios }
