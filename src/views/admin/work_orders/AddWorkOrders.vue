<template>
  <div id="add_w_order">
    <form class="elements" v-on:submit.prevent="addW_order">
      <br />
      <h2>Add File</h2>
      <br />
      <div class="basic_w_order">
        <h2>Basic Information:</h2>
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="subject">File Opening Date</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                id="file_opening_date"
                name="file_opening_date"
                v-model="w_orderData.file_opening_date"
              />
              <span v-if="errors.file_opening_date" class="danger_text">{{ errors.file_opening_date[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">IML File Reference No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="iml_reference_no"
                name="iml_reference_no"
                v-model="w_orderData.iml_reference_no"
                placeholder="Enter  IML File Reference no."
              />
              <span v-if="errors.iml_reference_no" class="danger_text">{{ errors.iml_reference_no[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Name Of the Vessel/Ship</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="vessel_name"
                name="vessel_name"
                v-model="w_orderData.vessel_name"
                placeholder="Enter  Vessel/Ship Name"
              />
              <span v-if="errors.vessel_name" class="danger_text">{{ errors.vessel_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="lname">Voyage No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="voyage_no"
                name="voyage_no"
                v-model="w_orderData.voyage_no"
                placeholder=" Enter Voyage No."
              />
              <span v-if="errors.voyage_no" class="danger_text">{{ errors.voyage_no[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="lname">Nature of the Incident</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="nature_of_incident"
                name="nature_of_incident"
                v-model="w_orderData.nature_of_incident"
                placeholder=" Enter Nature of Incident"
              />
              <br />
              <span v-if="errors.nature_of_incident" class="danger_text">{{ errors.nature_of_incident[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">ETA at POD</label>
            </div>
            <div class="col-75">
              <input
                type="datetime-local"
                id="eta_date_time_pod"
                name="eta_date_time_pod"
                v-model="w_orderData.eta_date_time_pod"
                accept="image/png, image/jpeg, pdf/file"
              />
              <span v-if="errors.eta_date_time_pod" class="danger_text">{{ errors.eta_date_time_pod[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">ATA at POD</label>
            </div>
            <div class="col-75">
              <input
                type="datetime-local"
                id="ata_date_time_pod"
                name="ata_date_time_pod"
                v-model="w_orderData.ata_date_time_pod"
                accept="image/png, image/jpeg"
              />
              <span v-if="errors.ata_date_time_pod" class="danger_text">{{ errors.ata_date_time_pod[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">ETB at POD</label>
            </div>
            <div class="col-75">
              <input
                type="datetime-local"
                id="etb_date_time_pod"
                name="etb_date_time_pod"
                v-model="w_orderData.etb_date_time_pod"
                accept="image/png, image/jpeg"
              />
              <span v-if="errors.etb_date_time_pod" class="danger_text">{{ errors.etb_date_time_pod[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">ATB at POD</label>
            </div>
            <div class="col-75">
              <input
                type="datetime-local"
                id="atb_date_time_pod"
                name="atb_date_time_pod"
                v-model="w_orderData.atb_date_time_pod"
                accept="image/png, image/jpeg"
              />
              <span v-if="errors.atb_date_time_pod" class="danger_text">{{ errors.atb_date_time_pod[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="subject">ETC/D from POD</label>
            </div>
            <div class="col-75">
              <input
                type="datetime-local"
                id="etcd_date_time_pod"
                name="etcd_date_time_pod"
                v-model="w_orderData.etcd_date_time_pod"
                accept="image/png, image/jpeg"
              />
              <span v-if="errors.etcd_date_time_pod" class="danger_text">{{ errors.etcd_date_time_pod[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="lname">ATD from POL</label>
            </div>
            <div class="col-75">
              <input
                type="date"
                id="atd_date_time_pol"
                name="atd_date_time_pol"
                v-model="w_orderData.atd_date_time_pol"
                placeholder=" Enter atd_date_time_pol"
              />
              <span v-if="errors.atd_date_time_pol" class="danger_text">{{ errors.atd_date_time_pol[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="subject">Document Attachment(Upload PDF File)</label>
            </div>
            <div class="col-75">
              <div class="col-75">
                <input
                  type="file"
                  name="relevent_files"
                  @change="attachReleventFile"
                  ref="workOrderReleventFile"
                  multiple
                />
                <span v-if="errors.attachReleventFile" class="danger_text">{{ errors.attachReleventFile[0] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="basic_w_order">
        <h2>Client's Details</h2>
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="fname">Club/Client Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                v-model="w_orderData.club_name"
                id="club_name"
                name="club_name"
                placeholder="Enter  club"
              />
              <span v-if="errors.club_name" class="danger_text">{{ errors.club_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Club's File Ref No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="club_file_reference_no"
                name="club_file_reference_no"
                v-model="w_orderData.club_file_reference_no"
                placeholder="Enter  Club's File Ref no."
              />
              <span v-if="errors.club_file_reference_no" class="danger_text">{{
                errors.club_file_reference_no[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Club's PIC</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="club_pic"
                name="club_pic"
                v-model="w_orderData.club_pic"
                placeholder="Enter  Club's PIC"
              />
              <span v-if="errors.club_pic" class="danger_text">{{ errors.club_pic[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Name of the Shipwoners</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="shipowner_name"
                name="shipowner_name"
                v-model="w_orderData.shipowner_name"
                placeholder="Enter  shipowner_name"
              />
              <span v-if="errors.shipowner_name" class="danger_text">{{ errors.shipowner_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Shipwoners File Ref No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="shipowner_file_reference_no"
                name="shipowner_file_reference_no"
                v-model="w_orderData.shipowner_file_reference_no"
                placeholder="Enter  Shipwoners File Ref no."
              />
              <span v-if="errors.shipowner_file_reference_no" class="danger_text">{{
                errors.shipowner_file_reference_no[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Shipwoners PIC</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="shipowner_pic"
                name="shipowner_pic"
                v-model="w_orderData.shipowner_pic"
                placeholder="Enter  Shipwoners PIC"
              />
              <span v-if="errors.shipowner_pic" class="danger_text">{{ errors.shipowner_pic[0] }}</span>
            </div>
          </div>
        </div>
        <div class="table_card" style="">
          <label for="fname">Charterer's Details</label>
          <input style="" type="button" value="+Add New" class="add_new" @click="addRow" />
          <table class="" style="">
            <thead class="text text-success" style="width: 100%">
              <tr style="width: 100%">
                <th style="position: center">Name Of Charterer's</th>
                <th style="position: center">Type</th>
                <th style="position: center">Charterer's File Ref no.</th>
                <th style="position: center">Charterer's PIC</th>
                <th></th>
              </tr>
            </thead>
            <tbody style="width: 100%">
              <tr v-for="(user, index) in users" :key="index" style="width: 100%">
                <td style="width: 20%">
                  <input
                    name="charterer_name"
                    v-model="user.name"
                    class="form-control"
                    type="text"
                    placeholder="Name"
                  />
                </td>
                <td style="width: 25%">
                  <select name="charterer_type" id="charterer_type" class="box" v-model="user.type">
                    <option value="" selected disabled>Select Type</option>
                    <option value="Bareboat Charterer">Bareboat Charterer</option>
                    <option value="Time Charterer">Time Charterer</option>
                    <option value="Sub Charterer">Sub Charterer</option>
                    <option value="Voyage Charterer">Voyage Charterer</option>
                  </select>
                </td>
                <td style="width: 20%">
                  <input
                    name="charterer_file_reference_no"
                    v-model="user.charterers_ref_no"
                    class="form-control"
                    type="text"
                    placeholder="File ref No."
                  />
                </td>
                <td style="width: 45%">
                  <input
                    name="charterer_pic"
                    v-model="user.charterers_pic"
                    class="form-control"
                    type="text"
                    placeholder="Charterer's  PIC"
                  />
                </td>
                <td style="width: 5%">
                  <input
                    style="background-color: #e34545; color: aliceblue"
                    type="button"
                    value="Remove"
                    class="back-btn"
                    @click="deleteRow(index)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="basic_w_order">
        <h2>Marine Survey Firm</h2>
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="fname">Survey Firm's File Reference No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="survey_firm_reference_no"
                name="survey_firm_reference_no"
                v-model="w_orderData.marine_survey_firm_reference_no"
                placeholder="Survey Firm's Reference No."
              />
              <span v-if="errors.survey_firm_reference_no" class="danger_text">{{
                errors.survey_firm_reference_no[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Marine Survey Firm Name</label>
            </div>
            <div class="col-75">
              <select name="survey_firm" id="survey_firm" v-model="w_orderData.marine_survey_firm" class="box">
                <option value="" selected disabled>Select Survey Firm</option>
                <option :value="surveyFirm.id" v-for="surveyFirm in survey_firms" :key="surveyFirm.id">
                  {{ surveyFirm.name }}
                </option>
              </select>
              <span v-if="errors.marine_survey_firm" class="danger_text">{{ errors.marine_survey_firm[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Location</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="survey_location"
                name="survey_location"
                v-model="w_orderData.marine_survey_location"
                placeholder="Enter  Location"
              />
              <span v-if="errors.survey_location" class="danger_text">{{ errors.survey_location[0] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="basic_w_order">
        <h2>Other Specialist</h2>
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="fname">Specialist's File Reference No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="specialist_reference_no"
                name="specialist_reference_no"
                v-model="w_orderData.specialist_reference_no"
                placeholder="Enter  File Reference No."
              />
              <span v-if="errors.specialist_reference_no" class="danger_text">{{
                errors.specialist_reference_no[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Organisation Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="specialist_organization"
                name="specialist_organization"
                v-model="w_orderData.specialist_organization"
                placeholder="Enter  Organisation Name"
              />
              <span v-if="errors.specialist_organization" class="danger_text">{{
                errors.specialist_organization[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Category/Nature of Survey</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="specialist_survey_category"
                name="specialist_survey_category"
                v-model="w_orderData.specialist_survey_category"
                placeholder="Enter  Survey Category"
              />
              <span v-if="errors.specialist_survey_category" class="danger_text">{{
                errors.specialist_survey_category[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Location of Survey/Inspection</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="specialist_survey_location"
                name="specialist_survey_location"
                v-model="w_orderData.specialist_survey_location"
                placeholder="Enter  Location"
              />
              <span v-if="errors.specialist_survey_location" class="danger_text">{{
                errors.specialist_survey_location[0]
              }}</span>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- <div class="col-25">
            <label for="fname"></label>
          </div> -->
          <div class="table_card" style="">
            <input type="button" value="+Add New" class="add_new" @click="addRowSpecialist" />
            <table class="" style="">
              <thead class="text text-success" style="width: 100%">
                <tr style="width: 100%">
                  <th style="width: 25%; position: center">Specialist Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style="width: 100%">
                <tr v-for="(specialist, index) in specialists" :key="index" style="width: 100%">
                  <td style="width: 25%">
                    <input name="specialist_name" v-model="specialist.name" class="form-control" type="text" />
                  </td>
                  <td style="width: 25%">
                    <input
                      style="color: aliceblue; background-color: #e34545"
                      type="button"
                      value="Remove"
                      class="back-btn"
                      @click="deleteRowSpecialist(index)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-25">
            <label for="fname"></label>
          </div> -->
          <div class="table_card" style="">
            <input type="button" value="+Add New" class="add_new" @click="addRowSurvey" />
            <table class="" style="">
              <thead class="text text-success" style="width: 100%">
                <tr style="width: 100%">
                  <th style="width: 25%">Scope of Survey</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style="width: 100%">
                <tr v-for="(survey, index) in surveys" :key="index" style="width: 100%">
                  <td style="width: 25%">
                    <input
                      name="specialist_survey_scope"
                      v-model="survey.specialist_survey_scope"
                      class="form-control"
                      type="text"
                    />
                  </td>
                  <td style="width: 25%">
                    <input
                      style="color: aliceblue; background-color: #e34545"
                      type="button"
                      value="Remove"
                      class="back-btn"
                      @click="deleteRowSurvey(index)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="basic_w_order">
        <h2>Legal Section</h2>
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="fname">Nature of Suit</label>
            </div>
            <div class="col-75">
              <select name="suit_nature" id="suit_nature" class="box" v-model="w_orderData.suit_nature">
                <option value="" selected disabled>Select Suit</option>
                <option value="Admiralty Suit">Admiralty Suit</option>
                <option value="Money Suit">Money Suit</option>
                <option value="Writ">Writ</option>
                <option value="Appeal">Appeal</option>
                <option value="Arbitration">Arbitration</option>
                <option value="Contempt Petition">Contempt Petition</option>
              </select>
              <span v-if="errors.suit_nature" class="danger_text">{{ errors.suit_nature[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Admiralty Suit No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="admiralty_suit_no"
                name="admiralty_suit_no"
                v-model="w_orderData.admiralty_suit_no"
                placeholder="Enter  Admiralty Suit no."
              />
              <span v-if="errors.admiralty_suit_no" class="danger_text">{{ errors.admiralty_suit_no[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Admiralty Court's Location</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="admiralty_court_location"
                name="admiralty_court_location"
                v-model="w_orderData.admiralty_court_location"
                placeholder="Enter  Admiralty Court's Location"
              />
              <span v-if="errors.admiralty_court_location" class="danger_text">{{
                errors.admiralty_court_location[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Case Status</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="case_status"
                name="case_status"
                v-model="w_orderData.case_status"
                placeholder="Enter  Case Status"
              />
              <span v-if="errors.case_status" class="danger_text">{{ errors.case_status[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Name of the Law Firm</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="law_firm_name"
                name="law_firm_name"
                v-model="w_orderData.law_firm_name"
                placeholder="Enter  Name of the Law Firm"
              />
              <span v-if="errors.law_firm_name" class="danger_text">{{ errors.law_firm_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Contact details of the Law Firm</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="law_firm_contact"
                name="law_firm_contact"
                v-model="w_orderData.law_firm_contact"
                placeholder="Enter  Name of the Law Firm"
              />
              <span v-if="errors.law_firm_contact" class="danger_text">{{ errors.law_firm_contact[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Name of the Lawyer</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="lawyer_name"
                name="lawyer_name"
                v-model="w_orderData.lawyer_name"
                placeholder="Enter  Lawyer Name"
              />
              <span v-if="errors.lawyer_name" class="danger_text">{{ errors.lawyer_name[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Lawyer's Email</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="lawyer_email"
                name="lawyer_email"
                v-model="w_orderData.lawyer_email"
                placeholder="Enter  Lawyer's Email"
              />
              <span v-if="errors.lawyer_email" class="danger_text">{{ errors.lawyer_email[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Lawyer's contact No.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="lawyer_contact"
                name="lawyer_contact"
                v-model="w_orderData.lawyer_contact"
                placeholder="Enter  contact No."
              />
              <span v-if="errors.lawyer_contact" class="danger_text">{{ errors.lawyer_contact[0] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="basic_w_order">
        <h2>Agents and other Stakeholders Details</h2>
        <div class="Addw_order">
          <div class="row">
            <div class="col-25">
              <label for="fname">Declaring Agent</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="declaring_agent"
                name="declaring_agent"
                v-model="w_orderData.declaring_agent"
                placeholder="Enter  Declearing Agent"
              />
              <span v-if="errors.declaring_agent" class="danger_text">{{ errors.declaring_agent[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">OPA</label>
            </div>
            <div class="col-75">
              <input type="text" id="opa" name="opa" v-model="w_orderData.opa" placeholder="Enter  OPA id" />
              <span v-if="errors.opa" class="danger_text">{{ errors.opa[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Charterer's protecting agent</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="charterer_protecting_agent"
                name="charterer_protecting_agent"
                v-model="w_orderData.charterer_protecting_agent"
                placeholder="Enter  charterer protecting agent"
              />
              <span v-if="errors.charterer_protecting_agent" class="danger_text">{{
                errors.charterer_protecting_agent[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">C&F</label>
            </div>
            <div class="col-75">
              <input type="text" id="c_n_f" name="c_n_f" v-model="w_orderData.c_n_f" placeholder="Enter  C&F" />
              <span v-if="errors.c_n_f" class="danger_text">{{ errors.c_n_f[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Stevedore Company</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="stevedore_company"
                name="stevedore_company"
                v-model="w_orderData.stevedore_company"
                placeholder="Enter  Stevedore Company"
              />
              <span v-if="errors.stevedore_company" class="danger_text">{{ errors.stevedore_company[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Barge Provider</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="barge_provider"
                name="barge_provider"
                v-model="w_orderData.barge_provider"
                placeholder="Enter  Barge Provider"
              />
              <span v-if="errors.barge_provider" class="danger_text">{{ errors.barge_provider[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Road Transportation Provider</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="rt_provider"
                name="rt_provider"
                v-model="w_orderData.rt_provider"
                placeholder="Enter  Transportation Provider Name"
              />
              <span v-if="errors.rt_provider" class="danger_text">{{ errors.rt_provider[0] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="basic_w_order1">
        <h2>Security/Undertaking</h2>
        <div class="Addw_order1">
          <div>
            <h3>Club LOU</h3>
            <div class="row">
              <div class="table_card" style="">
                <input type="button" value="+Add New" class="add_new" @click="addRowSecurity" />
                <table class="" style="">
                  <thead class="text text-success" style="width: 100%">
                    <tr style="width: 100%">
                      <th style="width: 25%">Club LOU Name</th>
                      <th style="width: 25%">Date of Issuance</th>
                      <th style="width: 25%">Club LOU File</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody style="width: 100%">
                    <tr v-for="(security, index) in securitys" :key="index" style="width: 100%">
                      <td style="width: 25%">
                        <input
                          type="text"
                          id="club_lou"
                          name="club_lou"
                          v-model="security.club_lou"
                          placeholder="Enter  Club LOU Name"
                        />
                        <span v-if="errors.club_lou" class="danger_text">{{ errors.club_lou[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          type="date"
                          id="lou_issue_date"
                          name="lou_issue_date"
                          v-model="security.lou_issue_date"
                          placeholder="Enter  Date of Issuance"
                        />
                        <span v-if="errors.lou_issue_date" class="danger_text">{{ errors.lou_issue_date[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          style="margin-left: 18%"
                          type="file"
                          name="lou_file"
                          @change="attachClubLouFile(index, $event)"
                          ref="workOrderClubLouFile"
                        />
                        <span v-if="errors.attachClubLouFile" class="danger_text">{{
                          errors.attachClubLouFile[0]
                        }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          style="background-color: #e34545; color: aliceblue"
                          type="button"
                          value="Remove"
                          class="back-btn"
                          @click="deleteRowSecurity(index)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <h3>Bank Guarantee</h3>
            <div class="row">
              <div class="table_card" style="">
                <input type="button" value="+Add New" class="add_new" @click="addRowBank" />
                <table class="" style="">
                  <thead class="text text-success" style="width: 100%">
                    <tr style="width: 100%">
                      <th style="width: 25%">Bank Guarantee Name</th>
                      <th style="width: 25%">Date of Issuance</th>
                      <th style="width: 25%">Bank Guarantee file</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody style="width: 100%">
                    <tr v-for="(bank, index) in banks" :key="index" style="width: 100%">
                      <td style="width: 25%">
                        <input
                          type="text"
                          id="bank_guarantee"
                          name="bank_guarantee"
                          v-model="bank.bank_guarantee"
                          placeholder="Enter  Bank Guarantee Name"
                        />
                        <span v-if="errors.bank_guarantee" class="danger_text">{{ errors.bank_guarantee[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          type="date"
                          id="bank_issue_date"
                          name="bank_issue_date"
                          v-model="bank.bank_issue_date"
                          placeholder="Enter  Date of Issuance"
                        />
                        <span v-if="errors.bank_issue_date" class="danger_text">{{ errors.bank_issue_date[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          style="margin-left: 18%"
                          type="file"
                          name="bank_file"
                          @change="attachBankFile(index, $event)"
                          ref="workOrderBankFile"
                        />
                        <span v-if="errors.attachBankFile" class="danger_text">{{ errors.attachBankFile[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          style="background-color: #e34545; color: aliceblue"
                          type="button"
                          value="Remove"
                          class="back-btn"
                          @click="deleteRowBank(index)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-25"></div>
        <div class="col-75">
          <input type="submit" value="Save" />
          <router-link to="/dashboard/workorders">
            <input type="button" value="Back" class="back-btn" />
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddW_Order",

  data() {
    return {
      users: [],
      consignes: [],
      cargos: [],
      containers: [],
      // ports: [{ loading: "", discharge: "" }],
      specialists: [],
      surveys: [],
      securitys: [],
      // banks: [{ bank_guarantee: "", bank_issue_date: "", bank_file: "" }],
      banks: [],
      //  attachments: [{ index: "" }],
      files: [],
      w_orderData: {
        //new
        relevent_files: "",
        file_opening_date: "",
        iml_reference_no: "",
        vessel_name: "",
        voyage_no: "",
        nature_of_incident: "",
        eta_date_time_pod: "",
        etb_date_time_pod: "",
        ata_date_time_pod: "",
        atb_date_time_pod: "",
        etcd_date_time_pod: "",
        atd_date_time_pol: "",
        club_name: "",
        club_file_reference_no: "",
        club_pic: "",
        shipowner_name: "",
        shipowner_file_reference_no: "",
        shipowner_pic: "",
        marine_survey_firm_reference_no: "",
        marine_survey_firm: "",
        marine_survey_location: "",
        // survey_scope: "",
        specialist_reference_no: "",
        survey_category: "",
        specialist_organization: "",
        specialist_name: "",
        specialist_survey_category: "",
        specialist_survey_location: "",
        // specialist_survey_scope: "",
        suit_nature: "",
        admiralty_suit_no: "",
        admiralty_court_location: "",
        case_status: "",
        law_firm_name: "",
        lawyer: "",
        declaring_agent: "",
        opa: "",
        c_n_f: "",
        stevedore_company: "",
        barge_provider: "",
        rt_provider: "",
        // club_lou: "",
        lou_issue_date: "",
        // lou_file: "",
        bank_guarantee: "",
        // bank_issue_date: "",
        // bank_file: "",
        law_firm_contact: "",
        lawyer_email: "",
        lawyer_name: "",
        lawyer_contact: "",
        charterer_protecting_agent: "",
      },
      preview_relevent_files: null,
      preview: null,
      preview_file: null,
      errors: {},
      image_url: [],
    };
  },

  computed: {
    ...mapState({
      survey_firms: (state) => state.surveyfirm.firms,
      message: (state) => state.w_order.success_message,
    }),
  },

  mounted() {
    this.getSurveyFirm();
  },

  methods: {
    ...mapActions({
      getSurveyFirm: "surveyfirm/get_firm",
    }),
    // addRowAttachment: function () {
    //   this.attachments.push({ relevent_files: "" });
    // },

    deleteRowAttachment(index) {
      this.attachments.splice(index, 1);
    },
    addRowBank: function () {
      this.banks.push({
        bank_guarantee: "",
        bank_issue_date: "",
        bank_file: "",
      });
    },

    deleteRowBank(index) {
      this.banks.splice(index, 1);
    },

    addRowSecurity: function () {
      this.securitys.push({
        club_lou: "",
        lou_issue_date: "",
        lou_file: "",
      });
    },

    deleteRowSecurity(index) {
      this.securitys.splice(index, 1);
    },
    addRowSurvey: function () {
      this.surveys.push({ specialist_survey_scope: "" });
    },

    deleteRowSurvey(index) {
      this.surveys.splice(index, 1);
    },
    addRowSpecialist: function () {
      this.specialists.push({ name: "" });
    },

    deleteRowSpecialist(index) {
      this.specialists.splice(index, 1);
    },
    addRowPort: function () {
      this.ports.push({ loading: "", discharge: "" });
    },

    deleteRowPort(index) {
      this.ports.splice(index, 1);
    },
    addRowContainer: function () {
      this.containers.push({ name: "", number: "" });
    },

    deleteRowContainer(index) {
      this.containers.splice(index, 1);
    },
    addRowCargo: function () {
      this.cargos.push({ name: "", quantity: "" });
    },

    deleteRowCargo(index) {
      this.cargos.splice(index, 1);
    },
    addRowConsignee: function () {
      this.consignes.push({ name: "" });
    },

    deleteRowConsignee(index) {
      this.consignes.splice(index, 1);
    },
    addRow: function () {
      this.users.push({
        name: "",
        type: "",
        charterers_ref_no: "",
        charterers_pic: "",
      });
    },

    deleteRow(index) {
      this.users.splice(index, 1);
    },

    attachReleventFile: function () {
      this.w_orderData.relevent_files = this.$refs.workOrderReleventFile.files;
    },

    attachClubLouFile: function (index, $event) {
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = () => {
        const security = this.securitys[index];
        this.securitys.splice(index, 1, {
          ...security,
          lou_file: reader.result,
        });
      };
    },
    attachBankFile: function (index, $event) {
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = () => {
        const bank = this.banks[index];
        this.banks.splice(index, 1, {
          ...bank,
          bank_file: reader.result,
        });
      };
    },

    addW_order: async function () {
      console.log("ATB: " + this.w_orderData.atb_date_time_pod);
      try {
        let formData = new FormData();

        var user_data = JSON.stringify(this.users);
        var consignee_data = JSON.stringify(this.consignes);
        var cargo_data = JSON.stringify(this.cargos);
        var container_data = JSON.stringify(this.containers);
        // var ports_data = JSON.stringify(this.ports);
        var specialist_data = JSON.stringify(this.specialists);
        var specialist_survey_data = JSON.stringify(this.surveys);
        // var relevent_attachement = JSON.stringify(this.attachments);
        var marine_survey_data = JSON.stringify(this.marine_surveys);

        var bank_data = JSON.stringify(this.banks);
        var security_data = JSON.stringify(this.securitys);

        // console.log(JSON.stringify(this.attachments.relevent_files));

        console.log("Attachments: ", this.testAttachedFiles);
        formData.append("test_attached_files", this.testAttachedFiles);
        formData.append("file_opening_date", this.w_orderData.file_opening_date);
        formData.append("iml_reference_no", this.w_orderData.iml_reference_no);
        formData.append("vessel_name", this.w_orderData.vessel_name);
        formData.append("voyage_no", this.w_orderData.voyage_no);
        formData.append("nature_of_incident", this.w_orderData.nature_of_incident);
        formData.append("eta_date_time_pod", this.w_orderData.eta_date_time_pod);
        formData.append("ata_date_time_pod", this.w_orderData.ata_date_time_pod);

        formData.append("rt_provider", this.w_orderData.rt_provider);
        formData.append("barge_provider", this.w_orderData.barge_provider);
        formData.append("stevedore_company", this.w_orderData.stevedore_company);
        formData.append("c_n_f", this.w_orderData.c_n_f);
        formData.append("opa", this.w_orderData.opa);
        formData.append("declaring_agent", this.w_orderData.declaring_agent);
        formData.append("lawyer_name", this.w_orderData.lawyer_name);
        formData.append("lawyer_email", this.w_orderData.lawyer_email);
        formData.append("lawyer_contact", this.w_orderData.lawyer_contact);
        formData.append("charterer_protecting_agent", this.w_orderData.charterer_protecting_agent);
        formData.append("law_firm_name", this.w_orderData.law_firm_name);
        formData.append("law_firm_contact", this.w_orderData.law_firm_contact);
        formData.append("case_status", this.w_orderData.case_status);
        formData.append("admiralty_court_location", this.w_orderData.admiralty_court_location);
        formData.append("admiralty_suit_no", this.w_orderData.admiralty_suit_no);
        formData.append("suit_nature", this.w_orderData.suit_nature);
        formData.append("survey_category", this.w_orderData.survey_category);
        formData.append("specialist_reference_no", this.w_orderData.specialist_reference_no);
        formData.append("specialist_survey_category", this.w_orderData.specialist_survey_category);
        formData.append("specialist_survey_location", this.w_orderData.specialist_survey_location);
        formData.append("specialist_organization", this.w_orderData.specialist_organization);
        formData.append("survey_firm", this.w_orderData.marine_survey_firm);
        formData.append("survey_location", this.w_orderData.marine_survey_location);
        formData.append("survey_firm_reference_no", this.w_orderData.marine_survey_firm_reference_no);
        formData.append("shipowner_pic", this.w_orderData.shipowner_pic);
        formData.append("shipowner_file_reference_no", this.w_orderData.shipowner_file_reference_no);
        formData.append("stevedore_company", this.w_orderData.stevedore_company);
        formData.append("shipowner_name", this.w_orderData.shipowner_name);
        formData.append("club_pic", this.w_orderData.club_pic);
        formData.append("club_file_reference_no", this.w_orderData.club_file_reference_no);
        formData.append("club_name", this.w_orderData.club_name);
        formData.append("etb_date_time_pod", this.w_orderData.etb_date_time_pod);
        formData.append("atd_date_time_pol", this.w_orderData.atd_date_time_pol);
        formData.append("etcd_date_time_pod", this.w_orderData.etcd_date_time_pod);
        formData.append("atb_date_time_pod", this.w_orderData.atb_date_time_pod);
        formData.append("club_pic", this.w_orderData.club_pic);
        formData.append("user_data", user_data);
        formData.append("consignee_data", consignee_data);
        formData.append("cargo_data", cargo_data);
        formData.append("container_data", container_data);
        // formData.append("ports_data", ports_data);
        formData.append("specialist_name", specialist_data);
        formData.append("specialist_survey_scope", specialist_survey_data);
        formData.append("marine_survey_data", marine_survey_data);
        // formData.append("relevent_attachement", this.attachements);
        formData.append("bank_data", bank_data);
        formData.append("security_data", security_data);

        for (var i = 0; i < this.w_orderData.relevent_files.length; i++) {
          let file = this.w_orderData.relevent_files[i];
          formData.append("relevent_files[" + i + "]", file);
        }

        // formData.append("lou_file", security_data);
        // formData.append("lou_file", security_data.lou_file);
        await this.$store.dispatch("w_order/add_w_order", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.w_orderData = {};
          this.$router.go(-1);
        });
      } catch (e) {
        switch (e.response.status) {
          case 422:
            this.errors = e.response.data.errors;
            break;
          default:
            this.$swal.fire({
              icon: "error",
              text: "Oops",
              title: e.response.data.error,
            });
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#add_w_order {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}
.basic_w_order {
  background: rgb(208 206 206);
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(234, 233, 233);
  transition: all 300ms ease;
  margin-top: 1%;
}
.basic_w_order1 {
  background: rgb(208 206 206);
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(234, 233, 233);
  transition: all 300ms ease;
  margin-top: 1%;
}
.Addw_order {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.2rem;
  margin-top: 1%;
  margin-bottom: 2.5rem;
}
.Addw_order1 {
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  gap: 1.5rem;
  margin-top: 1%;
}
#add_surveyor {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 0%;
}

.AddSurveyor {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0rem;
  margin-top: 1%;
}
select {
  width: 70%;
  height: 40px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
th {
  background-color: #9ea2a3e8;
  color: #343333;
}
.add_new:hover {
  background-color: #226798;
  box-shadow: rgba(0, 0, 0, 0.05) 0 5px 30px, rgba(0, 0, 0, 0.05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.35s;
}
.add_new:hover:after {
  opacity: 0.5;
}

.add_new:active {
  box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px 0, rgba(0, 0, 0, 0.1) 0 0 10px 0, rgba(0, 0, 0, 0.1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: 0.35s;
}

.add_new:active:after {
  opacity: 1;
}
.add_new {
  width: 10%;
  border-radius: 5px;
  background-color: #01579b;
  margin-right: 0%;
  color: rgb(238 239 240);
  font-weight: 600;
  /* margin-top: -3%; */
  margin-left: 90%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 1px -2px, rgba(0, 0, 0, 0.14) 0 2px 2px 0, rgba(0, 0, 0, 0.12) 0 1px 5px 0;
}
input [type="button"] {
  width: 100%;
  background-color: rgb(108 187 206);
  margin-right: 0%;
  color: #0d0f10;
  font-weight: 600;
}
h2 {
  margin-bottom: -1rem;
}
.back-btn {
  padding: 7px 9px;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  font-size: 16px;
}
input[type="submit"] {
  padding: 8px 14px;
  font-size: 16px;
}
input[type="file"] {
  margin-top: 4px;
  margin-left: 6px;
}
</style>
