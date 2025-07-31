<template>
  <div class="block bg-black min-h-screen h-screen w-screen">
    <FlowingMenu :items="items" />
  </div>
</template>

<script setup lang="ts">
import router from "../router/index";
import FlowingMenu from "../components/FlowingMenu.vue";

const items = [
  {
    link: "#",
    text: "About Me",
    image: "./../public/about-me.png",
  },
  {
    link: "#",
    text: "Why me?",
    image: "./../public/why-me.png",
  },
  {
    link: "#",
    text: "My Skills",
    image: "./../public/skills.png",
  },
  {
    link: "/",
    text: "Homepage",
    image: "./../back-to-homepage.png",
  },
];
const goback = () => {
  router.push("/");
};
</script>
