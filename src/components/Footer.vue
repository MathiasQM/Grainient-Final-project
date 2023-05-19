<script setup>
import NLMLOGO from "../assets/Media/Logo/NLM Footer.png";
</script>

<template>
  <footer class="w-[100vw] h-[300px] flex flex-col justify-center items-center">
    <img
      class="w-[20%] min-w-[300px]"
      :src="NLMLOGO"
      alt="Next Level Media Logo"
    />
    <div class="flex gap-6 mt-6">
      <p>Get Help</p>
      <p>Next Level Media</p>
      <p>About</p>
    </div>
  </footer>
</template>
