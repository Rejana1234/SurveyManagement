import Permission from "../../views/admin/permission/Permission";
import AddPermission from "../../views/admin/permission/AddPermission";
import EditPermission from "../../views/admin/permission/EditPermission";

export default [
  {
    path: "permission",
    name: "Permission",
    component: Permission,
  },
  {
    path: "add-permission",
    name: "AddPermission",
    component: AddPermission,
  },
  {
    path: "edit-permission/:id",
    name: "EditPermission",
    component: EditPermission,
  },
];
