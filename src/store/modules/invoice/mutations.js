export const GET_INVOICE = (state, data) => {
  state.invoices = data.data.data;
  state.pagination = data.data;
};

export const ADD_INVOICE = (state, data) => {
  if (state.invoices.push(data.invoice)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_INVOICE = (state, data) => {
  state.invoice = data;
};

export const UPDATE_INVOICE = (state, data) => {
  if (state.invoices.push(data.invoice)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_INVOICE = (state, { id, data }) => {
  if (id) {
    state.invoices = state.invoices.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
