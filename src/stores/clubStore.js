import { defineStore } from "pinia"
import { ref } from 'vue'

export const clubStore = defineStore('clubUser', () => {

    const clubid = ref()
    return {
        clubid
    }
},{
    persist: true,
})