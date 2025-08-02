<template>
  <div class="block min-h-screen h-screen w-screen">
    <FlowingMenu :items="items" />
  </div>
</template>

<script setup lang="ts">
import FlowingMenu from "../components/FlowingMenu.vue";

const items = [
  {
    link: "contents/",
    text: "About Me",
    image: "/about-me.png",
  },
  {
    link: "/about-me/why-me/",
    text: "Why me?",
    image: "/why-me.png",
  },
  {
    link: "/about-me/skills",
    text: "My Skills",
    image: "/skills.png",
  },
  {
    link: "/",
    text: "Homepage",
    image: "/back-to-homepage.png",
  },
];
</script>
