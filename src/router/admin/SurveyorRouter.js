
import Surveyor from "../../views/admin/surveyor/Surveyor";

export default [
  {
    path: "surveyor",
    name: "Surveyor",
    component: Surveyor,
  },

  {
    path: "add_surveyor",
    name: "AddSurveyor",
    component: () => import("../../views/admin/surveyor/AddSurveyor.vue"),
  },

  {
    path: "edit_surveyor/:id",
    name: "EditSurveyor",
    component: () => import("../../views/admin/surveyor/EditSurveyor.vue"),
  },
  {
    path: "starrating",
    name: "StarRatings",
    component: () => import("../../components/Admin/StarRatings.vue"),
  },
  {
    path: "surveyor/surveyor_details/:user_id",
    name: "SurveyorDetails",
    component: () => import("../../views/admin/surveyor/SurveyorDetails.vue"),
  }

];
