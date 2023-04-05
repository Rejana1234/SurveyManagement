import {http} from "../../../service/http_service";

export const get_all_surveyor = ({commit}) => {
    return http().get('v1/surveyors').then(res => {
        commit('ALL_SURVEYOR', res.data);
    })
};

export const get_surveyor = ({commit}, data) => {
    return http().get('v1/surveyors/getData?'+data).then(res => {
        commit('GET_SURVEYOR', res.data);
    })
};

export const add_surveyor = ({commit}, data) => {
    return http().post('v1/surveyors/store', data).then(res => {
        commit('ADD_SURVEYOR', res.data);
    })
};

export const edit_surveyor = ({commit}, id) => {
    return http().get(`v1/surveyors/edit/${id}`).then(res => {
        commit('EDIT_SURVEYOR', res.data);
    })
};

export const update_surveyor = ({commit}, {id, data}) => {
    return http().post(`v1/surveyors/update/${id}`, data).then(res => {
        commit('UPDATE_SURVEYOR', res.data);
    })
};

export const delete_surveyor = ({commit}, id) => {
    return http().delete(`v1/surveyors/destroy/${id}`).then(res => {
        commit('DELETE_SURVEYOR', {id:id, data:res.data});
    })
};