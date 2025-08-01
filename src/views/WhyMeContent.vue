<template>
  <div class="p-10">
    <div class="flex flex-col md:flex-row items-start gap-10">
      <div class="flex-3">
        <div class="flex">
          <SplitText
            text="Why me?"
            class-name="text-6xl md:text-9xl font-bold text-white"
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
          <ul class="ml-auto mt-15">
            <li>
              <a
                class="text-white text-right font-extrabold hover:underline"
                href="/"
                >Back to the homepage!</a
              >
            </li>
            <li>
              <a
                class="text-white text-right font-extrabold hover:underline"
                href="/about-me"
                >Back to the About Me page!</a
              >
            </li>
          </ul>
        </div>
        <div
          class="mt-6 text-white text-2xl flex-2 border-e-2 border-t-2 pt-2 pe-2"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            vitae ex ipsam deserunt id architecto in ad enim, est iste fuga
            maiores voluptatibus culpa quia quae commodi nemo! Inventore,
            aperiam?
          </p>
        </div>
      </div>

      <div class="flex-1">
        <img
          src="/whyme-contents.png"
          class="rounded-2xl object-cover w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitText from "../components/SplitText.vue";
</script>
