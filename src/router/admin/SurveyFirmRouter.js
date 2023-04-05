import SurveyFirm from "../../views/admin/survey_firm/SurveyFirm";
import AddSurveyFirm from "../../views/admin/survey_firm/AddSurveyFirm";
import EditSurveyFirm from "../../views/admin/survey_firm/EditSurveyFirm";

export default [
  {
    path: "surveyFirm",
    name: "SurveyFirm",
    component: SurveyFirm,
  },
  {
    path: "add_surveyFirm",
    name: "AddSurveyFirm",
    component: AddSurveyFirm,
  },
  {
    path: "edit_surveyFirm/:id",
    name: "EditSurveyFirm",
    component: EditSurveyFirm,
  },
];
