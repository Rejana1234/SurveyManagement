import store from "../../store";

import Dashboard from "../../views/admin/Dashboard";
import DepartmentRouter from "./DepartmentRouter";
import DamageRouter from "./DamageRouter";
import StyleRouter from "./StyleRouter";
import PermissionRouter from "./PermissionRouter";
import RoleRouter from "./RoleRouter";
import DimensionRouter from "./DimensionRouter";
import QuantityRouter from "./QuantityRouter";
import VesselsRouter from "./VesselsRouter";
import SurveyorRouter from "./SurveyorRouter";
import C_F_ConsignRouter from "./C_F_ConsignRouter";
import ClientRouter from "./ClientRouter";
import FinalPackingListRouter from "./FinalPackingListRouter";
import Work_OrderRouter from "./Work_OrderRouter";
import SurveyRouter from "./SurveyRouter";
import SurveyAppoinmentRouter from "./SurveyAppoinmentRouter";

import CarrierAgentRouter from "./CarrierAgentRouter";
import UserRouter from "./UserRouter";
import CategoryRouter from "./CategoryRouter";
import ReportRouter from "./ReportRouter";
import SurveyFirmRouter from "./SurveyFirmRouter";
import InvoiceRouter from "./InvoiceRouter";
import CargoRouter from "./CargoRouter";
import SummaryReportRouter from "./SummaryReportRouter";
import FinalRouter from "./FinalRouter";
import OtherReportRouter from "./OtherReportRouter";

export default [
  {
    path: "/dashboard",

    component: Dashboard,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../../views/admin/Home.vue"),
      },

      {
        path: "attendance",
        name: "Attendance",
        component: () => import("../../views/admin/attandance/Attandance.vue"),
      },

      {
        path: "profile",
        name: "Profile",
        component: () => import("../../views/admin/Profile.vue"),
      },

      {
        path: "change_password",
        name: "ChangePassword",
        component: () => import("../../views/admin/ChangePassword.vue"),
      },
      {
        path: "form",
        name: "Form",
        component: () => import("../../views/admin/Form.vue"),
      },

      ...DepartmentRouter,
      ...DamageRouter,
      ...StyleRouter,
      ...PermissionRouter,
      ...RoleRouter,
      ...DimensionRouter,
      ...QuantityRouter,
      ...VesselsRouter,
      ...SurveyorRouter,
      ...C_F_ConsignRouter,
      ...ClientRouter,
      ...FinalPackingListRouter,
      ...Work_OrderRouter,
      ...SurveyRouter,
      ...SurveyAppoinmentRouter,
      ...CarrierAgentRouter,
      ...UserRouter,
      ...CategoryRouter,
      ...ReportRouter,
      ...SurveyFirmRouter,
      ...InvoiceRouter,
      ...CargoRouter,
      ...SummaryReportRouter,
      ...FinalRouter,
      ...OtherReportRouter
    ],

    beforeEnter(to, from, next) {
      if (!store.getters["AuthToken"]) {
        return next({
          name: "Login",
        });
      } else {
        next();
      }
    },
  },
];
