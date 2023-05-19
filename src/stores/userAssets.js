import { defineStore } from 'pinia'
import {supabase} from '../supabase'
import {ref, onMounted} from 'vue'
import { useUserStore } from './users'
import { storeToRefs } from 'pinia';

export const useAssetsStore = defineStore('userAssets', () => {

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

let lovedArr = ref(null)
let lovedGradients = ref(null)
            const getGradients = async () => {
                const {data: usersLovedGradients } = await supabase.from("users").select().eq('username', user.value.username).single()
                lovedArr = usersLovedGradients.loved
                const {data: progradients } = await supabase.from("progradients").select("gradient_id")
                const arrGradients = []
                progradients.forEach( async (progradient, index) => {
                    if (lovedArr.includes(progradient.gradient_id)) {    
                        const {data: gradients } = await supabase.from("progradients").select().eq('gradient_id', progradient.gradient_id).single()      
                        arrGradients.push(gradients)
                    } 
                    if (lovedArr.length === arrGradients.length) {
                        lovedGradients.value = arrGradients
                    }
                })
            }
            getGradients()

            return {getGradients}

    });