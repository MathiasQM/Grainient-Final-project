<script setup>
import Loading from "./Loading.vue";
import ProfileNav from "../Partials/profileviews/ProfileNav.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
<template>
  <main>
    <div class="profile-container" v-if="user">
      <h1>
        Welcome Back <span class="username"> {{ user.username }}</span
        >!
      </h1>
      <h3>Upgrade to PRO and get access to over 200 expert gradients!</h3>
      <ProfileNav />
    </div>
    <div v-else>
      <Loading />
    </div>
  </main>
</template>

<style scoped>
.profile-container {
  margin-top: 15%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.username {
  color: var(--red-selection-color);
}
</style>
