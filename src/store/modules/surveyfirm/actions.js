import { http } from "../../../service/http_service";

export const get_firm = ({ commit }) => {
  return http()
    .get("v1/survey_firms")
    .then((res) => {
      commit("GET_ALL_FIRM", res.data.survey_firms);
    });
};


export const add_firm = ({ commit }, data) => {
  return http()
    .post("v1/survey_firms/store", data)
    .then((res) => {
      commit("ADD_FIRM", res.data);
    });
};

export const edit_firm = ({ commit }, id) => {
  return http()
    .get(`v1/survey_firms/edit/${id}`)
    .then((res) => {
      console.log(res.data.surveyFirm);
      commit("EDIT_FIRM", res.data.surveyFirm);
    });
};

export const update_firm= ({ commit }, { id, data }) => {
  return http().post(`v1/survey_firms/update/${id}`, data).then((res) => {
        commit("UPDATE_FIRM", res.data);
    });
};

export const delete_firm = ({ commit }, id) => {
  return http()
    .delete(`v1/survey_firms/destroy/${id}`)
    .then((res) => {
      commit("DELETE_FIRM", { id: id, data: res.data });
    });
};
