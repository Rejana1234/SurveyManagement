import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//import root-vuex
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

//import modules
import department from "./modules/department";
import damage from "./modules/damage";
import style from "./modules/style";
import permission from "./modules/permission";
import dimension from "./modules/dimension";
import quantity from "./modules/quantity";
import surveyors from "./modules/surveyors";
import vessels from "./modules/vessels";
import c_f_consign from "./modules/c_f_consign";
import client from "./modules/client";
import final_packing_list from "./modules/final_packing_list";
import w_order from "./modules/w_order";
import survey from "./modules/survey";
import appoint_surveyor from "./modules/appoint_surveyor";
import carrier_agent from "./modules/carrier_agent";
import ratings from "./modules/ratings";
import role from "./modules/role";
import users from "./modules/user";
import category from "./modules/category";
import surveyfirm from "./modules/surveyfirm";
import invoice from "./modules/invoice";
import cargos from "./modules/cargos";
import summary_report from "./modules/summary_report";
import final_report from "./modules/final_report";
import other_report from "./modules/other_report";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    department,
    damage,
    style,
    permission,
    dimension,
    quantity,
    surveyors,
    vessels,
    c_f_consign,
    client,
    final_packing_list,
    w_order,
    survey,
    appoint_surveyor,
    carrier_agent,
    ratings,
    role,
    users,
    category,
    surveyfirm,
    invoice,
    cargos,
    summary_report,
    final_report,
    other_report
  },
});
