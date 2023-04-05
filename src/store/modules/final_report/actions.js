import { http } from "@/service/http_service";

export const get_client = ({commit}) => {
    return http().get('v1/final_report/client').then((result) => {
        commit("GET_ALL_CLIENTS", result.data.clients)
    }).catch((err) => {
        console.log(err);
    });
};

export const get_applicant = ({commit}, survey_id) => {
    return http().get(`v1/final_report/applicant/${survey_id}`).then((result) => {
        commit("GET_ALL_APPLICANT", result.data)
    }).catch((err) => {
        console.log(err);
    });
};

export const add_final_report = ({commit}, data) => {
    return http().post('v1/final_report/store', data).then((result) => {
        commit("STORE_FINAL_REPORT", result.data)
    }).catch((err) => {
        console.log(err);
    });
};

export const edit_final_report = ({commit}, id) => {
    return http().get(`v1/final_report/edit/${id}`).then((result) => {
        commit("EDIT_FINAL_REPORT", result.data.final_report)
    }).catch((err) => {
        console.log(err);
    });
};

export const update_final_report = ({commit}, {id, data}) => {
    return http().post(`v1/final_report/update/${id}`, data).then((result) => {
        commit("UPDATE_FINAL_REPORT", result.data)
    }).catch((err) => {
        console.log(err);
    });
};

export const delete_final_report = ({commit}, id) => {
    return http().delete(`v1/final_report/destroy/${id}`).then((result) => {
        commit("DELETE_FINAL_REPORT", {id:id, data:result.data})
    }).catch((err) => {
        console.log(err);
    });
};