<script setup>
import GradientCard from "../GradientCard.vue";
import { ref, onMounted, defineProps } from "vue";
import { supabase } from "../../supabase";
import { useUserStore } from "../../stores/users";
import { storeToRefs } from "pinia";
import Loading from "../../components/Loading.vue";

const props = defineProps(["collectionArr"]);
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
let collectionGradients = [];

onMounted(() => {
  const getCollectionGradients = async () => {
    const { data: collections } = await supabase
      .from("collections")
      .select()
      .eq("owner_id", user.value.id)
      .select();

    let usersCollections = [];
    collections.forEach((collection, i) => {
      usersCollections.push(collection.gradient_id);
    });

    usersCollections.forEach(async (ids, i) => {
      ids.forEach(async (id) => {
        if (usersCollections[i].includes(id)) {
          const { data: collectionGradients } = await supabase
            .from("progradients")
            .select()
            .eq("gradient_id", id)
            .single();
          tempArr.push(collectionGradients);
        }
      });
      const tempArr = [];
      collectionGradients.push(tempArr);
    });
  };
  getCollectionGradients();
});
// test with this
const collectionss = ["iPaper", "NLM"];
</script>

<template>
  <div
    v-if="props.collectionArr"
    v-for="(collection, index) in props.collectionArr"
    class="collection-container"
  >
    <h3>{{ collection }}</h3>
    <div class="cards-collection-wrapper">
      <GradientCard
        v-for="(collection, i) in collectionGradients[index]"
        :expertGradient="collection"
        :index="index"
        :id="collection.gradient_id"
      >
      </GradientCard>
    </div>
  </div>
  <!-- Work In Progress -->
  <!-- <h3>{{ collectionArr.collection_name }}</h3>
    <Suspense>
      <div class="cards-collection-wrapper">
        <GradientCard
          v-for="(collection, index) in collectionGradients"
          :expertGradient="collection"
          :index="index"
          :id="collection.gradient_id"
        >
        </GradientCard>
      </div>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div> -->
</template>

<style scoped>
.collection-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--mobile-nav-color);
  width: 100%;
  height: 100%;
  padding: 20px 0px 0px 20px;
}

.cards-collection-wrapper {
  display: flex;
  gap: 20px;
  padding: 20px;
  overflow: auto;
}
</style>
