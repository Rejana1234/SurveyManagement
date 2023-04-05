
export const ADD_RATING = (state, data) => {
  if (state.ratings.push(data)) {
    state.success_message = data.message;
  } else {
    state.success_message = "";
  }
};

