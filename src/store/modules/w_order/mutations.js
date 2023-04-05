
export const ALL_W_ORDER = (state, data) => {
    state.w_orders = data.workOrder;
};

export const GET_W_ORDER = (state, data) => {
    state.w_orders = data.data.data;
    state.pagination = data.data;
};

export const ADD_W_ORDER = (state, data) => {
    if (state.w_orders.push(data)) {
        state.success_message = data.message;
    } else {
        state.success_message = '';
    }
};

export const EDIT_W_ORDER = (state, data) => {
    state.w_order = data.workOrder;
    state.relavent_files = data.relavent_file;
    state.charterers = data.charterer;
    state.securities = data.security;
    state.specialist_names = JSON.parse(data.workOrder.specialist_name);
    state.specialist_survey_scopes = JSON.parse(data.workOrder.specialist_survey_scope);
};
export const W_ORDER_DETAILS = (state, data) => {
    state.w_order = data;
    state.iml_reference_no = data.iml_reference_no;
};

export const UPDATE_W_ORDER = (state, data) => {
    if (state.w_orders.push(data)) {
        state.success_message = data.message;
    } else {
        state.success_message = '';
    }
};

export const DELETE_W_ORDER = (state, { id, data }) => {
    if (id) {
        state.w_orders = state.w_orders.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    } else {
        state.success_message = '';
    }

};
export const DELETE_FILE = (state, { id, data }) => {
    if (id) {
        state.w_orders = state.w_orders.filter(item => {
            return id !== item.id;
        })

        state.success_message = data.message;
    } else {
        state.success_message = '';
    }

};

export const DOWNLOAD_INVOICE = (state, { id, data }) => {
    if (id) {
        state.w_orders = state.w_orders.filter((item) => {
            return id !== item.id;
        });

        state.success_message = data.message;
    } else {
        state.success_message = "";
    }
}