export const GET_DIMENSION = (state, data) => {
  state.dimensions = data.data.data;
  state.pagination = data.data;
};

export const ADD_DIMENSION = (state, data) => {
  if (state.dimensions.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_DIMENSION = (state, data) => {
  state.dimension = data;
};

export const UPDATE_DIMENSION = (state, data) => {
  if (state.dimensions.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_DIMENSION = (state, { id, data }) => {
  if (id) {
    state.dimensions = state.dimensions.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
