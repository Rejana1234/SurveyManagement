import { http } from "../../../service/http_service";

export const get_appointed_surveyor = ({ commit }, data) => {
  return http()
    .get("v1/survey_appointment/getData?" + data)
    .then((res) => {
      commit("GET_APPOINTED_SURVEYOR", res.data);
    });
};

export const add_appointed_surveyor = ({ commit }, data) => {
  return http()
    .post("v1/survey_appointment/store", data)
    .then((res) => {
      commit("ADD_APPOINTED_SURVEYOR", res.data);
    });
};

export const edit_appointed_surveyor = ({ commit }, id) => {
  return http()
    .get(`v1/survey_appointment/edit/${id}`)
    .then((res) => {
      commit("EDIT_APPOINTED_SURVEYOR", res.data.surveyAppointment);
    });
};

export const update_appointed_surveyor = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/survey_appointment/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_APPOINTED_SURVEYOR", res.data);
    });
};

export const delete_appointed_surveyor = ({ commit }, id) => {
  return http()
    .delete(`v1/survey_appointment/destroy/${id}`)
    .then((res) => {
      commit("DELETE_APPOINTED_SURVEYOR", { id: id, data: res.data });
    });
};
