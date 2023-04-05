export default[
    {
        path: "add_final_report/:survey_id",
        name: "AddFinalReport",
        component: () => import("../../views/admin/report/final_report/AddFinalReport.vue")
    },

    {
        path: "edit_final_report/:survey_id/:final_report_id",
        name: "EditFinalReport",
        component: () => import("../../views/admin/report/final_report/EditFinalReport.vue")
    }
]