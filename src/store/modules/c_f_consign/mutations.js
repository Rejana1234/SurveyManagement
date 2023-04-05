
export const ALL_CONSIGN = (state, data) => {
    state.consigns = data.cfconsigne;
};

export const GET_CONSIGN= (state, data) => {
    state.consigns = data.data.data;
    state.pagination = data.data;
};

export const ADD_CONSIGN = (state, data) => {
    if (state.consigns.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const EDIT_CONSIGN = (state, data) => {
    state.consign = data;

};

export const UPDATE_CONSIGN = (state, data) => {
    if (state.consigns.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const DELETE_CONSIGN = (state, {id, data}) => {
    if (id)
    {
        state.consigns = state.consigns.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};