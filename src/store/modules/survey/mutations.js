export const ALL_SURVEYOR = (state, data) => {
  state.surveyors = data.surveyors;
  console.log(state.surveyors);
};

export const ALL_SURVEY = (state, data) => {
  state.surveys = data;
  console.log(state.surveys);
};

export const GET_SURVEY = (state, data) => {
  state.surveys = data.data.data;
  state.survey_appointment = data.data.data.survey_appointment;
  state.pagination = data.data;
};

export const ADD_SURVEY = (state, data) => {
  if (state.surveys.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_SURVEY = (state, data) => {
  state.survey = data;
  state.scopes = JSON.parse(data.scope);
  // var scopes = JSON.parse(data.scope);
  // state.survey = scopes;
  // console.log(state.scopes);
};

export const UPDATE_SURVEY = (state, data) => {
  if (state.surveys.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_SURVEY = (state, { id, data }) => {
  if (id) {
    state.surveys = state.surveys.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const APPROVE_SURVEY_REPORT = (state, data) => {
  if (state.surveys.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
export const GRANT_FOR_EDIT = (state, data) => {
  if (state.surveys.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DENY_FOR_EDIT = (state, data) => {
  if (state.surveys.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DOWNLOAD_SURVEY_REPORT = (state, { id, data }) => {
  if (id) {
    state.surveys = state.surveys.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
export const GET_IMAGES = (state, data) => {
  state.images = data;
  // state.scopes = JSON.parse(data.scope);
  // var scopes = JSON.parse(data.scope);
  // state.survey = scopes;
  // console.log(state.scopes);
};