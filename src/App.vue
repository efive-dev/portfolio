<script setup>
import PixelBlastBackground from "./components/PixelBlastBackground.vue";
import PillNav from "./components/PillNav.vue";
import logo from "./../public/small-icon.png";
</script>

<template>
  <div
    class="relative w-full h-screen overflow-hidden flex flex-col items-center"
  >
    <!-- BACKGROUND LAYER -->
    <PixelBlastBackground
      class="fixed inset-0 -z-10 pointer-events-none"
      variant="square"
      :pixel-size="5"
      color="#124559"
      :pattern-scale="2"
      :pattern-density="1"
      :pixel-size-jitter="0.5"
      :liquid="true"
      :liquid-strength="0.12"
      :liquid-radius="1.2"
      :liquid-wobble-speed="5"
      :speed="0.6"
      :edge-fade="0.25"
      :transparent="true"
    />

    <!-- NAV - centered at the top -->
    <div class="w-full flex justify-center mt-2">
      <PillNav
        :logo="logo"
        logoAlt="Efive-dev"
        :items="[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ]"
        activeHref="/"
        class="custom-nav"
        ease="power2.easeOut"
        baseColor="#EFF6E0"
        pillColor="#598392"
        hoveredPillTextColor="#598392"
        pillTextColor="#01161E"
      />
    </div>

    <!-- FOREGROUND CONTENT - centered -->
    <div
      class="flex flex-col items-center justify-center flex-1 relative z-10 p-10 text-center"
    >
      <h1 class="text-4xl font-bold" style="color: #eff6e0">
        Tailwind is working
      </h1>

      <p class="mt-4 text-xl" style="color: #aec3b0">
        Beautifully styled with your Coolors palette.
      </p>
    </div>
  </div>
</template>
