import FinalPackingList from "../../views/admin/final_packing_list/FinalPackingList";

export default [
  {
    path: "final_packing_list",
    name: "FinalPackingList",
    component: FinalPackingList,
  },

  {
    path: "add_final_packing_list",
    name: "AddFinalPackingList",
    component: () =>
      import("../../views/admin/final_packing_list/AddFinalPackingList.vue"),
  },

  {
    path: "edit_final_packing_list/:id",
    name: "EditFinalPackingList",
    component: () =>
      import("../../views/admin/final_packing_list/EditFinalPackingList.vue"),
  },
];
