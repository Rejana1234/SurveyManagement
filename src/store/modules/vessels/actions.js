import {http} from "../../../service/http_service";

export const get_all_vessel = ({commit}) => {
    return http().get('v1/vessel').then(res => {
        commit('ALL_VESSELS', res.data);
    })
};

export const get_vessel = ({commit}, data) => {
    return http().get('v1/vessel/getData?'+data).then(res => {
        commit('GET_VESSELS', res.data);
    })
};

export const add_vessel = ({commit}, data) => {
    return http().post('v1/vessel/store', data).then(res => {
        commit('ADD_VESSELS', res.data);
    })
};

export const edit_vessel = ({commit}, id) => {
    return http().get(`v1/vessel/edit/${id}`).then(res => {
        commit('EDIT_VESSELS', res.data.vessel);
    })
};

export const update_vessel = ({commit}, {id, data}) => {
    return http().post(`v1/vessel/update/${id}`, data).then(res => {
        commit('UPDATE_VESSELS', res.data);
    })
};

export const delete_vessel = ({commit}, id) => {
    return http().delete(`v1/vessel/destroy/${id}`).then(res => {
        commit('DELETE_VESSELS', {id:id, data:res.data});
    })
};