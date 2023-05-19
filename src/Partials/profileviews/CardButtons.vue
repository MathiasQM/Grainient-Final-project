<script setup>
import { reactive, defineProps, ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useUserStore } from "../../stores/users";
import { storeToRefs } from "pinia";
import CollectionsModal from "../Modals/CollectionsModal.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const props = defineProps({
  expertGradient: {
    type: Object,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
});
// id of the specifik card (the value is gradient_id)
const myid = props.id;
// the array of likes fetched form backend
let lovedArr = ref(null);
// each value in that array is saved in this variable so that we can compare it to "myid"
let alreadyLoving = ref(null);

// function that checks if you have already liked a gradient or not - and also updates "alreadyLoving" upon click & mount
const fetchIsLoving = async () => {
  // If we have a user run else return
  if (user) {
    // gets newest User data and stores it in "usersLovedGradients"
    const { data: usersLovedGradients } = await supabase
      .from("users")
      .select()
      .eq("username", user.value.username)
      .single();
    // I want the specifik data from row "loved" wich is an array, because of this I save it in "lovedArr"
    lovedArr = usersLovedGradients.loved;
    // tjeks of the array includes the cards specifik id
    if (lovedArr.includes(myid)) {
      // if it does I assign that value to "alreadyLoving" and can use that to compare the two on line 93 to set styling conditionaly
      alreadyLoving.value = props.expertGradient.gradient_id;
    } else {
      alreadyLoving.value = null;
      // if it does not I assign "null" to "alreadyLoving" and can use that to compare the two on line 93 to set styling conditionaly
    }
  } else return;
};

const cardButtons = reactive({
  collections: false,
  loved: false,
});

// Pushes likes to array in backend
const love = async () => {
  // I save the cards specifik id in a const "gradient_id"
  const gradient_id = props.expertGradient.gradient_id;
  // and get the newest data from the backend
  const { data: usersLovedGradients } = await supabase
    .from("users")
    .select()
    .eq("username", user.value.username)
    .single();
  // I save the specific data in my var "lovedGradients"
  const lovedGradients = usersLovedGradients.loved;
  // and save the same thing as an array in "ArrLoves"
  const arrLoves = usersLovedGradients.loved;
  // I use "lovedGradients to check if the user has already liked a gradient before"
  if (lovedGradients === null) {
    // I select the table in the backend "users" and insert the specifik gradient id in "loved" column where the username is equal to the user whom is logged in
    await supabase
      .from("users")
      .update([{ loved: [gradient_id] }])
      .eq("username", user.value.username);
    // update the styling of "love" button
    fetchIsLoving();
    // if the array already includes the gradient id, then the user has alredy loved this gradient, which means that they want to "unlove"
  } else if (arrLoves.includes(gradient_id)) {
    // I get the index of that id in the array and save it to a constant
    const index = arrLoves.indexOf(gradient_id);
    if (index > -1) {
      // only splice array when item is found
      arrLoves.splice(index, 1); // 2nd parameter means remove one item only
    }
    // the updated array is then updated in the backend
    await supabase
      .from("users")
      .update([{ loved: arrLoves }])
      .eq("username", user.value.username);
    // update styling of "love" button as user feedback
    fetchIsLoving();
  } else {
    // if the user has already loved a gradient before but the specific liked gradient has not been liked before
    // I push this gradient id to the array
    arrLoves.push(gradient_id);
    // and update the backend
    await supabase
      .from("users")
      .update([{ loved: arrLoves }])
      .eq("username", user.value.username);
    // update styling to reflect he change
    fetchIsLoving();
  }
};

// To make sure that a users liked gradients are shown uppon rerender I run "fetchIsLoving" on mounting of component
onMounted(() => {
  fetchIsLoving();
});
</script>
<template>
  <div class="profile-content">
    <div class="profile-nav-container">
      <CollectionsModal
        :cardButtons="cardButtons"
        :expertGradient="expertGradient"
      />
      <div
        :class="
          cardButtons.loved
            ? 'profile-nav-item profile-nav-active'
            : 'profile-nav-item'
        "
        @click="love"
      >
        <svg
          id="heart"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.612 2.41452C17.1722 1.96607 16.65 1.61034 16.0752 1.36763C15.5005 1.12492 14.8844 1 14.2623 1C13.6401 1 13.0241 1.12492 12.4493 1.36763C11.8746 1.61034 11.3524 1.96607 10.9126 2.41452L9.99977 3.34476L9.08699 2.41452C8.19858 1.50912 6.99364 1.00047 5.73725 1.00047C4.48085 1.00047 3.27591 1.50912 2.38751 2.41452C1.4991 3.31991 1 4.5479 1 5.82833C1 7.10875 1.4991 8.33674 2.38751 9.24214L3.30029 10.1724L9.99977 17L16.6992 10.1724L17.612 9.24214C18.0521 8.79391 18.4011 8.26171 18.6393 7.67596C18.8774 7.0902 19 6.46237 19 5.82833C19 5.19428 18.8774 4.56645 18.6393 3.9807C18.4011 3.39494 18.0521 2.86275 17.612 2.41452Z"
            :style="{ transition: 'var(--selection-transition)' }"
            :stroke="
              alreadyLoving === null
                ? 'white'
                : alreadyLoving === myid
                ? 'rgb(239, 54, 109)'
                : 'white'
            "
            :fill="
              alreadyLoving === null
                ? 'none'
                : alreadyLoving === myid
                ? 'rgb(239, 54, 109)'
                : 'none'
            "
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-content {
  width: 280px;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.profile-nav-container {
  width: 90px;
  display: flex;
  flex-direction: row;
  justify-self: flex-start;
  justify-content: space-between;
}

.profile-nav-item {
  display: flex;
  background-color: var(--main-bg-color);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.profile-nav-active > svg > path {
  transition: var(--selection-transition);
  stroke: var(--red-selection-color);
}

.profile-nav-item:hover > svg > path {
  transition: var(--selection-transition);
  stroke: var(--red-selection-color);
}
</style>
