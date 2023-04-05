import {http} from "../../../service/http_service";


export const get_all_carrier_agent = ({state}) => {
    return http().get('v1/bd_carrier_agents').then(res => {
        state.carrier_agents = res.data.carriersAgentBangladesh;
    })
};

export const add_carrier_agent = ({commit}, data) => {
    return http().post('v1/bd_carrier_agents/store', data).then(res => {
        commit('ADD_CARRIER_AGENT', res.data);
    })
};

export const edit_carrier_agent = ({commit}, id) => {
    return http().get(`v1/bd_carrier_agents/edit/${id}`).then(res => {
        commit('EDIT_CARRIER_AGENT', res.data);
    })
};

export const update_carrier_agent = ({commit}, {id, data}) => {
    return http().post(`v1/bd_carrier_agents/update/${id}`, data).then(res => {
        commit('UPDATE_CARRIER_AGENT', res.data);
    })
};

export const delete_carrier_agent = ({commit}, id) => {
    return http().delete(`v1/bd_carrier_agents/destroy/${id}`).then(res => {
        commit('DELETE_CARRIER_AGENT', {id:id, data:res.data});
    })
};