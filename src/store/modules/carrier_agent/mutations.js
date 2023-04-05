export const GET_ALL_CARRIER_AGENT = (state, data) => {
    state.carrier_agents = data.carriersAgentBangladesh.carriersAgentBangladesh;
};

export const ALL_CARRIER_AGENT = (state, data) => {
    state.cariier_agents = data.carriersAgentBangladesh;
};

export const ADD_CARRIER_AGENT = (state, data) => {
    if (state.carrier_agents.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const EDIT_CARRIER_AGENT = (state, data) => {
    state.carrier_agent = data.carriersAgentBangladesh;
};

export const UPDATE_CARRIER_AGENT = (state, data) => {
    if (state.carrier_agents.push(data))
    {
        state.success_message = data.message;
    }else {
        state.success_message = '';
    }
};

export const DELETE_CARRIER_AGENT = (state, {data, id}) => {
    if (id){
        state.carrier_agents = state.carrier_agents.filter(item => {
            return id !== item.id
        });

        state.success_message = data.message;
    } else {
        state.success_message = '';
    }
};