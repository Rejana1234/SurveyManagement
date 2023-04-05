import Consign from "../../views/admin/c_f_consign/Consign";

export default [
  {
    path: "consign",
    name: "Consign",
    component: Consign,
  },

  {
    path: "add_consign",
    name: "AddConsign",
    component: () => import("../../views/admin/c_f_consign/AddConsign.vue"),
  },

  {
    path: "edit_consign/:id",
    name: "EditConsign",
    component: () => import("../../views/admin/c_f_consign/EditConsign.vue"),
  },
];
