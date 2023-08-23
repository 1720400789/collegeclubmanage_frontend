import request from '@/utils/http'

export const getClubPageAPI = (params) => {
    return request({
        url: '/club/page',
        method: 'GET',
        params
    })
}

export const editClubStatusAPI = (flag, ids) => {
    return request({
        url: '/club/handlestatus',
        method: 'PUT',
        data: {
            flag,
            ids
        }
    })
}

export const addClubAPI = (id, clubName, account, name, description, picture, gender, major, num, birthTime, birthMan) => {
    return request({
        url: '/club/add',
        method: 'POST',
        data: {
            id,
            clubName,
            account,
            name,
            description,
            picture,
            gender,
            major,
            num,
            birthTime,
            birthMan
        }
    })
}

export const editClubAPI = (id, clubName, account, name, description, picture, gender, major, num, birthTime, birthMan) => {
    return request({
        url: '/club/edit',
        method: 'PUT',
        data: {
            id,
            clubName,
            account,
            name,
            description,
            picture,
            gender,
            major,
            num,
            birthTime,
            birthMan
        }
    })
}

export const getSelfClubPageListAPI = (params) => {
    return request({
        url: '/club/selfclubPage',
        method: 'GET',
        params
    })
}

export const getClubPageListAPI = (params) => {
    return request({
        url: '/club/clubPage',
        method: 'GET',
        params
    })
}

export const getClubUserListAPI = (params) => {
    return request({
        url: '/club/userinclub',
        method: 'GET',
        params
    })
}

export const getClubByIdAPI = (params) => {
    return request({
        url: '/club/getclubByid',
        method: 'GET',
        params
    })
}

export const saveApplyforJoinForm = (clubId, memberId, description) => {
    return request({
        url: '/club/saveApplyForm',
        method: 'POST',
        data: {
            clubId,
            memberId,
            description
        }
    })
}

export const userapplyforClubAPI = (memberId, applyName, clubDescription, birthTime, birthMan) => {
    return request({
        url: '/club/userapplyclub',
        method: 'POST',
        data: {
            memberId,
            applyName,
            clubDescription,
            birthTime,
            birthMan
        }
    })
}
