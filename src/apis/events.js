import request from "@/utils/http";

export const getEventPageAPI = (params) => {
    return request({
        url: '/event/page',
        method: 'GET',
        params
    })
}

export const addEventAPI = (memberId, clubId, eventname, eventDescription, startTime, endTime, spot, status) => {
    return request({
        url: '/event/add',
        method: 'POST',
        data: {
            memberId,
            clubId,
            eventname,
            eventDescription,
            startTime,
            endTime,
            spot,
            status
        }
    })
}

export const editEventAPI = (id, eventname, eventDescription, startTime, endTime, spot) => {
    return request({
        url: '/event/edit',
        method: 'PUT',
        data: {
            id,
            eventname,
            eventDescription,
            startTime,
            endTime,
            spot
        }
    })
}

export const deleteEventAPI = (params) => {
    return request({
        url: '/event/delete',
        method: 'DELETE',
        params
    })
}

export const getAllAnnoun = () => {
    return request({
        url: '/event/getAllAnnoun',
        method: 'GET'
    })
}

export const getOtherEvent = (params) => {
    return request({
        url: '/event/getOtherEvent',
        method: 'GET',
        params
    })
}

export const subApplyFormAPI = (userId, eventId, selfDes, selfStr, selfRes) => {
    return request({
        url: '/event/subApplyForm',
        method: 'POST',
        data: {
            userId: userId,
            eventId: eventId,
            selfDescription: selfDes,
            selfStrength: selfStr,
            selfReason: selfRes
        }
    })
}

export const getMyEvent = (params) => {
    return request({
        url: '/event/getMyEvent',
        method: 'GET',
        params
    })
}