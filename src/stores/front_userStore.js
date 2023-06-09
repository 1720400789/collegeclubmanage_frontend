import { defineStore } from "pinia"
import { ref } from 'vue'
import { loginAPI } from "@/apis/front_user"

export const useFrontUserStore = defineStore('frontuser', () => {
    const user_res = ref({})
    const username = ref()
    const getUserInfo = async ({ mAccount, mPassword }) => {
        console.log(mAccount)
        console.log(mPassword)
        user_res.value = await loginAPI({ mAccount, mPassword})
        username.value = mAccount
    }

    return {
        user_res,
        username,
        getUserInfo
    }
},{
    persist: true,
})