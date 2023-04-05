import { http } from "../../../service/http_service";

export const get_all_quantity = ({commit}) => {
  return http().get('v1/quantities').then(res => {
      commit('ALL_QUANTITY', res.data);
  })
};

export const get_quantity = ({ commit }, data) => {
  return http()
    .get("v1/quantities/getData?" + data)
    .then((res) => {
      commit("GET_QUANTITY", res.data);
    });
};

export const add_quantity = ({ commit }, data) => {
  return http()
    .post("v1/quantities/store", data)
    .then((res) => {
      commit("ADD_QUANTITY", res.data);
    });
};

export const edit_quantity = ({ commit }, id) => {
  return http()
    .get(`v1/quantities/edit/${id}`)
    .then((res) => {
      commit("EDIT_QUANTITY", res.data.quantity);
    });
};

export const update_quantity = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/quantities/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_QUANTITY", res.data);
    });
};

export const delete_quantity = ({ commit }, id) => {
  return http()
    .delete(`v1/quantities/destroy/${id}`)
    .then((res) => {
      commit("DELETE_QUANTITY", { id: id, data: res.data });
    });
};
