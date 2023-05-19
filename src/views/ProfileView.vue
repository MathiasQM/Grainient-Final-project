<script setup>
import Profile from '../components/Profile.vue';
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia';
import AuthModal from '../Partials/Modals/AuthModal.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);


</script>

<template>
    <main>
        <Profile v-if="user"/>
        <div v-else class="not-signed-in">
            <p>Please login or create a profile to view your profilepage.</p>
            <AuthModal />
        </div>
    </main>
</template>

<style scoped>
p {
    margin-bottom: 50px;
}
.not-signed-in {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>