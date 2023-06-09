import request from '@/utils/http'

export const getChairClubListAPI = (params) => {
    return request({
        url: '/chairman/clubList',
        method: 'GET',
        params
    })
}

