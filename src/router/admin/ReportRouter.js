
import SurveyReports from "../../views/admin/report/DailyDischargeReport";
import AllReports from "../../views/admin/report/Reports";


export default [
  {
    path: "survey/:id",
    name: "SurveyReports",
    component: SurveyReports,
  },
  {
    path: "all_reports",
    name: "AllReports",
    component: AllReports,
  },
  
];
