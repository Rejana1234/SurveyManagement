export const GET_SUMMARY_REPORT = (state, data) => {
    state.summary_reports = data;
};

export const GET_ALL_CLIENTS = (state, data) => {
    state.clients = data;
};

export const STORE_SUMMRAY_REPORT = (state, data) => {
    if (state.summary_reports.push(data)) {
        state.success_message = data.message;
      } else {
        state.success_message = "";
      }
};

export const EDIT_SUMMARY_REPORT = (state, data) => {
    state.summary_report = data;
};


export const UPDATE_SUMMARY_REPORT = (state, data) => {
    if(state.summary_reports.push(data))
    {
        state.success_message = data.message;
    }else{
        state.success_message = '';
    }
};

export const DELETE_SUMMARY_REPORT = ({state}, {id, data}) => {
    if(id)
    {
        state.summary_reports = state.summary_reports.filter(item => {
            return id !== item.id
        })

        state.success_message = data.message
    }else{
        state.success_message = '';
    }
};