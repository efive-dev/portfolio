<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
const route = useRoute();
const postHtml = ref("");
const meta = ref({});
onMounted(() => {
  const modules = import.meta.glob("../posts/*.md", { as: "raw", eager: true });
  for (const path in modules) {
    const raw = modules[path];
    const frontmatterMatch = raw.match(/^---\n([\s\S]+?)\n---/);
    let data = {};
    let content = raw;
    if (frontmatterMatch) {
      frontmatterMatch[1].split("\n").forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key && rest) data[key.trim()] = rest.join(":").trim();
      });
      content = raw.slice(frontmatterMatch[0].length);
    }
    const slug = data.slug || path.split("/").pop().replace(".md", "");
    if (slug === route.params.slug) {
      meta.value = data;
      postHtml.value = marked(content);
console.log('Raw content:', content);
console.log('Parsed HTML:', postHtml.value);
      break;
    }
  }
  
});
</script>
<template>
  <div class="p-6 md:p-10">
    <div class="flex flex-col md:flex-row gap-6 md:gap-10">
      <div
        class="flex-3 text-white border-e-2 border-t-2 border-b-2 pb-2 pt-2 pe-2"
      >
        <h1
          class="text-3xl sm:text-5xl md:text-5xl xl:text-9xl font-bold leading-tight mb-4"
        >
          {{ meta.title }}
        </h1>
        <small class="text-gray-400 mb-6 block">{{ meta.date }}</small>
        
        <div class="mb-6 flex gap-2 flex-wrap">
          <span
            v-for="tag in meta.tags || []"
            :key="tag"
            class="bg-white text-black px-2 py-1 rounded-full text-sm font-bold"
          >
            {{ tag }}
          </span>
        </div>
        
        <article class="markdown-content white">
          <div v-html="postHtml"></div>
        </article>
        
        <div class="mt-6">
          <router-link
            class="text-white font-extrabold hover:underline"
            to="/blog"
          >
            ← Back to Blog
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.markdown-content {
  color: white;
  font-size: 1.25rem;
}

.markdown-content h1 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.markdown-content h2 {
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: 1.75rem;
  margin-bottom: 0.875rem;
  line-height: 1.3;
}

.markdown-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.markdown-content p {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

.markdown-content ul {
  list-style-type: disc;
  margin-left: 2rem;
  margin-bottom: 1.25rem;
}

.markdown-content ol {
  list-style-type: decimal;
  margin-left: 2rem;
  margin-bottom: 1.25rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
  line-height: 1.75;
}

.markdown-content ul ul,
.markdown-content ol ul {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.markdown-content blockquote {
  border-left: 4px solid #666;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #d1d5db;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
}

.markdown-content pre {
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 1.2rem;
  display: flex;
  line-height: 1.7;
}

.markdown-content strong {
  font-weight: bold;
}

.markdown-content em {
  font-style: italic;
}

.markdown-content a {
  color: #60a5fa;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #93c5fd;
}
</style>
