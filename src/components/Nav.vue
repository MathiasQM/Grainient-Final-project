<script setup>
import { RouterLink } from "vue-router";

import AuthModalVue from "../Partials/Modals/AuthModal.vue";

var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
</script>
<template>
  <nav>
    <div class="laptop-nav-rapper" v-if="width > 1000">
      <RouterLink class="gradient-logo" id="no-border-bottom" to="/">
        <img
          src="@/assets/Media/Logo/Grainient-logo.svg"
          alt="Grainient Logo"
          id="logo"
        />
        <div class="new-pro-tab beta">Alpha</div>
      </RouterLink>
      <div class="nav-items">
        <div class="nav-expert-item">
          <RouterLink class="nav-item" to="/pro">Expert Gradients</RouterLink>
          <div class="new-pro-tab">NEW</div>
        </div>
        <RouterLink class="nav-item" to="/">Generator</RouterLink>
        <RouterLink class="nav-item" to="/about">About</RouterLink>
        <RouterLink class="go-pro-btn" to="/pro">Go PRO</RouterLink>
        <AuthModalVue />
      </div>
    </div>
    <div class="mobil-nav" v-if="width < 1000">
      <div class="mobil-upper-nav-container">
        <img
          src="@/assets/Media/Logo/Grainient-logo.svg"
          alt="Grainient Logo gradient-mobile-logo"
          id="logo"
        />
        <AuthModalVue />
      </div>

      <div class="mobil-nav-items">
        <!-- skal gå til /profile/explore -->
        <RouterLink id="no-border-bottom" to="/profile">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20C14.9706 20 19 15.7467 19 10.5C19 5.25329 14.9706 1 10 1C5.02944 1 1 5.25329 1 10.5C1 15.7467 5.02944 20 10 20Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 6L12 12L6 14L8 8L14 6Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>

        <RouterLink id="no-border-bottom" to="/">
          <svg
            width="17"
            height="19"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6.95L8.5 1L16 6.95V16.3C16 16.7509 15.8244 17.1833 15.5118 17.5021C15.1993 17.8209 14.7754 18 14.3333 18H2.66667C2.22464 18 1.80072 17.8209 1.48816 17.5021C1.17559 17.1833 1 16.7509 1 16.3V6.95Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 18V10H11V18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>

        <!-- Skal gå til /profile/loved -->
        <RouterLink id="no-border-bottom" to="/profile">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.612 2.41452C17.1722 1.96607 16.65 1.61034 16.0752 1.36763C15.5005 1.12492 14.8844 1 14.2623 1C13.6401 1 13.0241 1.12492 12.4493 1.36763C11.8746 1.61034 11.3524 1.96607 10.9126 2.41452L9.99977 3.34476L9.08699 2.41452C8.19858 1.50912 6.99364 1.00047 5.73725 1.00047C4.48085 1.00047 3.27591 1.50912 2.38751 2.41452C1.4991 3.31991 1 4.5479 1 5.82833C1 7.10875 1.4991 8.33674 2.38751 9.24214L3.30029 10.1724L9.99977 17L16.6992 10.1724L17.612 9.24214C18.0521 8.79391 18.4011 8.26171 18.6393 7.67596C18.8774 7.0902 19 6.46237 19 5.82833C19 5.19428 18.8774 4.56645 18.6393 3.9807C18.4011 3.39494 18.0521 2.86275 17.612 2.41452Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>

        <RouterLink id="no-border-bottom" to="/profile">
          <svg
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
        </RouterLink>

        <RouterLink id="no-border-bottom" to="/profile">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.8909 13.0909C16.7759 13.3514 16.7417 13.6403 16.7925 13.9205C16.8432 14.2007 16.9768 14.4592 17.1759 14.6627L17.2277 14.7145C17.3883 14.875 17.5157 15.0655 17.6026 15.2751C17.6896 15.4848 17.7343 15.7096 17.7343 15.9366C17.7343 16.1636 17.6896 16.3883 17.6026 16.598C17.5157 16.8077 17.3883 16.9982 17.2277 17.1586C17.0673 17.3192 16.8768 17.4466 16.6671 17.5336C16.4574 17.6205 16.2327 17.6652 16.0057 17.6652C15.7787 17.6652 15.5539 17.6205 15.3442 17.5336C15.1346 17.4466 14.9441 17.3192 14.7836 17.1586L14.7318 17.1068C14.5283 16.9077 14.2698 16.7742 13.9896 16.7234C13.7094 16.6726 13.4205 16.7069 13.16 16.8218C12.9046 16.9313 12.6867 17.1131 12.5333 17.3448C12.3798 17.5765 12.2975 17.848 12.2964 18.1259V18.2727C12.2964 18.7308 12.1144 19.1702 11.7905 19.4941C11.4665 19.818 11.0272 20 10.5691 20C10.111 20 9.67165 19.818 9.34773 19.4941C9.0238 19.1702 8.84182 18.7308 8.84182 18.2727V18.195C8.83513 17.9091 8.7426 17.6319 8.57626 17.3993C8.40992 17.1668 8.17745 16.9896 7.90909 16.8909C7.6486 16.7759 7.35965 16.7417 7.07949 16.7925C6.79933 16.8432 6.54081 16.9768 6.33727 17.1759L6.28545 17.2277C6.12504 17.3883 5.93454 17.5157 5.72485 17.6026C5.51516 17.6896 5.2904 17.7343 5.06341 17.7343C4.83642 17.7343 4.61165 17.6896 4.40197 17.6026C4.19228 17.5157 4.00178 17.3883 3.84136 17.2277C3.68077 17.0673 3.55337 16.8768 3.46644 16.6671C3.37952 16.4574 3.33478 16.2327 3.33478 16.0057C3.33478 15.7787 3.37952 15.5539 3.46644 15.3442C3.55337 15.1346 3.68077 14.9441 3.84136 14.7836L3.89318 14.7318C4.09228 14.5283 4.22584 14.2698 4.27664 13.9896C4.32744 13.7094 4.29314 13.4205 4.17818 13.16C4.0687 12.9046 3.88693 12.6867 3.65522 12.5333C3.42351 12.3798 3.152 12.2975 2.87409 12.2964H2.72727C2.26917 12.2964 1.82983 12.1144 1.50591 11.7905C1.18198 11.4665 1 11.0272 1 10.5691C1 10.111 1.18198 9.67165 1.50591 9.34773C1.82983 9.0238 2.26917 8.84182 2.72727 8.84182H2.805C3.09086 8.83513 3.3681 8.7426 3.60067 8.57626C3.83324 8.40992 4.01039 8.17745 4.10909 7.90909C4.22405 7.6486 4.25835 7.35965 4.20755 7.07949C4.15675 6.79933 4.02319 6.54081 3.82409 6.33727L3.77227 6.28545C3.61168 6.12504 3.48428 5.93454 3.39735 5.72485C3.31043 5.51516 3.26569 5.2904 3.26569 5.06341C3.26569 4.83642 3.31043 4.61165 3.39735 4.40197C3.48428 4.19228 3.61168 4.00178 3.77227 3.84136C3.93269 3.68077 4.12319 3.55337 4.33288 3.46644C4.54256 3.37952 4.76733 3.33478 4.99432 3.33478C5.22131 3.33478 5.44607 3.37952 5.65576 3.46644C5.86545 3.55337 6.05595 3.68077 6.21636 3.84136L6.26818 3.89318C6.47172 4.09228 6.73024 4.22584 7.0104 4.27664C7.29056 4.32744 7.57951 4.29314 7.84 4.17818H7.90909C8.16453 4.0687 8.38238 3.88693 8.53583 3.65522C8.68927 3.42351 8.77162 3.152 8.77273 2.87409V2.72727C8.77273 2.26917 8.95471 1.82983 9.27863 1.50591C9.60256 1.18198 10.0419 1 10.5 1C10.9581 1 11.3974 1.18198 11.7214 1.50591C12.0453 1.82983 12.2273 2.26917 12.2273 2.72727V2.805C12.2284 3.08291 12.3107 3.35442 12.4642 3.58613C12.6176 3.81783 12.8355 3.99961 13.0909 4.10909C13.3514 4.22405 13.6403 4.25835 13.9205 4.20755C14.2007 4.15675 14.4592 4.02319 14.6627 3.82409L14.7145 3.77227C14.875 3.61168 15.0655 3.48428 15.2751 3.39735C15.4848 3.31043 15.7096 3.26569 15.9366 3.26569C16.1636 3.26569 16.3883 3.31043 16.598 3.39735C16.8077 3.48428 16.9982 3.61168 17.1586 3.77227C17.3192 3.93269 17.4466 4.12319 17.5336 4.33288C17.6205 4.54256 17.6652 4.76733 17.6652 4.99432C17.6652 5.22131 17.6205 5.44607 17.5336 5.65576C17.4466 5.86545 17.3192 6.05595 17.1586 6.21636L17.1068 6.26818C16.9077 6.47172 16.7742 6.73024 16.7234 7.0104C16.6726 7.29056 16.7069 7.57951 16.8218 7.84V7.90909C16.9313 8.16453 17.1131 8.38238 17.3448 8.53583C17.5765 8.68927 17.848 8.77162 18.1259 8.77273H18.2727C18.7308 8.77273 19.1702 8.95471 19.4941 9.27863C19.818 9.60256 20 10.0419 20 10.5C20 10.9581 19.818 11.3974 19.4941 11.7214C19.1702 12.0453 18.7308 12.2273 18.2727 12.2273H18.195C17.9171 12.2284 17.6456 12.3107 17.4139 12.4642C17.1822 12.6176 17.0004 12.8355 16.8909 13.0909V13.0909Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  width: 90%;
  top: 3%;
  z-index: 1;
}
nav > .mobil-nav {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: -90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobil-upper-nav-container {
  position: absolute;
  bottom: 88vh;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.gradient-mobile-logo {
  width: 8%;
  max-width: 50px;
  min-width: 50px;
  height: auto;
}

.mobil-nav-items {
  position: absolute;
  bottom: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--mobile-nav-color);
  width: 60%;
  max-width: 400px;
  height: 30px;
  max-height: 30px;
  padding: 30px 50px;
  border-radius: 15px;
  z-index: 10;
}

.go-pro-hud {
  margin-top: 50px;
  justify-self: flex-start;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  font-weight: 800;
}

/* Laptop Styling */
.laptop-nav-rapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gradient-logo {
  display: flex;
  position: relative;
  width: 50%;
  align-self: center;
}

.nav-items {
  width: 150%;
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: flex-end;
}

.nav-expert-item {
  display: flex;
  gap: 5px;
}

.new-pro-tab {
  display: flex;
  align-items: center;
  padding: 0 5px;
  background-image: linear-gradient(
    to right,
    #e44471,
    #e03b64,
    #dc3258,
    #d7284b,
    #d21f3e
  );
  font-size: 0.5rem;
  border-radius: 10%;
  margin-bottom: 4px;
}

.beta {
  height: 18px;
  position: relative;
  left: -65px;
  top: 7px;
}

.nav-item {
  font-weight: 400;
  padding-bottom: 4px;
  border-bottom: 3px solid transparent;
  transition: var(--selection-transition);
}

.nav-item:hover {
  border-bottom: 3px solid var(--red-selection-color);
  cursor: pointer;
}
.go-pro-btn {
  border-radius: 10px;
  border: 2px solid var(--blue-accent-color) !important;
  padding: 12px 20px;
  color: var(--blue-accent-color);
  cursor: pointer;
}

.go-pro-btn:hover {
  border-radius: 10px;
  border: 2px solid var(--blue-accent-color);
  padding: 12px 20px;
  background-color: var(--blue-accent-color);
  color: #fff;
  cursor: pointer;
  transition: var(--selection-transition);
}

.router-link-exact-active {
  border-bottom: 3px solid var(--red-selection-color);
}
</style>
