import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutMeView from "../views/AboutMeView.vue";
import ProjectsView from "../views/ProjectsView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about-me", component: AboutMeView },
  { path: "/projects", component: ProjectsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
