import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutMeView from "../views/AboutMeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import AboutMeContent from "../views/AboutMeContent.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about-me", component: AboutMeView },
  { path: "/projects", component: ProjectsView },
  { path: "/about-me/contents", component: AboutMeContent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
