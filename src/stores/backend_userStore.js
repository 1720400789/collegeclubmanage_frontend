//后台管理员相关
//pinia这类状态管理工具，充当的是一个存储数据的作用，存储在pinia的数据允许我们在各个组件中使用。
//例子：登录后需要在主页显示账号名，则可通过store获取
// store简单来说就是数据仓库的意思，我们数据都放在store里面。当然你也可以把它理解为一个公共组件，只不过该公共组件只存放数据，这些数据我们其它所有的组件都能够访问且可以修改。
// 我们需要使用pinia提供的defineStore()方法来创建一个store，该store用来存放我们需要全局使用的数据。
//我们使用store的最重要的目的就是为了组件之间共享数据

import { defineStore } from "pinia"
import { ref } from 'vue'
import { loginAPI } from "@/apis/backend_user";

//id为标识store的唯一标识
export const useBackUserStore = defineStore('backenduser', () => {

    const user_res = ref({})
    const admin_flag = ref("")
    const username = ref()
    const getUserInfo = async ({ account, password }) => {
        user_res.value = await loginAPI({ account, password})
        username.value = account
    }

    return {
        user_res,
        username,
        admin_flag,
        getUserInfo
    }
})