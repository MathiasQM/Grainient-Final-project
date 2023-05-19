<script setup>
import '@/assets/main.css';
import Nav from './components/Nav.vue';
import { onMounted } from 'vue';
import { useUserStore } from './stores/users';

const userstore = useUserStore()

onMounted(() => {
  userstore.getUser()
})
</script>

<template>
  <main>
    <Nav />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

</style>
