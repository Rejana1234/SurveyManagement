
export const ALL_QUANTITY = (state, data) => {
  state.quantities= data.quantity;
};


export const GET_QUANTITY = (state, data) => {
  state.quantities = data.data.data;
  state.pagination = data.data;
};

export const ADD_QUANTITY = (state, data) => {
  if (state.quantities.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_QUANTITY = (state, data) => {
  state.quantity = data;
};

export const UPDATE_QUANTITY = (state, data) => {
  if (state.quantities.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_QUANTITY = (state, { id, data }) => {
  if (id) {
    state.quantities = state.quantities.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
