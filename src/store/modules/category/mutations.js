
export const ALL_CATEGORY = (state, data) => {
  state.categories = data.category;
  state.single_category = data.single_category;
  console.log(data);
};
export const GET_CATEGORY = (state, data) => {
  state.categories = data.data.data;
  state.pagination = data.data;
  
};

export const ADD_CATEGORY = (state, data) => {
  if (state.categories.push(data.category)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const EDIT_CATEGORY = (state, data) => {
  state.category = data;
};

export const UPDATE_CATEGORY = (state, data) => {
  if (state.categories.push(data.category)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

export const DELETE_CATEGORY = (state, { id, data }) => {
  if (id) {
    state.categories = state.categories.filter((item) => {
      return id !== item.id;
    });

    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};
