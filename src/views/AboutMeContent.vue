<template>
  <div class="p-10">
    <div class="flex flex-col md:flex-row items-start gap-10">
      <div class="flex-3">
        <div class="flex">
          <SplitText
            text="About Me!"
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
          <h1 class="underline font-extrabold text-4xl">
            A brief introduction:
          </h1>
          <div class="ps-5">
            <p class="pt-2">
              Hi! I am <i>Quinto Edoardo</i>, a <b>young</b> aspiring
              <b>software developer</b>
              originally from Florence, Italy. I've always been quite fascinated
              by computers and their inner workings but the moment that made me
              completely fall in love with programming was my first
              <b>hello world</b> program (probably written in <i>ruby</i>). The
              feeling of being in complete control of the magical machine that
              is a computer was just great! I knew those things were powerful
              (after all they allowed me to play videogames) but I never thought
              I could actually be the one controlling them! That ignited my
              passion and I have not stopped since...
            </p>
          </div>
          <h2 class="font-extrabold text-3xl pt-3">Education:</h2>
          <div class="ps-5">
            <p class="pt-2">
              Since then, I've grown significantly, both personally and
              technically, especially through my pursuit of a Bachelor's Degree
              in Computer Science at the University of Florence, Italy. Some of
              my favorite subjects and areas of interest include:
            </p>
            <ul class="list-disc ps-15">
              <li><i>Data structures and algorithms</i></li>
              <li><b>Testable</b> code</li>
              <li><i>Software architectures</i> and <i>methodologies</i></li>
              <li>
                <b>Web development</b>, with a preference for
                <b>server-side</b> programming
              </li>
            </ul>
            <p class="pt-2">
              In <b>July 2026</b>, I will graduate, and being so close to the
              end of this wonderful <i>journey</i> fills me both with
              <b>excitement</b> and <b>joy</b>. <br />
              One thing is certain: I will never stop <i>learning</i> or being
              <i>excited about learning</i>. <br />
              Want to dive deeper into what I can do? Check out the
              <a class="font-extrabold hover:underline" href="/about-me/skills"
                >skills</a
              >
              section. Curious about some of my previous work? Head over to the
              <a class="font-extrabold hover:underline" href="/projects"
                >projects</a
              >
              section.
            </p>
          </div>
        </div>
      </div>

      <div class="flex-1 text-center">
        <img
          src="/about-me-contents.png"
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
    <div class="text-white pt-3 text-left text-2xl">
      <h2 class="font-extrabold text-3xl">Closing thoughts:</h2>
      <p class="pt-2">
        But there's more of me than just code!<br />
        Outside of <b>programming</b> and computer science, I'm also passionate
        about a few creative and active hobbies. I love to <i>skateboard</i> as
        it keeps me moving, clears my mind, and challenges me to improve, much
        like coding does. I also enjoy playing the <i>keyboards</i>, which lets
        me explore rhythm, melody, and creative expression in a totally
        different way. Whether I'm debugging code or learning a new song or
        skateboard trick, I'm always drawn to things that let me <b>build</b>,
        <b>experiment</b>, and express myself.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import SplitText from "../components/SplitText.vue";
</script>
