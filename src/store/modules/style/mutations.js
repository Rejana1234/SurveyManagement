export const ALL_STYLE = (state, data) => {
  state.styles= data.style;
};


export const GET_STYLE = (state, data) => {
  state.styles = data.data.data;
  state.pagination = data.data;
};

export const ADD_STYLE = (state, data) => {
  if (state.styles.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_STYLE = (state, data) => {
  state.style = data;
};

export const UPDATE_STYLE = (state, data) => {
  if (state.styles.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_STYLE = (state, { id, data }) => {
  if (id) {
    state.styles = state.styles.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
