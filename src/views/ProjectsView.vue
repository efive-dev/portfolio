<template>
  <div class="w-full h-screen">
    <div class="p-6 md:p-10">
      <div class="flex flex-col md:flex-row items-start gap-6 md:gap-10">
        <div class="flex-3">
          <div class="flex flex-col md:flex-row md:items-start">
            <SplitText
                text="Notable projects"
                class-name="text-3xl sm:text-5xl md:text-5xl xl:text-9xl font-bold text-white leading-tight"
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
              <li>
                <a
                    class="text-white text-right font-extrabold hover:underline"
                    href="https://github.com/efive-dev/efive-dev"
                    target="_blank"
                >Check out my Github page!
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- ScrollStack for medium and large screens -->
    <ScrollStack
        class="hidden xl:block"
        :item-distance="120"
        :item-scale="0.05"
        :item-stack-distance="40"
        stack-position="30%"
        scale-end-position="15%"
        :base-scale="0.9"
        :rotation-amount="2"
        :blur-amount="1"
    >
      <ScrollStackItem class="text-2xl text-white border-2 bg-black">
        <div
            class="flex flex-col md:flex-row items-start justify-center gap-20"
        >
          <div class="flex-3">
            <h2 class="text-3xl font-extrabold">
              <a
                  class="hover:underline"
                  href="https://github.com/efive-dev/QuattriniTrack"
                  target="_blank"
              >QuattriniTrack:</a
              >
            </h2>
            <p>
              A personal finance manager built with Go that helps you track
              expenses through an elegant terminal interface. Named after the
              Florentine word for "money," QuattriniTrack combines the power of
              a REST API with the simplicity of a terminal UI, letting you
              manage your budget without leaving the command line.
            </p>
            <p>
              Features secure JWT authentication, SQLite database with type-safe
              queries via SQLC, and transaction categorization. Whether you
              prefer the sleek TUI or direct API calls, QuattriniTrack gives you
              complete control over your financial data with the reliability of
              Go's robust ecosystem.
            </p>
          </div>
          <div class="flex-1">
            <img src="/icons/go-original-wordmark.svg" alt="go logo"/>
          </div>
        </div>
      </ScrollStackItem>
      <ScrollStackItem class="bg-white text-black text-2xl">
        <div
            class="flex flex-col md:flex-row items-start justify-center gap-20"
        >
          <div class="flex-3">
            <h2 class="text-3xl font-extrabold">
              <a
                  class="hover:underline"
                  href="https://github.com/efive-dev/PianPianino"
                  target="_blank"
              >PianPianino</a
              >:
            </h2>
            <p>
              A personal task manager built with Go and Vue.js, designed to help
              you organize your day slowly. Inspired by the Florentine phrase
              "vai pianino" ("take it easy"), PianPianino is a web-based to-do
              app that gently nudges you toward productivity without
              overwhelming you.
            </p>
            <p>
              Backed by a REST API with secure JWT authentication and powered by
              Bun ORM and a SQLite database, PianPianino offers an intuitive
              frontend using Vue and Naive UI. Whether you're sorting tasks by
              priority or just ticking off your daily list, it balances
              simplicity and structure with a charmingly laid-back approach to
              time management.
            </p>
          </div>
          <div class="flex flex-col items-center justify-center">
            <img
                src="/icons/go-original-wordmark.svg"
                alt="go logo"
                class="w-32"
            />
            <img src="/icons/vuejs-original.svg" alt="vue logo" class="w-32"/>
          </div>
        </div>
      </ScrollStackItem>
      <ScrollStackItem class="text-2xl text-white border-2 bg-black">
        <div
            class="flex flex-col md:flex-row items-start justify-center gap-20"
        >
          <div class="flex-3">
            <h2 class="text-3xl font-extrabold">
              <a
                  href="https://github.com/efive-dev/portfolio"
                  target="_blank"
                  class="hover:underline"
              >This Website</a
              >:
            </h2>
            <p>
              A modern portfolio website built with Vue and Vue Router, designed
              to showcase projects and personal information through a clean and
              intuitive interface. With smooth client-side routing and
              responsive design.
            </p>
            <p>
              Styled with a minimalist aesthetic and built for performance, the
              site emphasizes clarity and structure. Whether you're viewing
              detailed project pages or learning more about me, the design stays
              out of the way letting the work speak for itself.
            </p>
          </div>
          <div class="flex-1">
            <img src="/icons/vuejs-original.svg" alt="vue logo" class="w-60"/>
          </div>
        </div>
      </ScrollStackItem>
      <ScrollStackItem class="bg-white text-black text-2xl">
        <div
            class="flex flex-col md:flex-row items-start justify-center gap-20"
        >
          <div class="flex-3">
            <h2 class="text-3xl font-extrabold">
              <a
                  href="https://github.com/efive-dev/tempodoro"
                  target="_blank"
                  class="hover:underline"
              >Tempodoro</a
              >
              and its
              <a
                  href="https://github.com/efive-dev/tempodoro-tui"
                  target="_blank"
                  class="hover:underline"
              >Tui</a
              >:
            </h2>
            <p>
              A modern Pomodoro productivity tool built with Java Spring Boot
              and a secure REST API, designed to help you manage focus and break
              sessions effortlessly. With robust JWT authentication and
              customizable session settings, it keeps your workflow smooth and
              secure.
            </p>
            <p>
              Built for simplicity and flexibility, Tempodoro tracks your
              session history with filtering options and integrates easily with
              frontend clients or tools like the provided Python TUI. Its clean
              API and reliable backend let you focus on what matter your
              productivity.
            </p>
          </div>
          <div class="flex-1">
            <img
                src="/icons/spring-original.svg"
                alt="spring logo"
                class="w-60"
            />
          </div>
        </div>
      </ScrollStackItem>
    </ScrollStack>

    <!-- Simple paragraphs for small screens -->
    <div class="block xl:hidden px-5 pb-10">
      <!-- Project 1 - Black background -->
      <div class="bg-black text-white p-6 mb-4 rounded-lg border-2">
        <h2 class="text-2xl font-extrabold mb-4">
          <a
              class="hover:underline"
              href="https://github.com/efive-dev/QuattriniTrack"
              target="_blank"
          >QuattriniTrack:</a>
        </h2>
        <div class="flex flex-col gap-4">
          <p>
            A personal finance manager built with Go that helps you track
            expenses through an elegant terminal interface. Named after the
            Florentine word for "money," QuattriniTrack combines the power of
            a REST API with the simplicity of a terminal UI, letting you
            manage your budget without leaving the command line.
          </p>
          <p>
            Features secure JWT authentication, SQLite database with type-safe
            queries via SQLC, and transaction categorization. Whether you
            prefer the sleek TUI or direct API calls, QuattriniTrack gives you
            complete control over your financial data with the reliability of
            Go's robust ecosystem.
          </p>
          <div class="flex justify-center mt-4">
            <img src="/icons/go-original-wordmark.svg" alt="go logo" class="w-32"/>
          </div>
        </div>
      </div>

      <!-- Project 2 - White background -->
      <div class="bg-white text-black p-6 mb-4 rounded-lg border-2">
        <h2 class="text-2xl font-extrabold mb-4">
          <a
              class="hover:underline"
              href="https://github.com/efive-dev/PianPianino"
              target="_blank"
          >PianPianino</a>:
        </h2>
        <div class="flex flex-col gap-4">
          <p>
            A personal task manager built with Go and Vue.js, designed to help
            you organize your day slowly. Inspired by the Florentine phrase
            "vai pianino" ("take it easy"), PianPianino is a web-based to-do
            app that gently nudges you toward productivity without
            overwhelming you.
          </p>
          <p>
            Backed by a REST API with secure JWT authentication and powered by
            Bun ORM and a SQLite database, PianPianino offers an intuitive
            frontend using Vue and Naive UI. Whether you're sorting tasks by
            priority or just ticking off your daily list, it balances
            simplicity and structure with a charmingly laid-back approach to
            time management.
          </p>
          <div class="flex justify-center items-center gap-4 mt-4">
            <img src="/icons/go-original-wordmark.svg" alt="go logo" class="w-24"/>
            <img src="/icons/vuejs-original.svg" alt="vue logo" class="w-24"/>
          </div>
        </div>
      </div>

      <!-- Project 3 - Black background -->
      <div class="bg-black text-white p-6 mb-4 rounded-lg border-2">
        <h2 class="text-2xl font-extrabold mb-4">
          <a
              href="https://github.com/efive-dev/portfolio"
              target="_blank"
              class="hover:underline"
          >This Website</a>:
        </h2>
        <div class="flex flex-col gap-4">
          <p>
            A modern portfolio website built with Vue and Vue Router, designed
            to showcase projects and personal information through a clean and
            intuitive interface. With smooth client-side routing and
            responsive design.
          </p>
          <p>
            Styled with a minimalist aesthetic and built for performance, the
            site emphasizes clarity and structure. Whether you're viewing
            detailed project pages or learning more about me, the design stays
            out of the way letting the work speak for itself.
          </p>
          <div class="flex justify-center mt-4">
            <img src="/icons/vuejs-original.svg" alt="vue logo" class="w-32"/>
          </div>
        </div>
      </div>

      <!-- Project 4 - White background -->
      <div class="bg-white text-black p-6 mb-4 rounded-lg border-2">
        <h2 class="text-2xl font-extrabold mb-4">
          <a
              href="https://github.com/efive-dev/tempodoro"
              target="_blank"
              class="hover:underline"
          >Tempodoro</a>
          and its
          <a
              href="https://github.com/efive-dev/tempodoro-tui"
              target="_blank"
              class="hover:underline"
          >Tui</a>:
        </h2>
        <div class="flex flex-col gap-4">
          <p>
            A modern Pomodoro productivity tool built with Java Spring Boot
            and a secure REST API, designed to help you manage focus and break
            sessions effortlessly. With robust JWT authentication and
            customizable session settings, it keeps your workflow smooth and
            secure.
          </p>
          <p>
            Built for simplicity and flexibility, Tempodoro tracks your
            session history with filtering options and integrates easily with
            frontend clients or tools like the provided Python TUI. Its clean
            API and reliable backend let you focus on what matter your
            productivity.
          </p>
          <div class="flex justify-center mt-4">
            <img src="/icons/spring-original.svg" alt="spring logo" class="w-32"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollStack, {ScrollStackItem} from "./../components/ScrollStack.vue";
import SplitText from "./../components/SplitText.vue";
</script>