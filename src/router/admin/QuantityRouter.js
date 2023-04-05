import Quantity from "../../views/admin/quantity/Quantity";
import AddQuantity from "../../views/admin/quantity/AddQuantity";
import EditQuantity from "../../views/admin/quantity/EditQuantity";

export default [
  {
    path: "quantity",
    name: "Quantity",
    component: Quantity,
  },
  {
    path: "add-quantity",
    name: "AddQuantity",
    component: AddQuantity,
  },
  {
    path: "edit-quantity/:id",
    name: "EditQuantity",
    component: EditQuantity,
  },
];
