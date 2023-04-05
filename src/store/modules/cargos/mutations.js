// export const GET_INVOICE = (state, data) => {
//   state.invoices = data.data.data;
//   state.pagination = data.data;
// };

export const ADD_CARGO = (state, data) => {
  if (state.cargos.push(data.cargo)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_CARGO = (state, data) => {
  state.cargo = data;
};

export const UPDATE_CARGO = (state, data) => {
  if (state.cargos.push(data.cargo)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_CARGO = (state, { id, data }) => {
  if (id) {
    state.cargos = state.cargos.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
