<script setup>
import GradientCard from '../GradientCard.vue';
import {ref, onMounted} from 'vue'
import { supabase } from '../../supabase';
import { useUserStore } from '../../stores/users'
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

let expertGradients = ref(null)
onMounted(() => {
    const getGradients = async () => {
        const {data: gradients} = await supabase.from("progradients").select()
        expertGradients.value = gradients;
    }
    getGradients()
});

</script>

<template>
    <div>
        <h1 v-if="!user.pro">Go pro</h1>
        <div v-else>
            <h1>Expert Gradients</h1>
            <div class="cards-container">
                <GradientCard
                v-for="(expertGradient, index) in expertGradients"
                :expertGradient="expertGradient"
                :index="index"
                :id="expertGradient.gradient_id"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.cards-container {
    overflow-x: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}
</style>