import Role from "../../views/admin/role/Role";
import AddRole from "../../views/admin/role/AddRole";
import EditRole from "../../views/admin/role/EditRole";

export default [
  {
    path: "role",
    name: "role",
    component: Role,
  },
  {
    path: "add_role",
    name: "AddRole",
    component: AddRole,
  },
  {
    path: "edit_role/:id",
    name: "EditRole",
    component: EditRole,
  },
];
