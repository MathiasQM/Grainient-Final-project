<script setup></script>

<template>
  <div class="container">
    <div class="loading-wrapper">
      <div class="loading-container">
        <span class="loading-circle" id="circleone"></span>
        <span class="loading-circle" id="circletwo"></span>
      </div>
      <div class="loading-container loading-middle">
        <span class="loading-circle" id="circlethree"></span>
        <span class="loading-circle" id="circlefour"></span>
      </div>
      <div class="loading-container">
        <span class="loading-circle" id="circlefive"></span>
        <span class="loading-circle" id="circlesix"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* loading */
.loading-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.loading-circle {
  position: relative;
  top: 50px;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-image: linear-gradient(
    to right,
    #e44471,
    #e03b64,
    #dc3258,
    #d7284b,
    #d21f3e
  );
}

.loading-wrapper {
  width: 60px;
  height: 150px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.loading-middle {
  position: relative;
  top: -10px;
}
#circleone,
#circletwo,
#circlethree,
#circlefour,
#circlefive,
#circlesix {
  position: relative;
  animation: loading 7s ease-in-out infinite forwards;
}
#circletwo {
  animation-delay: 0.5s;
}
#circlethree {
  animation-delay: 1s;
}
#circlefour {
  animation-delay: 1.5s;
}
#circlefive {
  animation-delay: 2s;
}
#circlesix {
  animation-delay: 2.5s;
}

@keyframes loading {
  0% {
    top: 50px;
    opacity: 0;
  }
  5% {
    top: 50px;
    opacity: 0;
  }
  15% {
    top: 0px;
    opacity: 1;
  }
  70% {
    top: 0px;
    opacity: 1;
  }
  80% {
    top: -50px;
    opacity: 0;
  }
  100% {
    top: -50px;
    opacity: 0;
  }
}
</style>
