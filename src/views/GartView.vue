<template>
  <div class="p-6 md:p-10">
    <div class="flex flex-col md:flex-row items-start gap-6 md:gap-10">
      <div class="flex-3">
        <div class="flex flex-col md:flex-row md:items-start">
          <SplitText
              text="Artworks"
              class-name="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-tight"
              :delay="300"
              :duration="0.6"
              ease="power3.out"
              split-type="chars"
              :from="{ opacity: 0, y: 40 }"
              :to="{ opacity: 1, y: 0 }"
              :threshold="0.1"
              root-margin="-100px"
              text-align="left"
          />
          <ul
              class="ml-auto mt-15 border-white border-t-2 border-b-2 text-base sm:text-lg md:text-2xl p-2"
          >
            <li>
              <a
                  class="text-white text-right font-extrabold hover:underline"
                  href="/"
              >Back to the homepage!</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-6 text-white text-2xl flex-2 border-t-2 pb-2 pt-2 pe-2">
      I’ve always had a huge interest in art especially abstract art.
      The exploration of beauty in simple yet expressive patterns fascinates me deeply.
      A few years ago, I discovered the wonderful world of
      <b>generative art</b>, which brings together both my creative and technical sides. <br>
      These are some of my works. They’re made with love, but they’re not professional pieces just the creations
      of someone who enjoys playing with pretty shapes and patterns.
    </div>

    <div class="flex flex-col items-center gap-6 mt-6">
      <h1 class="underline font-extrabold text-4xl text-white mt-10">Grids:</h1>
      <div>
        <img
            src="/gart/grid.png"
            alt="grid_v1"
            class="border-2 text-white"
        >
        <p class="text-white text-2xl text-right">
          Made with <a class="hover:underline font-extrabold" href="https://openrndr.org/" target="_blank">OPENRNDR</a>
        </p>
      </div>
      <div>
        <video
            src="/gart/grid2.mp4"
            autoplay
            loop
            muted
            playsinline
            class="border-2 text-white"
        ></video>
        <p class="text-white text-2xl text-right">
          Made with <a class="hover:underline font-extrabold" href="https://openrndr.org/" target="_blank">OPENRNDR</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitText from "../components/SplitText.vue";
</script>
