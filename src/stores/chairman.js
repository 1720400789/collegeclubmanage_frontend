import { defineStore } from "pinia"
import {ref} from "vue";
import { getChairClubListAPI } from "@/apis/chairman";

export const chairmanStore = defineStore('chairmanuser', () => {

    const admid = ref()
    const clubList = ref([])
    const getClubList = async (id) => {
        clubList.value = await getChairClubListAPI(id)
    }

    return {
        admid,
        clubList,
        getClubList
    }
},{
    persist: true,
})