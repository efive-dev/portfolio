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
          <ul
            class="ml-auto mt-15 border-white border-t-2 border-b-2 text-2xl p-2"
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
          <h2 class="font-extrabold text-3xl">Technical Foundation:</h2>
          <p class="ps-5">
            I have a <b>strong background</b> in <b>computer science</b>,
            developed through <i>academic work</i> and <i>personal projects</i>.
            I focus on writing <b>clean, testable, and maintainable code</b>.
            Solving complex problems and turning them into
            <b>clear, efficient solutions</b> is something I truly enjoy.
          </p>

          <h2 class="font-extrabold text-3xl mt-5">Passion for Learning:</h2>
          <p class="ps-5">
            What sets me apart is my <b>curiosity</b>. I'm constantly exploring
            new <i>languages</i>, <i>tools</i>, and <i>ideas</i>. Recently, I've
            been diving into <b>Kotlin</b>, not out of necessity, but because
            I'm genuinely interested in how <i>different ecosystems</i> solve
            common problems.
          </p>

          <h2 class="font-extrabold text-3xl mt-5">Team-Oriented Approach:</h2>
          <p class="ps-5">
            I care deeply about <b>collaboration</b>. I value
            <b>clear communication</b>, <i>constructive feedback</i>, and
            <b>shared problem solving</b>. Whether in a <i>team setting</i> or
            <i>pair programming</i>, I work to support a <b>positive</b> and
            <b>productive environment</b>.
          </p>

          <h2 class="font-extrabold text-3xl mt-5">Growth Mindset:</h2>
          <p class="ps-5">
            My goal is <b>continuous improvement</b>, both
            <i>technically</i> and <i>personally</i>. I believe in staying
            <b>humble</b>, <i>asking questions</i>, and
            <i>learning from mistakes</i>. Every project is an opportunity to
            <b>grow</b> and <b>contribute something meaningful</b>.
          </p>

          <h2 class="font-extrabold text-3xl mt-5">Why Me?</h2>
          <p class="ps-5">
            If you're looking for someone who is <b>technically solid</b>,
            <b>eager to learn</b>, and committed to being a
            <b>thoughtful teammate</b>, I'd be excited to bring my
            <b>skills</b> and <b>energy</b> to your project or team.
          </p>
        </div>
      </div>

      <div class="flex-1 text-center">
        <img
          src="/whyme-contents.png"
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
  </div>
</template>

<script setup lang="ts">
import SplitText from "../components/SplitText.vue";
</script>
