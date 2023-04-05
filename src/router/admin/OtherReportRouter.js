export default[
    {
        path: "add_other_report/:survey_id",
        name: "AddOtherReport",
        component: () => import("../../views/admin/report/other_report/AddOtherReport.vue")
    },

    {
        path: "edit_other_report/:survey_id/:other_report_id",
        name: "EditOtherReport",
        component: () => import("../../views/admin/report/other_report/EditOtherReport.vue")
    }
]