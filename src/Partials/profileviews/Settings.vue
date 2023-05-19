<script setup>
import { useUserStore } from '../../stores/users';

const userStore = useUserStore();

const handleLogout = async () => {
    await userStore.handleLogout()
}
</script>

<template>
    <div class="settings-container">
        <h1>Settings</h1>
        <div class="settings-wrapper">
            <h3 @click="handleLogout">Log Out</h3>

        </div>
    </div>
</template>

<style scoped>

.settings-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}
.settings-container > h1{
   align-self: flex-start;
}

.settings-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 50%;
    height: 500px;
    border-radius: 10px;
    background-color: var(--mobile-nav-color);
}
.settings-wrapper > h3 {
    padding: 10px;
    width: 95%;
    transition: var(--selection-transition);
}
.settings-wrapper > h3:hover {
    padding: 10px;
    width: 95%;
    background-color: var(--red-selection-color);
    border-radius: 4px;
    border-bottom: 1px solid var(--mobile-nav-color);
    cursor: pointer;
}
</style>