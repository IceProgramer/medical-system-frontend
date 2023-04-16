import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPage from "@/pages/IndexPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import UserFavourPage from "@/pages/UserFavourPage.vue";
import UserThumbPage from "@/pages/UserThumbPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/index",
    component: IndexPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/favour",
    component: UserFavourPage,
  },
  {
    path: "/thumb",
    component: UserThumbPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
