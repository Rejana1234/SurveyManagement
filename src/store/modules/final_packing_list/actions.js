import { http, httpFile } from "../../../service/http_service";

export const get_all_final_packing_list = ({ commit }) => {
  return http()
    .get("v1/final_packing_lists")
    .then((res) => {
      commit("ALL_FINAL_PACKING_LIST", res.data);
    });
};

export const get_final_packing_list = ({ commit }, data) => {
  return http()
    .get("v1/final_packing_lists/getData?" + data)
    .then((res) => {
      commit("GET_FINAL_PACKING_LIST", res.data);
    });
};

export const add_final_packing_list = ({ commit }, data) => {
  return httpFile()
    .post("v1/final_packing_lists/store", data)
    .then((res) => {
      console.log(res);
      commit("ADD_FINAL_PACKING_LIST", res.data);
    });
};

export const edit_final_packing_list = ({ commit }, id) => {
  return http()
    .get(`v1/final_packing_lists/edit/${id}`)
    .then((res) => {
      commit("EDIT_FINAL_PACKING_LIST", res.data.finalPackingList);
      // commit("EDIT_FINAL_PACKING_LIST", res.data.final_packing_list);
    });
};

export const update_final_packing_list = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/final_packing_lists/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_FINAL_PACKING_LIST", res.data);
    });
};

export const delete_final_packing_list = ({ commit }, id) => {
  return http()
    .delete(`v1/final_packing_lists/destroy/${id}`)
    .then((res) => {
      commit("DELETE_FINAL_PACKING_LIST", { id: id, data: res.data });
    });
};
