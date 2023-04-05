export const ADD_USER = (state, data) => {
    if (state.users.push(data)) {
        state.success_message = data.message;
    } else {
        state.success_message = "";
    }
};

export const EDIT_USER = (state, data) => {
    state.user = data.user;
};

export const UPDATE_USER = (state, data) => {
    if (state.users.push(data)) {
        state.success_message = data.message;
    } else {
        state.success_message = "";
    }
};

export const DELETE_USER = (state, { id, data }) => {
    if (id) {
        state.users = state.users.filter((item) => {
            return id !== item.id;
        });

        state.success_message = data.message;
    } else {
        state.success_message = "";
    }
};