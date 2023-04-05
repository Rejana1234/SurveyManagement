import Vessels from "../../views/admin/vessels/Vessels";

export default [
  {
    path: "vessels",
    name: "Vessels",
    component: Vessels,
  },

  {
    path: "add_vessels",
    name: "AddVessels",
    component: () => import("../../views/admin/vessels/AddVessels.vue"),
  },

  {
    path: "edit_vessels/:id",
    name: "EditVessels",
    component: () => import("../../views/admin/vessels/EditVessels.vue"),
  },
];
