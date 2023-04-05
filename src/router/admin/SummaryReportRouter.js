export default[
    {
        path: "add_summary_report/:survey_id",
        name: "AddSummaryReport",
        component: () => import("../../views/admin/report/summary_report/AddSummaryReport.vue")
    },

    {
        path: "edit_summary_report/:survey_id/:summary_id",
        name: "EditSummaryReport",
        component: () => import("../../views/admin/report/summary_report/EditSummaryReport.vue")
    }
]