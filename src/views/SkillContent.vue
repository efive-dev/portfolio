<template>
  <div class="p-10">
    <div class="flex flex-col md:flex-row items-start gap-10">
      <div class="flex-3">
        <div class="flex">
          <SplitText
            text="My skills"
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
          class="mt-6 text-white text-2xl flex-2 border-e-2 border-t-2 border-b-2 pb-2 pt-2 pe-2"
        >
          Over the years I have developed a growing toolkit of
          <b>programming languages</b> and <b>technologies</b> that I use to
          develop and explore.
          <h1 class="underline font-extrabold text-4xl">Core technologies:</h1>
          <div class="ps-5">
            <p class="pt-2">
              These are the tools I am really comfortable with:
            </p>
            <ul class="list-disc ps-15">
              <li>
                <b>Go</b>: a language I genuinely enjoy using for backend
                development. I'm familiar with web frameworks like
                <i>Gin</i> and <i>Echo</i>, and I've worked with tools like
                <i>Bun ORM</i> and <i>sqlc</i> for database handling and code
                generation.
              </li>
              <li>
                <b>Java</b>: the language I was formally taught at university.
                It helped shape my understanding of object-oriented design and
                strong typing.
              </li>
              <li>
                <b>Python</b>: my go-to language for scripting, automation, and
                quick prototypes. I especially appreciate its simplicity and
                flexibility.
              </li>
            </ul>
          </div>
          <h1 class="underline font-extrabold text-4xl pt-4">
            Frontend technologies:
          </h1>
          <div class="ps-5">
            <p class="pt-2">
              I'm also comfortable building UIs and web apps with these tools:
            </p>
            <ul class="list-disc ps-15">
              <li>
                <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>: the foundation
                of all my frontend work. I also have experience using
                <b>Tailwind CSS</b> and <b>Bootstrap</b> to style interfaces, I
                enjoy the flexibility of utility first design with Tailwind and
                the speed of prototyping with Bootstrap.
              </li>
              <li>
                <b>Vue.js</b>: a library I'm currently exploring more deeply. I
                really like its reactivity and how approachable it feels.
              </li>
              <li>
                <b>TypeScript</b>: I've started using it in projects to add type
                safety and clarity, especially when working with Vue components.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex-1 text-center">
        <img
          src="/skills-content.png"
          class="rounded-2xl object-cover w-full"
        />
        <a
          class="pi pi-github text-white text-7xl pt-10 hover:drop-shadow-lg hover:text-blue-200 hover:rotate-45 transition-all duration-300"
          href="https://github.com/efive-dev"
          target="_blank"
          alt="My github"
        ></a>
      </div>
    </div>
    <div class="flex justify-center">
      <BounceCards
        :images="images"
        :container-width="1200"
        :container-height="300"
        :animation-delay="1"
        :animation-stagger="0.06"
        ease-type="elastic.out(1, 0.8)"
        :transform-styles="transformStyles"
        :enable-hover="true"
      />
    </div>
    >

    <div class="text-white pt-3 text-left text-2xl">
      <h2 class="font-extrabold text-3xl">Always Learning:</h2>
      <p class="pt-2">
        I'm currently learning <b>Ruby on Rails</b> out of curiosity and
        admiration for its "<i>convention over configuration</i>" approach. I'm
        particularly enjoying its developer-friendly ecosystem and focus on
        productivity.
      </p>
      <p class="pt-2">
        Beyond frameworks and languages, I'm also constantly working on
        improving my broader <b>technical</b> and <b>soft</b> skills. I put a
        strong emphasis on writing
        <i>clean, testable, and maintainable code</i>, and I'm always looking to
        better understand <i>software design principles</i> and
        <i>architecture</i>.
      </p>
      <p class="pt-2">
        I value <b>communication</b> and <b>teamwork</b>. I enjoy discussing
        solutions with others, receiving and giving constructive feedback, and
        being part of a collaborative environment. I believe that
        <i>empathy, patience,</i> and a <i>growth mindset</i> are just as
        important as technical skills when working on meaningful projects.
      </p>
      <p class="pt-2">
        Whether it's learning a new language, digging deeper into software
        patterns, or just becoming a better problem-solver and collaborator, I
        genuinely enjoy the process of growing as both a developer and a person.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitText from "../components/SplitText.vue";
import BounceCards from "../components/BounceCards.vue";

const images = [
  "/icons/go-original-wordmark.svg",
  "/icons/javascript-original.svg",
  "/icons/typescript-original.svg",
  "/icons/vuejs-original.svg",
  "/icons/tailwindcss-original.svg",
  "/icons/java-original.svg",
  "/icons/python-original.svg",
];

const transformStyles = [
  "rotate(3deg) translate(-600px)",
  "rotate(-1deg) translate(-400px)",
  "rotate(-4deg) translate(-200px)",
  "rotate(0deg) translate(0px)",
  "rotate(-5deg) translate(200px)",
  "rotate(5deg) translate(400px)",
  "rotate(-5deg) translate(600px)",
];
</script>
