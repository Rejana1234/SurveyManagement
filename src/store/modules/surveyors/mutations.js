export const ALL_SURVEYOR = (state, data) => {
    state.surveyors = data.surveyors;
};


export const GET_SURVEYOR = (state, data) => {
    state.surveyors = data.data.data;
    state.pagination = data.data;
};

export const ADD_SURVEYOR = (state, data) => {
    if (state.surveyors.push(data)) {
        state.success_message = data.message;
    } else {
        state.success_message = '';
    }
};

export const EDIT_SURVEYOR = (state, data) => {
    state.surveyor = data.surveyor;
    state.other_info = data.other_info;

};

export const UPDATE_SURVEYOR = (state, data) => {
    if (state.surveyors.push(data)) {
        state.success_message = data.message;
    } else {
        state.success_message = '';
    }
};

export const DELETE_SURVEYOR = (state, { id, data }) => {
    if (id) {
        state.surveyors = state.surveyors.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    } else {
        state.success_message = '';
    }
};