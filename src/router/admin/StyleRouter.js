import Style from "../../views/admin/style/Style";
import AddStyle from "../../views/admin/style/AddStyle";
import EditStyle from "../../views/admin/style/EditStyle";

export default [
  {
    path: "style",
    name: "Style",
    component: Style,
  },
  {
    path: "add-style",
    name: "AddStyle",
    component: AddStyle,
  },
  {
    path: "edit-style/:id",
    name: "EditStyle",
    component: EditStyle,
  },
];
