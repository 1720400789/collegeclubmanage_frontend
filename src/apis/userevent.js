import request from "@/utils/http";

export const getUserEventPageAPI = (params) => {
    return request({
        url: '/userevent/page',
        method: 'GET',
        params
    })
}

export const passUserEventAPI = (params) => {
    return request({
        url: '/userevent/pass',
        method: 'PUT',
        params
    })
}

export const dispassUserEventAPI = (params) => {
    return request({
        url: '/userevent/dispass',
        method: 'PUT',
        params
    })
}