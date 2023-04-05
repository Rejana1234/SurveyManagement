import { http } from "../../../service/http_service";

// export const get_invoice = ({ commit }, data) => {
//   return http()
//     .get("v1/invoices/getData?" + data)
//     .then((res) => {
//       commit("GET_INVOICE", res.data);
//     });
// };

export const add_cargo = ({ commit }, data) => {
  return http()
    .post("v1/cargos/store", data)
    .then((res) => {
      console.log(res);
      commit("ADD_CARGO", res.data);
    });
};

export const edit_cargo= ({ commit }, id) => {
  return http()
    .get(`v1/cargos/edit/${id}`)
    .then((res) => {
      commit("EDIT_CARGO", res.data.cargo);
    });
};

export const update_cargo = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/cargos/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_CARGO", res.data);
    });
};

export const delete_cargo = ({ commit }, id) => {
  return http()
    .delete(`v1/cargos/destroy/${id}`)
    .then((res) => {
      commit("DELETE_CARGO", { id: id, data: res.data });
    });
};
