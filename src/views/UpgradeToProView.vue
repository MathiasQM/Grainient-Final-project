<script setup>
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import ProfileView from "./ProfileView.vue";
import Loading from "../components/Loading.vue";

const userStore = useUserStore();
const { user, loading } = storeToRefs(userStore);
</script>
<template>
  <div>
    <!-- <div v-if="loading">
            <Loading />
        </div> -->
    <div>
      <h1 v-if="!user">Please login</h1>
      <ProfileView v-else />
    </div>
  </div>
</template>

<style scoped></style>
