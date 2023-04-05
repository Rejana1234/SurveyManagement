export const SET_TOKEN = (state, token) => {
    state.token = token;
};

export const SET_USER = (state, data) => {
    state.user = data;
};

export const FORGET_PASSWORD = (state, data) => {
    state.success_message = data.message;
};

export const CHANGE_PASSWORD = (state, data) => {
    state.success_message = data.message;
};

export const ADMIN_CHANGE_PASSWORD = (state, data) => {
    state.success_message = data.message;
};

export const ADMIN_PROFILE_UPDATE = (state, data) => {

    state.success_message = data.message;

};