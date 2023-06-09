import request from '@/utils/http'

export const getClubRegPageAPI = (params) => {
    return request({
        url: '/audit/clubpage',
        method: 'GET',
        params
    })
}

export const updateRegStatusAPI = (params) => {
    return request({
        url: '/audit/aggreforclub',
        method: 'POST',
        data: { ...params }
    })
}

export const disaggreStatusAPI = (ids) => {
    return request({
        url: '/audit/disaggreforclub',
        method: 'POST',
        data: {
            ids
        }
    })
}

export const getEventRegPageAPI = (params) => {
    return request({
        url: '/audit/eventpage',
        method: 'GET',
        params
    })
}

export const eventStatusAPI = (flag, ids) => {
    return request({
        url: '/audit/statusforevent',
        method: 'POST',
        data: {
            flag,
            ids
        }
    })
}

export const getApplyForjoinAPI = (params) => {
    return request({
        url: '/audit/joinclubpage',
        method: 'GET',
        params
    })
}

export const checkApplyAPI = (params) => {
    return request({
        url: '/audit/checkApply',
        method: 'POST',
        params
    })
}