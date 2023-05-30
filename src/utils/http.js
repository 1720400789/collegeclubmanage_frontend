//axios基础的封装，如：接口基地址、接口超时时间、请求拦截器和响应拦截器
import axios from "axios"

//1.接口基地址和接口超时时间的封装
const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

// 2.axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// 3.axios响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})

//导出配置
export default httpInstance