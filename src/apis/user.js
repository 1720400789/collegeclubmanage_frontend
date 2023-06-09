import request from '@/utils/http'

export const getUserSelfIden = (params) => {
    return request({
        url: '/user/getSelfIden',
        method: 'GET',
        params
    })
}

export const editUserSelf = (params) => {
    return request({
        url: '/user/editUserSelf',
        method: 'PUT',
        data: { ...params }
    })
}