<script setup>
import { defineProps, ref, onMounted } from "vue";
import { supabase } from "../../supabase";
import { useUserStore } from "../../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const props = defineProps(["cardButtons", "expertGradient"]);

const collectionsmodal = ref(false);
let createCollectionNameInput = ref(null);
let error = ref("");
let collectionsArr = ref(null);

const closeModal = () => {
  collectionsmodal.value = false;
  return (error.value = "");
};

const createCollections = async () => {
  const { data: usersCollections } = await supabase
    .from("collections")
    .select()
    .eq("owner_id", user.value.id)
    .select("collection_name");
  const usersCollectionsArr = usersCollections;
  usersCollectionsArr.forEach(async (collection) => {
    if (collection.collection_name === createCollectionNameInput.value) {
      return (error.value = "This Collection already exists");
    } else if (createCollectionNameInput.value === null) {
      console.log("test");
      return (error.value = "Collections should have a name");
    } else {
      await supabase.from("collections").insert({
        owner_id: user.value.id,
        collection_name: createCollectionNameInput.value,
      });
      createCollectionNameInput.value = null;
      getCollections();
      return (error.value = "");
    }
  });
  if (usersCollectionsArr.length === 0) {
    await supabase.from("collections").insert({
      owner_id: user.value.id,
      collection_name: createCollectionNameInput.value,
    });
    getCollections();
    createCollectionNameInput.value = null;
    return (error.value = "");
  }
};

const deleteCollections = async (index) => {
  const { data: usersGradients } = await supabase
    .from("collections")
    .select()
    .eq("owner_id", user.value.id)
    .select("gradient_id");
  const { data: usersCollections } = await supabase
    .from("collections")
    .select()
    .eq("owner_id", user.value.id)
    .select("collection_name");
  let arrOfAddedGradients = usersGradients;
  let arrOfCollections = usersCollections;
  arrOfAddedGradients.forEach(async (gradient) => {
    if (gradient.gradient_id === null) {
      await supabase
        .from("collections")
        .delete()
        .match({ collection_name: arrOfCollections[index].collection_name });
      getCollections();
    } else {
      return (error.value = "You cannot delete a collection that is not");
    }
  });
  getCollections();
};

const getCollections = async () => {
  const { data: usersCollections } = await supabase
    .from("collections")
    .select()
    .eq("owner_id", user.value.id)
    .select("collection_name");
  collectionsArr.value = usersCollections;
};

const addToCollections = async (index) => {
  const { data: usersCollections } = await supabase
    .from("collections")
    .select()
    .eq("owner_id", user.value.id);
  let arrOfUsersCollections = usersCollections;
  let arrOfAddedGradients = usersCollections[index].gradient_id;
  const gradientToAdd = props.expertGradient.gradient_id;
  console.log(gradientToAdd, usersCollections[index]);
  if (arrOfAddedGradients === null) {
    await supabase
      .from("collections")
      .update([{ gradient_id: [gradientToAdd] }])
      .eq("collection_name", arrOfUsersCollections[index].collection_name);
  } else if (arrOfAddedGradients.includes(gradientToAdd)) {
    return (error.value = "You already added this");
  } else if (
    usersCollections[index].collection_name ===
      arrOfUsersCollections[index].collection_name &&
    usersCollections[index].collection_name === null
  ) {
    console.log("is null");
    await supabase
      .from("collections")
      .update([{ gradient_id: [gradientToAdd] }])
      .eq("collection_name", arrOfUsersCollections[index].collection_name);
  } else if (usersCollections[index].collection_name !== null) {
    const { data: usersCollections } = await supabase
      .from("collections")
      .select()
      .eq("owner_id", user.value.id);
    const tempArr = usersCollections[index].gradient_id;
    tempArr.push(gradientToAdd);
    console.log(tempArr);
    await supabase
      .from("collections")
      .update([{ gradient_id: tempArr }])
      .eq("owner_id", user.value.id);
  }
};

onMounted(() => {
  getCollections();
});
</script>

<template>
  <div
    :class="
      cardButtons.collections
        ? 'profile-nav-item profile-nav-active'
        : 'profile-nav-item'
    "
    @click="getCollections"
  >
    <svg
      @click="collectionsmodal = true"
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 16.1111C21 16.6121 20.7893 17.0925 20.4142 17.4468C20.0391 17.801 19.5304 18 19 18H3C2.46957 18 1.96086 17.801 1.58579 17.4468C1.21071 17.0925 1 16.6121 1 16.1111V2.88889C1 2.38792 1.21071 1.90748 1.58579 1.55324C1.96086 1.19901 2.46957 1 3 1H8L10 3.83333H19C19.5304 3.83333 20.0391 4.03234 20.4142 4.38658C20.7893 4.74081 21 5.22126 21 5.72222V16.1111Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 9V13"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 11L13 11"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <div v-if="collectionsmodal" class="collections-modal">
      <div class="collections-modal-container">
        <div class="collection-modal-header">
          <h3>Add to a collection or create one</h3>
          <p @click="closeModal">X</p>
        </div>
        <div class="create-collection-inputbtn">
          <input
            class="collection-input"
            type="text"
            placeholder="Collection Name"
            v-model="createCollectionNameInput"
          />
          <button @click="createCollections">Create</button>
        </div>
        <p class="error">{{ error }}</p>
        <div class="created-collection-container">
          <div
            class="single-collection"
            v-for="(collection, index) in collectionsArr"
          >
            <div @click="addToCollections(index)" class="collection-bg"></div>
            <p>{{ collection.collection_name }}</p>
            <button @click="deleteCollections(index)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-collection-inputbtn {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  border-radius: 5px;
  background-color: var(--main-bg-color);
  height: 30px;
  cursor: pointer;
}
.create-collection-inputbtn > button {
  position: absolute;
  top: 0;
  right: 6px;
  top: 16px;
  background-color: var(--grey-accent-color);
}

.single-collection {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.collection-input {
  width: 100%;
  margin-top: 10px;
  background-color: var(--mobile-nav-color);
  height: 40px;
  border-radius: 10px;
}

.error {
  color: var(--red-selection-color);
  padding: 10px;
}

.created-collection-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  height: 100%;
}

.collection-bg {
  background-color: var(--main-bg-color);
  width: 80px;
  height: 80px;
  border: 1px solid white;
  border-radius: 10px;
  margin-bottom: 5px;
}

.collection-bg:hover {
  background-color: var(--main-bg-color);
  width: 80px;
  height: 80px;
  border: 1px solid var(--red-selection-color);
  border-radius: 10px;
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

.collections-modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.collections-modal-container {
  background-color: var(--grey-accent-color);
  width: 40%;
  height: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.collection-modal-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.add-create-collection {
  height: 90%;
  width: 90%;
  display: flex;
  align-items: center;
}

.create-add-collection-btn {
  background-color: var(--mobile-nav-color);
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: var(--selection-transition);
}
.create-add-collection-btn:hover {
  border: 1px solid white;
  cursor: pointer;
}
</style>
