export const GET_ALL_FIRM = (state, data) => {
  state.firms = data;
};

export const ADD_FIRM = (state, data) => {
  if (state.firms.push(data.firm)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_FIRM = (state, data) => {
  state.firm = data;
};

export const UPDATE_FIRM = (state, data) => {
  if (state.firms.push(data.firm)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_FIRM = (state, { id, data }) => {
  if (id) {
    state.firms = state.firms.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
