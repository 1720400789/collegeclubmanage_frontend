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