<template>
  <div id="edit_w_order">
    <form v-on:submit.prevent="editW_order">
      <br />
      <h2>Details of File</h2>
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
                v-model="editW_orderList.file_opening_date"
              />
              <span v-if="errors.file_opening_date" class="danger_text">{{ errors.file_opening_date[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">IML File Reference no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="iml_reference_no"
                name="iml_reference_no"
                v-model="editW_orderList.iml_reference_no"
                placeholder="Enter Your IML File Reference no."
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
                v-model="editW_orderList.vessel_name"
                placeholder="Enter Your vessel name"
              />
              <span v-if="errors.vessel_name" class="danger_text">{{ errors.vessel_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="lname">Voyage no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="voyage_no"
                name="voyage_no"
                v-model="editW_orderList.voyage_no"
                placeholder=" Enter POL"
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
                v-model="editW_orderList.nature_of_incident"
                placeholder=" Enter nature of incident"
              />
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
                v-model="editW_orderList.eta_date_time_pod"
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
                v-model="editW_orderList.ata_date_time_pod"
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
                v-model="editW_orderList.etb_date_time_pod"
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
                v-model="editW_orderList.atb_date_time_pod"
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
                v-model="editW_orderList.etcd_date_time_pod"
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
                type="datetime-local"
                id="atd_date_time_pol"
                name="atd_date_time_pol"
                v-model="editW_orderList.atd_date_time_pol"
                placeholder=" Enter atd date time pol"
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
                <input type="file" name="relevent_files" ref="workOrderReleventFile" multiple />
                <span v-if="errors.attachReleventFile" class="danger_text">{{ errors.attachReleventFile[0] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="basic_w_order">
        <h2>Relevant Files:</h2>
        <div class="card">
          <div>
            <div style="padding: 10px 10px">
              <table class="" style="">
                <thead class="text text-success" style="width: 100%">
                  <tr style="width: 100%">
                    <th style="width: 25%; position: center">Name Of Relevent File</th>
                    <th style="width: 25%; position: center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="width: 100%" v-for="file in relavent_files" :value="file.id" :key="file.id">
                    <td style="width: 20%">
                      <a v-on:click="downloadFile(file.id)">
                        {{ file.file_name }}
                      </a>
                    </td>
                    <td data-label="Action" style="text-align: center">
                      <button type="button" class="actio-button-margin download" v-on:click="downloadFile(file.id)">
                        <span class="material-icons-sharp add" style="font-size: 11px">download</span>
                        Download File
                      </button>
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
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
                v-model="editW_orderList.club_name"
                id="club_name"
                name="club_name"
                placeholder="Enter Your club name"
              />
              <span v-if="errors.club_name" class="danger_text">{{ errors.club_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Club's File Ref no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="club_file_reference_no"
                name="club_file_reference_no"
                v-model="editW_orderList.club_file_reference_no"
                placeholder="Enter Your Club's File Ref no."
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
                v-model="editW_orderList.club_pic"
                placeholder="Enter Your Club's PIC"
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
                v-model="editW_orderList.shipowner_name"
                placeholder="Enter Your shipowner_name"
              />
              <span v-if="errors.shipowner_name" class="danger_text">{{ errors.shipowner_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Shipwoners File Ref no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="shipowner_file_reference_no"
                name="shipowner_file_reference_no"
                v-model="editW_orderList.shipowner_file_reference_no"
                placeholder="Enter Your Shipwoners File Ref no."
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
                v-model="editW_orderList.shipowner_pic"
                placeholder="Enter Your Shipwoners PIC"
              />
              <span v-if="errors.shipowner_pic" class="danger_text">{{ errors.shipowner_pic[0] }}</span>
            </div>
          </div>
        </div>
        <div class="table_card" style="">
          <label for="fname">Charterer's Details</label>
          <table class="" style="">
            <thead class="text text-success" style="width: 100%">
              <tr style="width: 100%">
                <th style="width: 25%; position: center">Name Of Charterers</th>
                <th style="width: 25%; position: center">Type</th>
                <th style="width: 25%; position: center">Charterer's File Ref no.</th>
                <th style="width: 25%; position: center">Charterers PIC</th>
              </tr>
            </thead>
            <tbody>
              <tr style="width: 100%" v-for="chart in chars" :value="chart.id" :key="chart.id">
                <td style="width: 20%">
                  <input name="charterer_name" v-model="chart.charterer_name" class="form-control" type="text" />
                </td>
                <td style="width: 40%">
                  <select name="charterer_type" id="charterer_type" class="box" v-model="chart.charterer_type">
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
                    v-model="chart.charterer_file_reference_no"
                    class="form-control"
                    type="text"
                  />
                </td>
                <td style="width: 20%">
                  <input name="charterer_pic" v-model="chart.charterer_pic" class="form-control" type="text" />
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
                v-model="editW_orderList.survey_firm_reference_no"
                placeholder="Enter Your Survey Category"
              />
              <span v-if="errors.survey_firm_reference_no" class="danger_text">{{
                errors.survey_firm_reference_no[0]
              }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Survey Firm Name</label>
            </div>
            <div class="col-75">
              <select v-model="editW_orderList.survey_firm">
                <option value="">Select Survey Firm</option>
                <option v-for="surveyFirm in survey_firms" :value="surveyFirm.id" :key="surveyFirm.id">
                  {{ surveyFirm.name }}
                </option>
              </select>
              <span v-if="errors.member" class="danger_text">{{ errors.member[0] }}</span>
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
                v-model="editW_orderList.survey_location"
                placeholder="Enter Your Location"
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
                v-model="editW_orderList.specialist_reference_no"
                placeholder="Enter Your Survey Category"
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
                v-model="editW_orderList.specialist_organization"
                placeholder="Enter Your Survey Category"
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
                v-model="editW_orderList.specialist_survey_category"
                placeholder="Enter Your Survey Category"
              />
              <span v-if="errors.specialist_survey_category" class="danger_text">{{
                errors.specialist_survey_category[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Location</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="specialist_survey_location"
                name="specialist_survey_location"
                v-model="editW_orderList.specialist_survey_location"
                placeholder="Enter Your Location"
              />
              <span v-if="errors.specialist_survey_location" class="danger_text">{{
                errors.specialist_survey_location[0]
              }}</span>
            </div>
          </div>

          <div class="row">
            <div class="table_card" style="">
              <table class="" style="">
                <thead class="text text-success" style="width: 100%">
                  <tr style="width: 100%">
                    <th style="width: 25%; position: center">Specialist Name</th>
                    <!-- <th></th> -->
                  </tr>
                </thead>
                <tbody style="width: 100%">
                  <tr v-for="survey in specialist_names" :key="survey.name" style="width: 100%">
                    <td style="width: 25%">
                      <input name="specialist_name" v-model="survey.name" class="form-control" type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="table_card" style="">
              <table class="" style="">
                <thead class="text text-success" style="width: 100%">
                  <tr style="width: 100%">
                    <th style="width: 25%">Scope of Survey</th>
                  </tr>
                </thead>
                <tbody style="width: 100%">
                  <tr
                    v-for="survey in specialist_survey_scopes"
                    :key="survey.specialist_survey_scope"
                    style="width: 100%"
                  >
                    <td style="width: 25%">
                      <input
                        name="specialist_survey_scope"
                        v-model="survey.specialist_survey_scope"
                        class="form-control"
                        type="text"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
              <select name="suit_nature" id="suit_nature" class="box" v-model="editW_orderList.suit_nature">
                <option value="Select Suit" selected disabled>Select Suit</option>
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
              <label for="fname">Admiralty Suit no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="admiralty_suit_no"
                name="admiralty_suit_no"
                v-model="editW_orderList.admiralty_suit_no"
                placeholder="Enter Your Admiralty Suit no."
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
                v-model="editW_orderList.admiralty_court_location"
                placeholder="Enter Your Admiralty Court's Location"
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
                v-model="editW_orderList.case_status"
                placeholder="Enter Your Case Status"
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
                v-model="editW_orderList.law_firm_name"
                placeholder="Enter Your Name of The Law Firm"
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
                v-model="editW_orderList.law_firm_contact"
                placeholder="Enter Your Name of The Law Firm"
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
                v-model="editW_orderList.lawyer_name"
                placeholder="Enter Your Lawyer Name"
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
                v-model="editW_orderList.lawyer_email"
                placeholder="Enter Your Lawyer Name"
              />
              <span v-if="errors.lawyer_email" class="danger_text">{{ errors.lawyer_email[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Lawyer's contact no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="lawyer_contact"
                name="lawyer_contact"
                v-model="editW_orderList.lawyer_contact"
                placeholder="Enter Your Lawyer Name"
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
              <label for="fname">Declearing Agent</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="declaring_agent"
                name="declaring_agent"
                v-model="editW_orderList.declaring_agent"
                placeholder="Enter Your Declearing Agent"
              />
              <span v-if="errors.declaring_agent" class="danger_text">{{ errors.declaring_agent[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">OPA</label>
            </div>
            <div class="col-75">
              <input type="text" id="opa" name="opa" v-model="editW_orderList.opa" placeholder="Enter Your OPA id" />
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
                v-model="editW_orderList.charterer_protecting_agent"
                placeholder="Enter Your charterer protecting agent"
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
              <input type="text" id="c_n_f" name="c_n_f" v-model="editW_orderList.c_n_f" placeholder="Enter Your C&F" />
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
                v-model="editW_orderList.stevedore_company"
                placeholder="Enter Your Stevedore Company"
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
                v-model="editW_orderList.barge_provider"
                placeholder="Enter Your Barge Provider"
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
                v-model="editW_orderList.rt_provider"
                placeholder="Enter Your Transportation Provider Name"
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
                <table class="" style="">
                  <thead class="text text-success" style="width: 100%">
                    <tr style="width: 100%">
                      <th style="width: 25%">Club LOU Title</th>
                      <th style="width: 25%">Date of Issuance</th>
                      <th style="width: 25%">Club LOU File</th>
                    </tr>
                  </thead>
                  <tbody style="width: 100%">
                    <tr v-for="(secur, index) in security.club" :key="index" style="width: 100%">
                      <td style="width: 25%">
                        <input
                          type="text"
                          id="club_lou"
                          name="club_lou"
                          v-model="secur.club_lou"
                          placeholder="Enter Club LOU Title"
                        />
                        <span v-if="errors.club_lou" class="danger_text">{{ errors.club_lou[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          type="date"
                          id="lou_issue_date"
                          name="lou_issue_date"
                          v-model="secur.lou_issue_date"
                          placeholder="Enter Date of Issuance"
                        />
                      </td>
                      <td style="width: 50%">
                        <button
                          type="button"
                          class="actio-button-margin download"
                          v-on:click="downloadClubLouFile(secur.lou_file)"
                          v-if="secur.lou_file"
                        >
                          Download
                        </button>
                        <br />
                        <iframe :src="secur.lou_file" title="description" v-if="secur.lou_file"></iframe>
                        <h3 class="none" v-else>--</h3>
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
                <table class="" style="">
                  <thead class="text text-success" style="width: 100%">
                    <tr style="width: 100%">
                      <th style="width: 25%">Bank Guarantee Title</th>
                      <th style="width: 25%">Date of Issuance</th>
                      <th style="width: 25%">Bank Guarantee file</th>
                    </tr>
                  </thead>
                  <tbody style="width: 100%">
                    <tr v-for="(bank, index) in security.bank_guarantee" :key="index" style="width: 100%">
                      <td style="width: 25%">
                        <input
                          type="text"
                          id="bank_guarantee"
                          name="bank_guarantee"
                          v-model="bank.bank_guarantee"
                          placeholder="Enter Bank Guarantee Title"
                        />
                        <span v-if="errors.bank_guarantee" class="danger_text">{{ errors.bank_guarantee[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          type="date"
                          id="bank_issue_date"
                          name="bank_issue_date"
                          v-model="bank.bank_issue_date"
                          placeholder="Enter Date of Issuance"
                        />
                        <span v-if="errors.bank_issue_date" class="danger_text">{{ errors.bank_issue_date[0] }}</span>
                      </td>
                      <td style="width: 50%">
                        <button
                          type="button"
                          class="actio-button-margin download"
                          v-on:click="downloadBankFile(bank.bank_file)"
                          v-if="bank.bank_file"
                        >
                          Download</button
                        ><br />
                        <iframe :src="bank.bank_file" title="description" v-if="bank.bank_file"></iframe>
                        <h3 class="none" v-else>--</h3>
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
import { downloadPdf } from "../../../service/http_service";

export default {
  name: "AddW_Order",

  data() {
    let apiUrl = this.$store.state.apiUrl;
    return {
      download_file_url: apiUrl + "v1/work_orders/download_relevent_file/",
      charterers: "",
      files: "",
      lou_file: "",
      surveys: [],
      securities: "",
      banks: "",
      errors: {},
    };
  },

  computed: {
    ...mapState({
      survey_firms: (state) => state.surveyfirm.firms,
      editW_orderList: (state) => state.w_order.w_order,
      relavent_files: (state) => state.w_order.relavent_files,
      security: (state) => state.w_order.securities,
      chars: (state) => state.w_order.charterers,
      specialist_names: (state) => state.w_order.specialist_names,
      specialist_survey_scopes: (state) => state.w_order.specialist_survey_scopes,
      message: (state) => state.w_order.success_message,
    }),
  },
  mounted() {
    this.getSurveyFirm();
    this.getEditW_order(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      getSurveyFirm: "surveyfirm/get_firm",
      getEditW_order: "w_order/edit_w_order",
    }),
    downloadFile(id) {
      let url = this.download_file_url + id;
      // window.open(url, "_blank");

      downloadPdf(url);
    },
    downloadBankFile(bank_file) {
      let fileName = "Bank_File.pdf";
      let bankFile = bank_file;
      let downloadLink = document.createElement("a");
      downloadLink.href = bankFile;
      downloadLink.download = fileName;
      downloadLink.click();
    },
    downloadClubLouFile(lou_file) {
      let fileName = "Club_Lou_File.pdf";
      let louFile = lou_file;
      let downloadLink = document.createElement("a");
      downloadLink.href = louFile;
      downloadLink.download = fileName;
      downloadLink.click();
    },
  },
};
</script>

<style scoped>
#edit_w_order {
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1%;
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
  gap: 1.5rem;
  margin-top: 1%;
}
select {
  width: 97%;
  height: 38px;
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 20%), 0 2px 15px 0 rgb(0 0 0 / 19%);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

/* Dropdown Button */
.dropbtn {
  background-color: #f7f5f5;
  color: #020202;
  padding: 5px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
}
.download {
  background-color: #0d960d;
  margin-bottom: 4px;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 119px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1;
  margin-left: 0%;
  border-radius: 10px;
  width: 100%;
}

.dropdown-content button {
  margin: 5px 4px 5px 8px;
  width: 70%;
}

.active {
  opacity: 2;
  pointer-events: visible;
  top: 100%;
  display: none;
  z-index: 1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}
a {
  cursor: pointer;
  color: blue;
}
input[type="text"],
[type="date"],
[type="datetime-local"] {
  width: 97%;
}
input[type="file"] {
  margin-top: 4px;
  margin-left: 6px;
}
.none {
  margin-bottom: 12px;
}
</style>
