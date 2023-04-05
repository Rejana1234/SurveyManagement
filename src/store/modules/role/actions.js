// import { http } from "../../../service/http_service";
import { httpAuth } from "../../../service/login_service";

export const get_role = ({ commit }) => {
  return httpAuth()
    .get("access/v1/role")
    .then((res) => {
      commit("GET_ALL_ROLE", res.data.roles);
    });
};

export const add_role = ({ commit }, data) => {
  return httpAuth()
    .post("access/v1/role/store", data)
    .then((res) => {
      commit("ADD_ROLE", res.data);
    });
};

export const edit_role = ({ commit }, id) => {
  return httpAuth()
    .get(`access/v1/role/edit/${id}`)
    .then((res) => {
      commit("EDIT_ROLE", res.data);
    });
};

export const update_role = ({ commit }, { id, data }) => {
  return httpAuth()
    .post(`access/v1/role/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_ROLE", res.data);
    });
};

export const delete_role = ({ commit }, id) => {
  return httpAuth()
    .delete(`access/v1/role/destroy/${id}`)
    .then((res) => {
      commit("DELETE_ROLE", { id: id, data: res.data });
    });
};
