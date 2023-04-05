export const GET_ALL_PERMISSION = (state, data) => {
  state.permissions = data;
};

export const GET_PERMISSION = (state, data) => {
  state.permissions = data.data.data;
  state.pagination = data.data;
};

export const ADD_PERMISSION = (state, data) => {
  if (state.permissions.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_PERMISSION = (state, data) => {
  state.permission = data;
};

export const UPDATE_PERMISSION = (state, data) => {
  if (state.permissions.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_PERMISSION = (state, { id, data }) => {
  if (id) {
    state.permissions = state.permissions.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
