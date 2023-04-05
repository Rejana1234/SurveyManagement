import Department from "../../views/admin/Department/Department";

export default [
  {
    path: "department",
    name: "Department",
    component: Department,
  },

  {
    path: "add_department",
    name: "AddDepartment",
    component: () => import("../../views/admin/Department/AddDepartment.vue"),
  },

  {
    path: "edit_department/:id",
    name: "EditDepartment",
    component: () => import("../../views/admin/Department/EditDepartment.vue"),
  },
];
