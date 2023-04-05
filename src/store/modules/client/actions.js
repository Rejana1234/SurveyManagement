import {http} from "../../../service/http_service";

export const get_all_client = ({commit}) => {
    return http().get('v1/clients').then(res => {
        commit('ALL_CLIENT', res.data);
    })
};

export const get_client = ({commit}, data) => {
    return http().get('v1/clients/getData?'+data).then(res => {
        commit('GET_CLIENT', res.data);
    })
};

export const add_client = ({commit}, data) => {
    return http().post('v1/clients/store', data).then(res => {
        commit('ADD_CLIENT', res.data);
    })
};

export const edit_client = ({commit}, id) => {
    return http().get(`v1/clients/edit/${id}`).then(res => {
        commit('EDIT_CLIENT', res.data.client);
    })
};

export const update_client = ({commit}, {id, data}) => {
    return http().post(`v1/clients/update/${id}`, data).then(res => {
        commit('UPDATE_CLIENT', res.data);
    })
};

export const delete_client = ({commit}, id) => {
    return http().delete(`v1/clients/destroy/${id}`).then(res => {
        commit('DELETE_CLIENT', {id:id, data:res.data});
    })
};