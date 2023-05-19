<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/users";
import { storeToRefs } from "pinia";
import Loading from "../../components/Loading.vue";

const userStore = useUserStore();
const { errorMessage, loading, loadingUser, user } = storeToRefs(userStore);

const router = useRouter();
const visible = ref(false);
const userLoginSignup = ref(true);

const ShowModal = () => {
  visible.value = true;
};

const userCredentials = reactive({
  email: "",
  password: "",
  username: "",
});

const clearUserCredentialsInputs = () => {
  userCredentials.email = "";
  userCredentials.password = "";
  userCredentials.username = "";
  userStore.clearErrorMessage();
};

const handleOk = async (e) => {
  e.preventDefault();
  if (userLoginSignup.value) {
    await userStore.handleLogin({
      password: userCredentials.password,
      email: userCredentials.email,
    });
  } else {
    await userStore.handleSignup(userCredentials);
  }
  if (user.value) {
    visible.value = false;
    clearUserCredentialsInputs();
  }
};

const closeModal = () => {
  clearUserCredentialsInputs();
  visible.value = false;
};

const openCloseLoginSignup = () => {
  console.log(userLoginSignup.value);
  userLoginSignup.value = !userLoginSignup.value;
  clearUserCredentialsInputs();
};

const goToProfile = () => {
  router.push(`/profile`);
};
</script>

<template>
  <div>
    <div v-if="!loadingUser" class="signup-btn">
      <button v-if="!user" @click="ShowModal" class="signup">
        Sign up! / Login
      </button>

      <svg
        v-if="user"
        @click="goToProfile"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.18 19.17C18.0605 19.155 17.9395 19.155 17.82 19.17C16.5479 19.1272 15.3423 18.5915 14.4578 17.6763C13.5734 16.761 13.0793 15.5378 13.08 14.265C13.08 11.55 15.27 9.34498 18 9.34498C19.2892 9.34274 20.5276 9.84719 21.4483 10.7496C22.3689 11.652 22.8981 12.88 22.9217 14.169C22.9453 15.4579 22.4615 16.7045 21.5745 17.64C20.6875 18.5755 19.4684 19.125 18.18 19.17V19.17ZM28.11 29.07C25.3534 31.6036 21.7441 33.0066 18 33C14.1 33 10.56 31.515 7.89001 29.07C8.04001 27.66 8.94001 26.28 10.545 25.2C14.655 22.47 21.375 22.47 25.455 25.2C27.06 26.28 27.96 27.66 28.11 29.07V29.07Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18 33C26.2845 33 33 26.2845 33 18C33 9.7155 26.2845 3 18 3C9.7155 3 3 9.7155 3 18C3 26.2845 9.7155 33 18 33Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div v-if="visible" :class="visible ? 'login-signup-bg fade-in' : ''">
      <div v-if="!loading" class="login-signup-container">
        <div class="login-container">
          <button @click="closeModal" class="btn-back">← Back</button>
          <h3 @click="openCloseLoginSignup">Login</h3>

          <form v-if="userLoginSignup" class="login-signup-inputs" action="">
            <input
              type="email"
              v-model="userCredentials.email"
              placeholder="Email"
            />
            <input
              type="password"
              v-model="userCredentials.password"
              placeholder="Pasword"
            />
            <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
            <button
              type="submit"
              @keyup.enter="handleOk"
              @click="handleOk"
              class="btn-blue"
            >
              Login
            </button>
          </form>
        </div>

        <div class="signup-container">
          <h3 @click="openCloseLoginSignup">Create an account</h3>

          <form
            v-if="!userLoginSignup"
            class="login-signup-inputs"
            :onsubmit="handleOk"
          >
            <input
              type="text"
              v-model="userCredentials.username"
              placeholder="Username"
            />
            <input
              type="email"
              v-model="userCredentials.email"
              placeholder="Email"
            />
            <input
              type="password"
              v-model="userCredentials.password"
              placeholder="Pasword"
            />
            <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
            <button
              type="submit"
              @keyup.enter="handleOk"
              @click="handleOk"
              class="btn-blue"
            >
              Sign up!
            </button>
          </form>
        </div>
      </div>
      <div v-else class="loading login-signup-container">
        <Loading />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-signup-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}
.login-signup-container {
  width: 600px;
  background-color: var(--main-bg-color);
  border-radius: 15px;
  padding: 30px;
  margin: 50px;
}

.login-container,
.signup-container {
  width: 100%;
  height: 50%;
}

.login-container {
  border-bottom: 1px solid var(--grey-accent-color);
  margin-bottom: 50px;
}

h3 {
  margin-bottom: 20px;
  transition: var(--selection-transition);
}

h3:hover {
  cursor: pointer;
  text-decoration-line: underline;
  color: var(--red-selection-color);
}

.signup-btn {
  display: flex;
}

.signup-btn > .signup {
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: var(--selection-transition);
}
.signup-btn:hover > .signup {
  color: #fff;
  border: 1px solid white;
  cursor: pointer;
}

svg:hover path {
  color: var(--red-selection-color);
  stroke: var(--red-selection-color);
  transition: var(--selection-transition);
  cursor: pointer;
}

button:hover {
  stroke: var(--red-selection-color);
  transition: var(--selection-transition);
  cursor: pointer;
}

/* Sign up / login modal */

.login-signup-inputs {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.login-signup-inputs > input {
  width: 60%;
  height: 50px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
}
</style>
