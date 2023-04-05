import { http } from "../../../service/http_service";

export const get_all_category = ({ commit }) => {
  return http().get('v1/category').then(res => {
    commit('ALL_CATEGORY', res.data);
  })
};

export const get_category = ({ commit }, data) => {
  return http()
    .get("v1/category/getData?" + data)
    .then((res) => {
      commit("GET_CATEGORY", res.data);
    });
};

export const add_category = ({ commit }, data) => {
  return http()
    .post("v1/category/store", data)
    .then((res) => {
      commit("ADD_CATEGORY", res.data);
    });
};

export const edit_category = ({ commit }, id) => {
  return http()
    .get(`v1/category/edit/${id}`)
    .then((res) => {
      commit("EDIT_CATEGORY", res.data.category);
    });
};

export const update_category = ({ commit }, { id, data }) => {
  return http().post(`v1/category/update/${id}`, data).then((res) => {
    console.log(res.data);
    commit("UPDATE_CATEGORY", res.data);
  });
};

export const delete_category = ({ commit }, id) => {
  return http()
    .delete(`v1/category/destroy/${id}`)
    .then((res) => {
      commit("DELETE_CATEGORY", { id: id, data: res.data });
    });
};
