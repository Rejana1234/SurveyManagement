
export const ALL_VESSELS = (state, data) => {
    state.vessels = data.vessel;
};


export const GET_VESSELS= (state, data) => {
    state.vessels = data.data.data;
    state.pagination = data.data;
};

export const ADD_VESSELS = (state, data) => {
    if (state.vessels.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const EDIT_VESSELS = (state, data) => {
    state.vessel = data;

};

export const UPDATE_VESSELS = (state, data) => {
    if (state.vessels.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const DELETE_VESSELS = (state, {id, data}) => {
    if (id)
    {
        state.vessels = state.vessels.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};