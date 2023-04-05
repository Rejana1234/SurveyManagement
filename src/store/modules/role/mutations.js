export const GET_ALL_ROLE = (state, data) => {
  state.roles = data;
};

export const ADD_ROLE = (state, data) => {
  if (state.roles.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_ROLE = (state, data) => {
  state.role = data.role;
  state.rolePermission = data.role_permission;
};

export const updateValue = (state, data) => {
    state.rolePermission = data;
};

export const UPDATE_ROLE = (state, data) => {
  if (state.roles.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_ROLE = (state, { id, data }) => {
  if (id) {
    state.roles = state.roles.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
