import request from "@/utils/http";

export const addNoticeAPI = (manId, title, content) => {
    return request({
        url: '/notice/add',
        method: 'POST',
        data: {
            manId,
            title,
            content
        }
    })
}