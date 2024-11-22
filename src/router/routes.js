const routes = [

  {
    path: "/",
    component: () => import("components/auth/LoginForm.vue"),
  },

  {
    path: "/dashboard/movie",
    component: () => import("components/movie/MovieDb.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
