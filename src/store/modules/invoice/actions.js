import { http } from "../../../service/http_service";

export const get_invoice = ({ commit }, data) => {
  return http()
    .get("v1/invoices/getData?" + data)
    .then((res) => {
      commit("GET_INVOICE", res.data);
    });
};

export const add_invoice = ({ commit }, data) => {
  return http()
    .post("v1/invoices/store", data)
    .then((res) => {
      commit("ADD_INVOICE", res.data);
    });
};

export const edit_invoice = ({ commit }, id) => {
  return http()
    .get(`v1/invoices/edit/${id}`)
    .then((res) => {
      commit("EDIT_INVOICE", res.data.invoice);
    });
};

export const update_invoice = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/invoices/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_INVOICE", res.data);
    });
};

export const delete_invoice = ({ commit }, id) => {
  return http()
    .delete(`v1/invoices/destroy/${id}`)
    .then((res) => {
      commit("DELETE_INVOICE", { id: id, data: res.data });
    });
};
