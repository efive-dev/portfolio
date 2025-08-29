import {createRouter, createWebHistory} from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutMeView from "../views/AboutMeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import AboutMeContent from "../views/AboutMeContent.vue";
import WhyMeContent from "../views/WhyMeContent.vue";
import SkillContent from "../views/SkillContent.vue";
import GartView from "../views/GartView.vue";

const routes = [
    {path: "/", component: HomeView},
    {path: "/about-me", component: AboutMeView},
    {path: "/projects", component: ProjectsView},
    {path: "/about-me/contents", component: AboutMeContent},
    {path: "/about-me/why-me", component: WhyMeContent},
    {path: "/about-me/skills", component: SkillContent},
    {path: "/gart", component: GartView},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
