import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import LoginOTP from "../views/LoginOTP.vue"
import Signup from "../views/Signup.vue";
import User from "../views/User.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/loginotp",
    name: "LoginOTP",
    component: LoginOTP
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/signupsuccessful",
    name: "SignupSuccessful",
    component: () =>
      import(/* webpackChunkName: "signupsuccessful" */ "../views/SignupSuccessful.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
