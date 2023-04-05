import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/*import router*/
import AdminRouter from "./admin/AdminRouter";
import AuthRouter from "./auth/AuthRouter";

/*route route-list*/
const routes =[
    ...AdminRouter,
    ...AuthRouter
];

/*vue router settings*/
const router = new VueRouter({
    mode:'history',
    base: '/',
    routes:routes,
    linkExactActiveClass: "exact-active",
});

export default router