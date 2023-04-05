export const ALL_FINAL_PACKING_LIST = (state, data) => {
  state.final_packing_lists = data.final_packing_list;
};

export const GET_FINAL_PACKING_LIST = (state, data) => {
  state.final_packing_lists = data.data.data;
  state.pagination = data.data;
};

export const ADD_FINAL_PACKING_LIST = (state, data) => {
  if (state.final_packing_lists.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_FINAL_PACKING_LIST = (state, data) => {
  state.final_packing_list = data;
};

export const UPDATE_FINAL_PACKING_LIST = (state, data) => {
  if (state.final_packing_lists.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_FINAL_PACKING_LIST = (state, { id, data }) => {
  if (id) {
    state.final_packing_lists = state.final_packing_lists.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
