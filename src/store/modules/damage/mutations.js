export const GET_DAMAGE = (state, data) => {
  state.damages = data.data.data;
  state.pagination = data.data;
};

export const ADD_DAMAGE = (state, data) => {
  if (state.damages.push(data.damage)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_DAMAGE = (state, data) => {
  state.damage = data;
};

export const UPDATE_DAMAGE = (state, data) => {
  if (state.damages.push(data.damage)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_DAMAGE = (state, { id, data }) => {
  if (id) {
    state.damages = state.damages.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
