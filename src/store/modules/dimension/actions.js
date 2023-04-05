import { http } from "../../../service/http_service";

export const get_dimension = ({ commit }, data) => {
  return http()
    .get("v1/dimensions/getData?" + data)
    .then((res) => {
      commit("GET_DIMENSION", res.data);
    });
};

export const add_dimension = ({ commit }, data) => {
  return http()
    .post("v1/dimensions/store", data)
    .then((res) => {
      commit("ADD_DIMENSION", res.data);
    });
};

export const edit_dimension = ({ commit }, id) => {
  return http()
    .get(`v1/dimensions/edit/${id}`)
    .then((res) => {
      commit("EDIT_DIMENSION", res.data.dimension);
    });
};

export const update_dimension = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/dimensions/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_DIMENSION", res.data);
    });
};

export const delete_dimension = ({ commit }, id) => {
  return http()
    .delete(`v1/dimensions/destroy/${id}`)
    .then((res) => {
      commit("DELETE_DIMENSION", { id: id, data: res.data });
    });
};
