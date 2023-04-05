import Category from "../../views/admin/category/Category";

export default [
  {
    path: "category",
    name: "Category",
    component: Category,
  },

  {
    path: "add_category",
    name: "AddCategory",
    component: () => import("../../views/admin/category/AddCategory.vue"),
  },

  {
    path: "edit_category/:id",
    name: "EditCategory",
    component: () => import("../../views/admin/category/EditCategory.vue"),
  },
  {
    path: "category/description/:id",
    name: "CategoryDescription",
    component: () => import("../../views/admin/category/CategoryDescription.vue"),
  },
];
