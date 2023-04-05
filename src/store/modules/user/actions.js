import { httpAuth } from "../../../service/login_service";

export const add_user = ({ commit }, data) => {
    return httpAuth().post("access/v1/user/store", data).then(res => {
        commit("ADD_USER", res.data);
    })
};

export const edit_user = ({ commit }, id) => {
    return httpAuth().get(`access/v1/user/edit/${id}`).then(res => {
        commit("EDIT_USER", res.data);
    })
};

export const update_user = ({ commit }, { id, data }) => {
    return httpAuth().post(`access/v1/user/update/${id}`, data).then(res => {
        console.log(res.data.message);
        commit("UPDATE_USER", res.data);
    })
};

export const delete_user = ({ commit }, id) => {
    return httpAuth().delete(`access/v1/user/destroy/${id}`).then(res => {
        commit("DELETE_USER", { id: id, data: res.data });
    })
};