import { http } from "@/service/http_service";

export const get_summary_report = ({commit}) => {
    return http().get('v1/summary_report').then((result) => {
        commit("GET_SUMMARY_REPORT", result.data.summary_report)
    }).catch((err) => {
        console.log(err);
    });
};

export const get_clients = ({commit}) => {
    return http().get('v1/summary_report/client').then((result) => {
        commit("GET_ALL_CLIENTS", result.data.clients)
    }).catch((err) => {
        console.log(err);
    });
};

export const add_summary_report = ({commit}, data) => {
    return http().post('v1/summary_report/store', data).then((result) => {
        commit("STORE_SUMMRAY_REPORT", result.data);
    }).catch((err) => {
        console.log(err);
    });
};

export const editSummaryReport = ({commit}, id) => {
    return http().get(`v1/summary_report/edit/${id}`).then((result) => {
        commit("EDIT_SUMMARY_REPORT", result.data.summary_report)
    }).catch((err) => {
        console.log(err);
    });
};

export const update_summary_report = ({commit}, {id, data}) => {
    return http().post(`v1/summary_report/update/${id}`, data).then((result) => {
        commit("UPDATE_SUMMARY_REPORT", result.data);
    }).catch((err) => {
        console.log(err);
    });
};

export const delete_summary_report = ({commit}, id) => {
    return http().delete(`v1/summary_report/destroy/${id}`).then((result) => {
        commit("DELETE_SUMMARY_REPORT", {id:id, data:result.data});
    }).catch((err) => {
        console.log(err);
    });
};