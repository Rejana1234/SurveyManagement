import { httpAuth } from "../service/login_service";
import { http } from "../service/http_service";

export const login = ({ dispatch }, data) => {
    return httpAuth().post('/auth/v1/login', data).then((response) => {
        dispatch('attempt', response.data.access_token);
        dispatch('setToken', response.data.access_token);
        dispatch('setAdmin', response.data.user);
    });
};

export const attempt = ({ commit, state }, token) => {
    if (token) {
        commit('SET_TOKEN', token);
    }

    if (!state.token) {
        return
    }

    try {
        return httpAuth().post('/auth/v1/me')
            .then(response => {
                commit('SET_USER', response.data);
            });
    } catch (e) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
    }
};

export const setToken = (_, token) => {
    localStorage.setItem('token', token);
};

export const setAdmin = (_, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_role', JSON.stringify(user["model_has_role"]["roles"]["name"]));
    localStorage.setItem('user_role_id', JSON.stringify(user["model_has_role"]["role_id"]));
    localStorage.setItem('user_reference', JSON.stringify(user["reference"]));
};

export const logout = ({ commit }) => {

    return httpAuth().post('/auth/v1/logout')
        .then(() => {

            commit('SET_TOKEN', null);
            commit('SET_USER', null);

            localStorage.removeItem('user');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_role_id');
            localStorage.removeItem('token');
            localStorage.removeItem('user_reference');
        });
};

export const edit_user = ({ state }, id) => {
    return httpAuth().post(`/auth/v1/edit_user/${id}`).then(res => {
        state.edit_user_info = res.data.user;
    })
};


export const forget_password = ({ commit }, data) => {
    return httpAuth().post('/auth/v1/forget_password', data).then(res => {
        commit('FORGET_PASSWORD', res.data);
    })
};

export const change_password = ({ commit }, data) => {
    return httpAuth().post('/auth/v1/change_password', data).then(res => {
        commit('CHANGE_PASSWORD', res.data);
    })
};

export const admin_change_password = ({ commit }, data) => {
    return http().post('v1/change_password', data).then(res => {
        commit('ADMIN_CHANGE_PASSWORD', res.data);
    })
};

export const profile_update = ({ commit }, data) => {
    return httpAuth().post('auth/v1/admin_profile_update', data).then(res => {
        commit('ADMIN_PROFILE_UPDATE', res.data);
    })
};