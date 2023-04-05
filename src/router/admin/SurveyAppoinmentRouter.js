// import Surveyor_Appoint from "../../views/admin/surveyor_appointment/AppointSurveyor";
// import Appointment from "../../views/admin/surveyor_appointment/Appointment";

export default [
  
  {
    path: "appointment",
    name: "Appointment",
    component: () => import("../../views/admin/surveyor_appointment/Appointment.vue"),
},



  {
    path: "edit_surveyorappoint/:id",
    name: "EditAppointSurveyor",
    component: () =>
      import("../../views/admin/surveyor_appointment/EditAppointSurveyor.vue"),
  },
];
