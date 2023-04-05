import Damage from "../../views/admin/damage/Damage";
import AddDamage from "../../views/admin/damage/AddDamage";
import EditDamage from "../../views/admin/damage/EditDamage";

export default [
  {
    path: "damage",
    name: "Damage",
    component: Damage,
  },
  {
    path: "add-damage",
    name: "AddDamage",
    component: AddDamage,
  },
  {
    path: "edit-damage/:id",
    name: "EditDamage",
    component: EditDamage,
  },
];
