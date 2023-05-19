<script setup>
import GradientCard from "../GradientCard.vue";
import { ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useUserStore } from "../../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

let lovedArr = ref(null);
let lovedGradients = ref(null);

onMounted(() => {
  const getGradients = async () => {
    const { data: usersLovedGradients } = await supabase
      .from("users")
      .select()
      .eq("username", user.value.username)
      .single();
    lovedArr = usersLovedGradients.loved;
    const { data: progradients } = await supabase
      .from("progradients")
      .select("gradient_id");
    const arrGradients = [];
    progradients.forEach(async (progradient, index) => {
      if (lovedArr.includes(progradient.gradient_id)) {
        const { data: gradients } = await supabase
          .from("progradients")
          .select()
          .eq("gradient_id", progradient.gradient_id)
          .single();
        arrGradients.push(gradients);
      }
      if (lovedArr.length === arrGradients.length) {
        lovedGradients.value = arrGradients;
      }
    });
  };
  getGradients();
});
</script>
<template>
  <div v-if="user">
    <h1>Loved</h1>
    <div class="cards-container">
      <GradientCard
        :key="lovedGradients.value"
        v-for="(lovedGradient, index) in lovedGradients"
        :expertGradient="lovedGradient"
        :index="index"
        :id="lovedGradient.gradient_id"
      />
    </div>
  </div>
</template>

<style scoped>
.cards-container {
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
