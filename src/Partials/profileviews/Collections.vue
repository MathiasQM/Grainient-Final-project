<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useUserStore } from "../../stores/users";
import { storeToRefs } from "pinia";
import Collection from "./Collection.vue";
import Loading from "../../components/Loading.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

let collectionsArr = ref(null);
const collectionNamesAsArr = [];

const getCollections = async () => {
  const { data: usersCollections } = await supabase
    .from("collections")
    .select()
    .eq("owner_id", user.value.id)
    .select("collection_name");
  collectionsArr.value = usersCollections;
  collectionsArr.value.forEach((collection) => {
    collectionNamesAsArr.push(collection.collection_name);
  });
};
onMounted(() => {
  getCollections();
});
</script>
<template>
  <div class="collections-tab">
    <h1>Collections</h1>
    <Suspense>
      <div class="collections-container">
        <Collection :collectionArr="collectionNamesAsArr" />
      </div>
      <template #fallback>
        <div>
          <Loading />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.collections-tab {
  width: 100%;
}
.collections-container {
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
