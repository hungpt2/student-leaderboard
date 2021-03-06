import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import StudentsLeaderboard from "../views/home";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "StudentsLeaderboard",
    component: StudentsLeaderboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
