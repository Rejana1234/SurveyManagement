import Surveyor_Appoint from "../../views/admin/surveyor_appointment/AppointSurveyor";

export default [
  
  {
    path: "survey/add_surveyorappoint/:id",
    name: "AddAppointSurveyor",
    component: () =>
      import("../../views/admin/surveyor_appointment/AddAppointSurveyor"),
  },

  {
    path: "survey/surveyorappoint",
    name: "Surveyor_Appoint",
    component: Surveyor_Appoint,
  },

  {
    path: "edit_survey/:id",
    name: "EditSurvey",
    component: () => import("../../views/admin/survey/EditSurvey.vue"),
  },
  {
    path: "survey",
    name: "Survey",
    component: () => import("../../views/admin/survey/SurveyList.vue"),
  },
];
