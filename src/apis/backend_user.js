import request from '@/utils/http'

//后台管理员相关api
export const loginAPI = ({ account, password }) => {
    return request({
        url: '/admin/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

export const getAdminPageAPI = (params) => {
    return request({
        url: '/admin/page',
        method: 'GET',
        params
    })
}

export const addAdminAPI = (account, name, password, phone) => {
    return request({
        url: '/admin/add',
        method: 'POST',
        data: {
            account,
            name,
            password,
            phone
        }
    })
}

export const editAdminAPI = (account, name, password, phone, id) => {
    return request({
        url: '/admin/edit',
        method: 'PUT',
        data: {
            account,
            name,
            password,
            phone,
            id
        }
    })
}

export const editStatusAPI = (flag, ids) => {
    return request({
        url: '/admin',
        method: 'PUT',
        data: {
            flag,
            ids
        }
    })
}