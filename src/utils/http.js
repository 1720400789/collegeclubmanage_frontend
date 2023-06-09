//axios基础的封装，如：接口基地址、接口超时时间、请求拦截器和响应拦截器
import axios from "axios"
import {ElMessage} from "element-plus";
import router from "@/router"
//1.接口基地址和接口超时时间的封装
const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

// 2.axios请求拦截器
httpInstance.interceptors.request.use(config => {
    let uToken = localStorage.getItem('userId')
    let token = localStorage.getItem('u_Id')
    if(uToken){
        config.headers['u-token'] = uToken
    }
    if(token){
        config.headers['utoken'] = token
    }
    return config
}, e => Promise.reject(e))

// 3.axios响应拦截器
//res => res.data表示
httpInstance.interceptors.response.use(res => {
    if(res.data.code === 0 && res.data.msg === 'NOTLOGIN'){//未登录则返回登录页面
        console.log('未登录')
        localStorage.removeItem('userInfo')//未登录则清楚本地存储的用户信息
        router.push({ path: '/login' })
    }else {
        console.log('已登录')
        return res.data
    }
}, e => {
    console.log('err' + e)
    let  { message } = e;
    if(message == "Network Error"){
        message = "后端接口连接异常"
    }
    else if (message.includes("timeout")) {
        message = "系统接口请求超时"
    }
    else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常"
    }
    ElMessage({
        message: message,
        type: 'error',
        duration: 5000
    })
    return Promise.reject(e)
})

//导出配置
export default httpInstance