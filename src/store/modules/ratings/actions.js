import { http } from "../../../service/http_service";


export const add_rating = ({ commit }, data) => {
  return http()
    .post("v1/ratings/store", data)
    .then((res) => {
      commit("ADD_RATING", res.data);
    });
};


