export const GET_APPOINTED_SURVEYOR = (state, data) => {
    state.appointed_surveyors = data.data.data;
    state.pagination = data.data;
};

export const ADD_APPOINTED_SURVEYOR = (state, data) => {
    if (state.appointed_surveyors.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const EDIT_APPOINTED_SURVEYOR = (state, data) => {
    state.appointed_surveyor = data;

};

export const UPDATE_APPOINTED_SURVEYOR = (state, data) => {
    if (state.appointed_surveyors.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const DELETE_APPOINTED_SURVEYOR = (state, {id, data}) => {
    if (id)
    {
        state.appointed_surveyors = state.appointed_surveyors.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};