<template>
  <div class="w-full h-full overflow-hidden">
    <nav class="flex flex-col h-full">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="flex-1 relative overflow-hidden text-center border-t border-white group"
        ref="itemContainers"
        @mouseenter="startMarquee(idx)"
        @mouseleave="stopMarquee(idx)"
      >
        <!-- Label -->
        <a
          :href="item.link"
          class="flex items-center justify-center h-full uppercase font-semibold text-white text-[4vh] z-10 relative group-hover:opacity-0 transition-opacity duration-300"
        >
          {{ item.text }}
        </a>
        <!-- Marquee Background -->
        <div
          class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ref="marqueeWrappers"
        >
          <div class="flex h-full w-[200%]" ref="marqueeTracks">
            <!-- Duplicate content for seamless scroll -->
            <div
              class="flex h-full w-full items-center"
              v-for="i in 2"
              :key="i"
            >
              <template v-for="n in 4" :key="`marquee-${idx}-${i}-${n}`">
                <span
                  class="text-[#0b0b0b] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]"
                >
                  {{ item.text }}
                </span>
                <div
                  class="w-[200px] h-[20vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
                  :style="{ backgroundImage: `url(${item.image})` }"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { gsap } from "gsap";

// Props
interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

defineProps<{
  items: MenuItemProps[];
}>();

// Refs
const marqueeTracks = ref<HTMLDivElement[]>([]);
const marqueeWrappers = ref<HTMLDivElement[]>([]);
const itemContainers = ref<HTMLDivElement[]>([]);
const animations = ref<gsap.core.Tween[]>([]);

onMounted(async () => {
  await nextTick();
  marqueeTracks.value.forEach((track, idx) => {
    const width = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: `-${width}px`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      paused: true,
    });
    animations.value[idx] = tween;
  });
});

// Start marquee animation
function startMarquee(idx: number) {
  animations.value[idx]?.play();
}

// Stop marquee animation and reset
function stopMarquee(idx: number) {
  animations.value[idx]?.pause();
  animations.value[idx]?.progress(0);
}
</script>
