import { http } from "../../../service/http_service";

export const get_all_style = ({commit}) => {
  return http().get('v1/styles').then(res => {
      commit('ALL_STYLE', res.data);
  })
};

export const get_style = ({ commit }, data) => {
  return http()
    .get("v1/styles/getData?" + data)
    .then((res) => {
      commit("GET_STYLE", res.data);
    });
};

export const add_style = ({ commit }, data) => {
  return http()
    .post("v1/styles/store", data)
    .then((res) => {
      commit("ADD_STYLE", res.data);
    });
};

export const edit_style = ({ commit }, id) => {
  return http()
    .get(`v1/styles/edit/${id}`)
    .then((res) => {
      commit("EDIT_STYLE", res.data.style);
    });
};

export const update_style = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/styles/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_STYLE", res.data);
    });
};

export const delete_style = ({ commit }, id) => {
  return http()
    .delete(`v1/styles/destroy/${id}`)
    .then((res) => {
      commit("DELETE_STYLE", { id: id, data: res.data });
    });
};
