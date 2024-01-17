import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../src/components/pages/home/HomePage.vue";
import SignUp from "./components/pages/sign/SignUp.vue";
import SignIn from "./components/pages/sign/SignIn.vue";
import fullMenu from "./components/pages/menu/fullMenu.vue";
import PageDetails from "./components/pages/detailsPage/PageDetails.vue";
import MyDashboard from "./components/pages/dashboard/MyDashboard.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/fullMenu",
    name: "fullMenu",
    component: fullMenu,
  },
  {
    path: "/PageDetails/:_id",
    name: "PageDetails",
    component: PageDetails,
  },
  {
    path: "/myDashboard",
    name: "MyDashboard",
    component: MyDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
