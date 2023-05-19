<script setup>
import { defineProps } from "vue";
import CardButtons from "./profileviews/CardButtons.vue";

const props = defineProps(["expertGradient", "index", "id"]);
// TODO - Improve border radius
const newBorder = {
  "border-width": "1px",
  "border-style": "solid",
  "border-radius": "10px",
  "border-image":
    "linear-gradient(294deg, #8339e7 0%, #d64dcd 30%, #f9a15b 66%, #ef4343 100%) 1",
};
const styles = {
  "background-image": props.expertGradient.css,
};
</script>
<template>
  <div class="card-container" :style="expertGradient.new ? newBorder : ''">
    <div
      class="gradient-window"
      id="test"
      :style="index === expertGradient.pro_id ? styles : ''"
    ></div>
    <h4>{{ expertGradient.name }}</h4>
    <div class="categories">
      <CardButtons :expertGradient="expertGradient" :id="id" />
    </div>
    <button
      class="edit-gradient-card-btn"
      :style="index === expertGradient.pro_id ? styles : ''"
    >
      Edit this Gradient
    </button>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  max-width: 300px;
  min-height: 350px;
  max-height: 350px;
  background-color: var(--grey-accent-color);
  border-radius: 20px;
  padding: 7px 0;
  margin-bottom: 20px;
}

.gradient-window {
  min-width: 285px;
  min-height: 175px;
  border-radius: 15px;
  margin-bottom: 15px;
}

h4 {
  margin-left: 7px;
  align-self: flex-start;
  margin-bottom: 15px;
}

.categories {
  height: 70px;
  margin-bottom: 15px;
}
</style>
