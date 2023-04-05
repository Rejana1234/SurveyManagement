import WorkOrders from "../../views/admin/work_orders/WorkOrders";

export default [
  {
    path: "workorders",
    name: "WorkOrders",
    component: WorkOrders
  },

  {
    path: "add_workorders",
    name: "AddWorkOrders",
    component: () => import("../../views/admin/work_orders/AddWorkOrders.vue"),
  },

  {
    path: "edit_workorders/:id",
    name: "EditWorkOrders",
    component: () => import("../../views/admin/work_orders/EditWorkOrders.vue"),
  },
  {
    path: "workorders/add_survey/:id",
    name: "AddSurvey",
    component: () => import("../../views/admin/survey/AddSurvey.vue"),
  },
  {
    path: "workorders/details/:id",
    name: "WorkOrderDetails",
    component: () => import("../../views/admin/work_orders/WorkOrderDetails.vue"),
  },

  {
    path: "workorders_details/:id",
    name: "WorkOrderReportDetails",
    component: () => import("../../views/admin/work_orders/WorkOrdersReportDetails.vue"),
  },

];
