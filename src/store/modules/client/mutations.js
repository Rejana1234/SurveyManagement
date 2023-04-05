
export const ALL_CLIENT = (state, data) => {
    state.clients = data.client;
};

export const GET_CLIENT= (state, data) => {
    state.clients = data.data.data;
    state.pagination = data.data;
};

export const ADD_CLIENT = (state, data) => {
    if (state.clients.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const EDIT_CLIENT = (state, data) => {
    state.client = data;

};

export const UPDATE_CLIENT = (state, data) => {
    if (state.clients.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const DELETE_CLIENT = (state, {id, data}) => {
    if (id)
    {
        state.clients = state.clients.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};