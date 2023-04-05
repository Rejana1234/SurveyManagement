// import { http } from "../../../service/http_service";
import { httpAuth } from "../../../service/login_service";

export const get_all_permission = ({commit}) => {
    return httpAuth().get("access/v1/permission").then(res => {
        commit("GET_ALL_PERMISSION", res.data.permission)
    });
};

export const get_permission = ({ commit }, data) => {
  return httpAuth()
    .get("access/v1/permission/getData?" + data)
    .then((res) => {
      commit("GET_PERMISSION", res.data);
    });
};

export const add_permission = ({ commit }, data) => {
  return httpAuth()
    .post("access/v1/permission/store", data)
    .then((res) => {
      commit("ADD_PERMISSION", res.data);
    });
};

export const edit_permission = ({ commit }, id) => {
  return httpAuth()
    .get(`access/v1/permission/edit/${id}`)
    .then((res) => {
      commit("EDIT_PERMISSION", res.data.permission);
    });
};

export const update_permission = ({ commit }, { id, data }) => {
  return httpAuth()
    .post(`access/v1/permission/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_PERMISSION", res.data);
    });
};

export const delete_permission = ({ commit }, id) => {
  return httpAuth()
    .delete(`access/v1/permission/destroy/${id}`)
    .then((res) => {
      commit("DELETE_PERMISSION", { id: id, data: res.data });
    });
};
