import {http} from "../../../service/http_service";

export const get_all_consign = ({commit}) => {
    return http().get('v1/cf_consignee').then(res => {
        commit('ALL_CONSIGN', res.data);
    })
};

export const get_consign = ({commit}, data) => {
    return http().get('v1/cf_consignee/getData?'+data).then(res => {
        commit('GET_CONSIGN', res.data);
    })
};

export const add_consign = ({commit}, data) => {
    return http().post('v1/cf_consignee/store', data).then(res => {
        commit('ADD_CONSIGN', res.data);
    })
};

export const edit_consign = ({commit}, id) => {
    return http().get(`v1/cf_consignee/edit/${id}`).then(res => {
        commit('EDIT_CONSIGN', res.data.cfconsigne);
    })
};

export const update_consign = ({commit}, {id, data}) => {
    return http().post(`v1/cf_consignee/update/${id}`, data).then(res => {
        commit('UPDATE_CONSIGN', res.data);
    })
};

export const delete_consign = ({commit}, id) => {
    return http().delete(`v1/cf_consignee/destroy/${id}`).then(res => {
        commit('DELETE_CONSIGN', {id:id, data:res.data});
    })
};