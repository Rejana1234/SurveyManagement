import Client from "../../views/admin/client/Client";

export default [
  {
    path: "client",
    name: "Client",
    component:Client,
  },

  {
    path: "add_client",
    name: "AddClient",
    component: () => import("../../views/admin/client/AddClient.vue"),
  },

  {
    path: "edit_client/:id",
    name: "EditClient",
    component: () => import("../../views/admin/client/EditClient.vue"),
  },
];
