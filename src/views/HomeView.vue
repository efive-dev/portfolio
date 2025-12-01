<template>
  <div>
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
    <BubbleMenu
      :logo="() => h('span', { style: { fontWeight: 700 } }, 'Enjoy :)')"
      :items="items"
      menu-aria-label="Toggle navigation"
      menu-bg="#ffffff"
      menu-content-color="#111111"
      :use-fixed-position="false"
      animation-ease="back.out(1.5)"
      :animation-duration="0.5"
      :stagger-delay="0.12"
    />

    <div class="flex items-center min-h-screen text-8xl justify-center">
      <TextType
        :text="['Edoardo Quinto\'s', 'personal website', 'Enjoy!']"
        :typingSpeed="75"
        :pauseDuration="1500"
        :showCursor="true"
        cursorCharacter="_"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Beams from "./../components/BeamsBackground.vue";
import TextType from "./../components/TextType.vue";
import { h } from "vue";
import BubbleMenu from "../components/BubbleMenu.vue";
const items = [
  {
    label: "about",
    href: "/about-me",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "/projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: "blog",
    href: "/blog",
    ariaLabel: "Blog",
    rotation: 8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    ariaLabel: "Resume",
    rotation: -8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
  {
    label: "artworks",
    href: "/gart",
    ariaLabel: "Art",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
];
</script>
