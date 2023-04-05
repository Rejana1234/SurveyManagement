export const STORE_OTHER_REPORT = (state, data) => {
    if(state.other_reports.push(data))
    {
        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};

export const EDIT_OTHER_REPORT = (state, data) => {
    state.other_report = data;
};

export const UPDATE_OTHER_REPORT = (state, data) => {
    if(state.other_reports.push(data))
    {
        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};

export const DELETE_OTHER_REPORT = (state, {id, data}) => {
    if(id)
    {
        state.other_reports = state.other_reports.filter(item => {
            return id !== item.id
        })

        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};