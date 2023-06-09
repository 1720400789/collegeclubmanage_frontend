import request from '@/utils/http'

//前台用户相关api
export const loginAPI = ({mAccount, mPassword}) => {
    return request({
        url: '/user/login',
        method: 'POST',
        params: {
            mAccount: mAccount,
            mPassword: mPassword
        }
    })
}

export const registerAPI = (data) => {
    return request({
        url: '/user/register',
        method: 'POST',
        data
    })
}

export const getUserPageAPI = (params) => {
    return request({
        url: '/user/page',
        method: 'GET',
        params
    })
}

export const addUserAPI = (mName, mAccount, mPassword, mPhone, picture, major, grade, sex) => {
    return request({
        url: '/user/add',
        method: 'POST',
        data: {
            mName,
            mAccount,
            mPassword,
            mPhone,
            picture,
            major,
            grade,
            sex
        }
    })
}

export const editUserAPI = (mName, mAccount, mPassword, mPhone, picture, major, grade, sex, id) => {
    return request({
        url: '/user/edit',
        method: 'PUT',
        data: {
            mName,
            mAccount,
            mPassword,
            mPhone,
            picture,
            major,
            grade,
            sex,
            id
        }
    })
}

export const editUserStatusAPI = (flag, ids) => {
    return request({
        url: '/user',
        method: 'PUT',
        data: {
            flag,
            ids
        }
    })
}

export const applyforimgAPI = (name) => {
    return request({
        url: '/common/download?name=' + name,
        method: 'GET',
        responseType: "blob"
    })
}

