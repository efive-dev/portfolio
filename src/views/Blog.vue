<script setup>
import { ref, onMounted, computed } from "vue";
import { marked } from "marked";
import { useRouter } from "vue-router";
import SplitText from "../components/SplitText.vue";

const posts = ref([]);
const filterTag = ref("all");
const tags = ref([]);
const router = useRouter();

onMounted(() => {
  const modules = import.meta.glob("../posts/*.md", { as: "raw", eager: true });
  const tagSet = new Set();

  for (const path in modules) {
    const raw = modules[path];
    const frontmatterMatch = raw.match(/^---\n([\s\S]+?)\n---/);
    let meta = {};
    let content = raw;

    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      const lines = frontmatterText.split("\n");
      let currentKey = null;
      let tagsList = [];

      lines.forEach((line) => {
        if (line.trim().startsWith("-") && currentKey === "tags") {
          const tag = line.trim().substring(1).trim();
          if (tag) {
            tagsList.push(tag);
            tagSet.add(tag);
          }
        } else {
          const [key, ...rest] = line.split(":");
          if (key && rest.length > 0) {
            currentKey = key.trim();
            let value = rest.join(":").trim();

            if (currentKey === "tags") {
              if (value && !value.startsWith("-")) {
                value = value
                  .replace(/[\[\]]/g, "")
                  .split(",")
                  .map((t) => t.trim())
                  .filter((t) => t);
                tagsList = value;
                value.forEach((t) => tagSet.add(t));
              } else {
                tagsList = [];
              }
            }

            if (currentKey !== "tags" || value) {
              meta[currentKey] = value;
            }
          }
        }
      });

      if (tagsList.length > 0) {
        meta.tags = tagsList;
      }

      content = raw.slice(frontmatterMatch[0].length);
    }

    const slug = meta.slug || path.split("/").pop().replace(".md", "");
    posts.value.push({ slug, meta, html: marked(content) });
  }

  posts.value.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

  tags.value = ["all", ...Array.from(tagSet)];
});

const filteredPosts = computed(() => {
  if (filterTag.value === "all") return posts.value;
  return posts.value.filter((p) => {
    const postTags = p.meta.tags;
    return Array.isArray(postTags) && postTags.includes(filterTag.value);
  });
});
</script>

<template>
  <div class="p-6 md:p-10">
    <div class="flex flex-col md:flex-row items-start gap-6 md:gap-10">
      <!-- Main content wrapper -->
      <div class="w-full md:flex-1">
        <!-- Header row -->
        <div class="flex flex-col md:flex-row md:items-start">
          <SplitText
            text="Blog"
            class-name="text-5xl md:text-5xl xl:text-9xl font-bold text-white leading-tight"
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
            class="ml-auto mt-6 md:mt-0 border-white border-t-2 border-b-2 text-lg md:text-2xl p-2"
          >
            <li>
              <a class="text-white font-extrabold hover:underline" href="/">
                Back to the homepage!
              </a>
            </li>
          </ul>
        </div>

        <!-- Tag Filter Buttons -->
        <div class="mt-4 mb-4 flex flex-wrap gap-3">
          <button
            v-for="tag in tags"
            :key="tag"
            @click="filterTag = tag"
            class="px-3 py-1 border rounded-full font-bold transition-colors"
            :class="
              filterTag === tag
                ? 'bg-white text-black'
                : 'bg-black text-white hover:bg-white hover:text-black'
            "
          >
            {{ tag }}
          </button>
        </div>

        <div
          class="mt-6 text-white text-2xl w-full md:flex-1 border-e-2 border-t-2 border-b-2 pb-2 pt-2 pe-2"
        >
          <ul class="list-disc ps-5 space-y-2">
            <li v-for="post in filteredPosts" :key="post.slug">
              <router-link
                class="font-bold hover:underline"
                :to="`/blog/${post.slug}`"
              >
                {{ post.meta.title }}
              </router-link>

              <small class="text-gray-400 ml-2">
                {{ post.meta.date }}
              </small>

              <!-- Tags under each post -->
              <div class="mt-1 flex gap-2 flex-wrap">
                <span
                  v-for="tag in post.meta.tags || []"
                  :key="tag"
                  class="bg-white text-black px-2 py-0.5 rounded-full text-xs font-bold"
                >
                  {{ tag }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
