export const GET_ALL_CLIENTS = (state, data) => {
    state.clients = data;
};

export const GET_ALL_APPLICANT = (state, data) => {
    state.applicants = data.applicants;
    state.consginee = data.consginee;
};

export const STORE_FINAL_REPORT = (state, data) => {
    if(state.final_reports.push(data))
    {
        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};

export const EDIT_FINAL_REPORT = (state, data) => {
    state.final_report = data;
};

export const UPDATE_FINAL_REPORT = (state, data) => {
    if(state.final_reports.push(data))
    {
        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};

export const DELETE_FINAL_REPORT = (state, {id, data}) => {
    if(id)
    {
        state.final_reports = state.final_reports.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};