import { http } from "../../../service/http_service";

export const get_all_surveyor = ({ commit }) => {
  return http()
    .get("v1/surveyors")
    .then((res) => {
      commit("ALL_SURVEYOR", res.data);
    });
};

export const get_all_survey = ({ commit }) => {
  return http()
    .get("v1/surveys")
    .then((res) => {
      commit("ALL_SURVEY", res.data);
    });
};
export const get_survey = ({ commit }, data) => {
  return http()
    .get("v1/surveys/getData?" + data)
    .then((res) => {
      commit("GET_SURVEY", res.data);
    });
};

export const add_survey = ({ commit }, data) => {
  // console.log(data.formData)
  return http()
    .post("v1/surveys/store", data)
    .then((res) => {
      commit("ADD_SURVEY", res.data);
    });
};

export const edit_survey = ({ commit }, id) => {
  return http()
    .get(`v1/surveys/edit/${id}`)
    .then((res) => {
      commit("EDIT_SURVEY", res.data.survey);
      
    });
};

export const update_survey = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/surveys/update/${id}`, data)
    .then((res) => {
      commit("UPDATE_SURVEY", res.data);
    });
};

export const delete_survey = ({ commit }, id) => {
  return http()
    .delete(`v1/surveys/destroy/${id}`)
    .then((res) => {
      commit("DELETE_SURVEY", { id: id, data: res.data });
    });
};

export const approve_survey_report = ({ commit }, { id, data }) => {
  return http()
    .post(`v1/surveys/approve_survey_report/${id}`, data)
    .then((res) => {
      console.log(res.data.message);
      commit("GRANT_FOR_EDIT", res.data);
    });
};
export const grant_for_edit = ({ commit }, { id }) => {
  return http()
    .post(`v1/surveys/grant_for_edit/${id}`)
    .then((res) => {
      console.log(res.data);
      // console.log(res.data.message);
      commit("GRANT_FOR_EDIT", res.data);
    });
};

export const deny_for_edit = ({ commit }, { id }) => {
  return http()
    .post(`v1/surveys/deny_for_edit/${id}`)
    .then((res) => {
      console.log(res.data);
      // console.log(res.data.message);
      commit("GRANT_FOR_EDIT", res.data);
    });
};

export const download_survey_report = ({ commit }, id) => {
  return http()
    .get(`v1/surveys/download/${id}`)
    .then((res) => {
      commit("DOWNLOAD_SURVEY_REPORT", { id: id, data: res.data });
    });
};
export const get_selective_images = ({ commit }, id) => {
  return http()
    .get(`v1/surveys/get_selective_images/${id}`)
    .then((res) => {
      commit("GET_IMAGES", res.data.images);
      
    });
};
