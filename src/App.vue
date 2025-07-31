<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden -z-10">
    <Beams
      :beam-width="2"
      :beam-height="30"
      :beam-number="12"
      :light-color="'#C6E2FF'"
      :speed="6"
      :noise-intensity="1.75"
      :scale="0.2"
      :rotation="45"
    />
  </div>
  <div class="flex items-center min-h-screen text-8xl justify-center">
    <TextType
      :text="['Edoardo Quinto\'s', 'personal website', 'Enjoy!']"
      :typingSpeed="75"
      :pauseDuration="1500"
      :showCursor="true"
      cursorCharacter="_"
    />
  </div>
  <Dock
    :items="items"
    :panel-height="68"
    :base-item-size="50"
    :magnification="70"
    :distance="200"
    :dock-height="256"
    :spring="{ mass: 0.1, stiffness: 150, damping: 12 }"
  />
</template>

<script setup lang="ts">
import Beams from "./components/BeamsBackground.vue";
import TextType from "./components/TextType.vue";
import Dock from "./components/HomeDock.vue";
import { h } from "vue";

const items = [
  {
    icon: () =>
      h("i", {
        class: "pi pi-home",
        style: { fontSize: "18px", color: "white" },
      }),
    label: "Home",
    onClick: () => console.log("Home clicked!"),
  },
  {
    icon: () =>
      h("i", {
        class: "pi pi-inbox",
        style: { fontSize: "18px", color: "white" },
      }),
    label: "Archive",
    onClick: () => console.log("Archive clicked!"),
  },
  {
    icon: () =>
      h("i", {
        class: "pi pi-user",
        style: { fontSize: "18px", color: "white" },
      }),
    label: "Profile",
    onClick: () => console.log("Profile clicked!"),
  },
  {
    icon: () =>
      h("i", {
        class: "pi pi-cog",
        style: { fontSize: "18px", color: "white" },
      }),
    label: "Settings",
    onClick: () => console.log("Settings clicked!"),
  },
];
</script>
