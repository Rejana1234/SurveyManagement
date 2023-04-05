import { http, httpFile } from "@/service/http_service";

export const getOtherReport = ({commit}) => {
    return http().get('v1/other_report').then((result) => {
        commit("GET_ALL_OTHER_REPORT", result.data.others_report)
    }).catch((err) => {
        console.log(err);
    });
}; 

export const store_other_report = ({commit}, data) => {
    return httpFile().post('v1/others_report/store', data).then((result) => {
        commit("STORE_OTHER_REPORT", result.data)
    }).catch((err) => {
        console.log(err);
    });
};

export const edit_other = ({commit}, id) => {
    return http().get(`v1/others_report/edit/${id}`).then((result) => {
        commit("EDIT_OTHER_REPORT", result.data.other_report);
    }).catch((err) => {
        console.log(err);
    });
};

export const update_other_report = ({commit}, {id, data}) => {
    return http().post(`v1/others_report/update/${id}`, data).then((result) => {
        commit("UPDATE_OTHER_REPORT", result.data);
    }).catch((err) => {
        console.log(err);
    });
};

export const delete_other_report = ({commit},id) => {
    return http().delete(`v1/others_report/destroy/${id}`).then((result) => {
        commit("DELETE_OTHER_REPORT", {id:id, data:result.data});
    }).catch((err) => {
        console.log(err);
    });
};



