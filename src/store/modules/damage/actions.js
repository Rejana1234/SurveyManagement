import { http } from "../../../service/http_service";

export const get_damage = ({ commit }, data) => {
  return http()
    .get("v1/damage/getData?" + data)
    .then((res) => {
      commit("GET_DAMAGE", res.data);
    });
};

export const add_damage = ({ commit }, data) => {
  return http()
    .post("v1/damage/store", data)
    .then((res) => {
      commit("ADD_DAMAGE", res.data);
    });
};

export const edit_damage = ({ commit }, id) => {
  return http()
    .get(`v1/damage/edit/${id}`)
    .then((res) => {
      commit("EDIT_DAMAGE", res.data.damage);
    });
};

export const update_damage = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/damage/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_DAMAGE", res.data);
    });
};

export const delete_damage = ({ commit }, id) => {
  return http()
    .delete(`v1/damage/destroy/${id}`)
    .then((res) => {
      commit("DELETE_DAMAGE", { id: id, data: res.data });
    });
};
