import Dimension from "../../views/admin/dimension/Dimension";
import AddDimension from "../../views/admin/dimension/AddDimension";
import EditDimension from "../../views/admin/dimension/EditDimension";

export default [
  {
    path: "dimension",
    name: "Dimension",
    component: Dimension,
  },
  {
    path: "add-dimension",
    name: "AddDimension",
    component: AddDimension,
  },
  {
    path: "edit-dimension/:id",
    name: "EditDimension",
    component: EditDimension,
  },
];
