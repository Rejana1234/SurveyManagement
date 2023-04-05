import { http } from "../../../service/http_service";

export const get_all_w_order = ({ commit }) => {
    return http().get('v1/work_orders').then(res => {
        commit('ALL_W_ORDER', res.data);
    })
};


export const get_w_order = ({ commit }, data) => {
    return http().get('v1/work_orders/getData?' + data).then(res => {
        commit('GET_W_ORDER', res.data);
    })
};

export const add_w_order = ({ commit }, data) => {
    return http().post('v1/work_orders/store', data).then(res => {
        commit('ADD_W_ORDER', res.data);
    })
};

export const edit_w_order = ({ commit }, id) => {
    return http().get(`v1/work_orders/edit/${id}`).then(res => {
        commit('EDIT_W_ORDER', res.data);
    })
};

export const update_w_order = ({ commit }, { id, data }) => {
    return http().post(`v1/work_orders/update/${id}`, data).then(res => {
        commit('UPDATE_W_ORDER', res.data);
    })
};

export const delete_w_order = ({ commit }, id) => {
    return http().delete(`v1/work_orders/destroy/${id}`).then(res => {
        commit('DELETE_W_ORDER', { id: id, data: res.data});
    })
};

export const w_order_details = ({ commit }, id) => {
    return http().get(`v1/work_orders/details/${id}`).then(res => {
        commit('W_ORDER_DETAILS', res.data.workOrder);
        console.log(res.data.workOrder.iml_reference_no);
    })
};
export const download_invoice = ({ commit }, id) => {
    return http()
        .get(`v1/surveys/download/${id}`)
        .then((res) => {
            commit("DOWNLOAD_SURVEY_REPORT", { id: id, data: res.data });
        });
};

export const delete_file = ({ commit }, id) => {
    return http().delete(`v1/work_orders/relevent_files/destroy/${id}`).then(res => {
        commit('DELETE_FILE', { id: id, data: res.data.relavent_file });
    })
};