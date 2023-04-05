// import Client from "../../views/admin/client/Client";

export default [
  // {
  //   path: "client",
  //   name: "Client",
  //   component:Client,
  // },

  {
    path: "multiple",
    name: "AddMultiple",
    component: () => import("../../views/admin/cargos/multipleFileUpload.vue"),
  },

  {
    path: "edit_cargo/:id",
    name: "EditCargo",
    component: () => import("../../views/admin/cargos/EditCargo.vue"),
  },
];
