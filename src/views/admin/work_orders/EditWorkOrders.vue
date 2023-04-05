<template>
  <div id="edit_w_order">
    <form v-on:submit.prevent="editW_order">
      <br />
      <h2>Edit File</h2>
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
                v-model="editW_orderList.vessel_name"
                placeholder="Enter  vessel name"
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

      <!-- {{ relavent_files }} -->
      <div class="basic_w_order">
        <h2>Relevant Documents:</h2>
        <div class="card">
          <div>
            <div style="padding: 10px 10px">
              <table class="" style="">
                <thead class="text text-success" style="width: 100%">
                  <tr style="width: 100%">
                    <th style="width: 25%; position: center">Name Of Relevent Documents</th>
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
                      <button type="button" class="actio-button-margin delete" v-on:click="confirmDelete(file)">
                        <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
                        Delete
                      </button>
                      <button type="button" class="actio-button-margin download" v-on:click="downloadFile(file.id)">
                        <span class="material-icons-sharp add" style="font-size: 11px">download</span>
                        Download
                      </button>
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
                placeholder="Enter  club name"
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
                v-model="editW_orderList.club_pic"
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
                v-model="editW_orderList.shipowner_name"
                placeholder="Enter  shipowner_name"
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
                v-model="editW_orderList.shipowner_pic"
                placeholder="Enter  Shipwoners PIC"
              />
              <span v-if="errors.shipowner_pic" class="danger_text">{{ errors.shipowner_pic[0] }}</span>
            </div>
          </div>
        </div>
        <div class="table_card" style="">
          <label for="fname">Charterer's Details</label>
          <input
            style="
              width: 10%;
              background-color: #01579b;
              margin-right: 0%;
              color: rgb(238 239 240);
              font-weight: 600;
              margin-top: -3%;
              margin-left: 90%;
              border-radius: 5px;
            "
            type="button"
            value="+Add New"
            class="add_new"
            @click="addRow"
          />

          <table class="" style="">
            <thead class="text text-success" style="width: 100%">
              <tr style="width: 100%">
                <th style="width: 25%; position: center">Name Of Charterers</th>
                <th style="width: 25%; position: center">Type</th>
                <th style="width: 25%; position: center">Charterer's File Ref no.</th>
                <th style="width: 25%; position: center">Charterers PIC</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr style="width: 100%" v-for="chart in chars" :value="chart.id" :key="chart.id">
                <td style="width: 20%">
                  <input name="charterer_name" v-model="chart.charterer_name" class="form-control" type="text" />
                </td>
                <td style="width: 25%">
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
                <td style="width: 25%">
                  <input name="charterer_pic" v-model="chart.charterer_pic" class="form-control" type="text" />
                </td>
                <td style="width: 5%">
                  <input
                    style="background-color: red; color: aliceblue"
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
                v-model="editW_orderList.survey_firm_reference_no"
                placeholder="Enter  Survey Category"
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
                v-model="editW_orderList.specialist_reference_no"
                placeholder="Enter  Survey Category"
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
                placeholder="Enter  Survey Category"
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
                placeholder="Enter  Survey Category"
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
                placeholder="Enter  Location"
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
                    <th></th>
                  </tr>
                </thead>
                <tbody style="width: 100%">
                  <tr v-for="(survey, index) in specialist_names" :key="survey.name" style="width: 100%">
                    <td style="width: 25%">
                      <input name="specialist_name" v-model="survey.name" class="form-control" type="text" />
                    </td>
                    <td style="width: 25%">
                      <input
                        style="color: aliceblue; background-color: red"
                        type="button"
                        value="Remove"
                        class="back-btn"
                        @click="deleteRowSurveyName(index)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <input
                style="margin-right: 0%; width: 100%; color: aliceblue; background-color: #01579b"
                type="button"
                value="Add New"
                class="back-btn"
                @click="addRowSurveyName"
              />
            </div>
          </div>
          <div class="row">
            <div class="table_card" style="">
              <table class="" style="">
                <thead class="text text-success" style="width: 100%">
                  <tr style="width: 100%">
                    <th style="width: 25%">Scope of Survey</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style="width: 100%">
                  <tr
                    v-for="(survey, index) in specialist_survey_scopes"
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
                    <td style="width: 25%">
                      <input
                        style="color: aliceblue; background-color: red"
                        type="button"
                        value="Remove"
                        class="back-btn"
                        @click="deleteRowSurveyScope(index)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <input
                style="margin-right: 0%; width: 100%; color: aliceblue; background-color: #01579b"
                type="button"
                value="Add New"
                class="back-btn"
                @click="addRowSurveyScope"
              />
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
                placeholder="Enter Admiralty Suit no."
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
                placeholder="Enter Admiralty Court's Location"
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
                placeholder="Enter Case Status"
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
                placeholder="Enter Name of The Law Firm"
              />
              <span v-if="errors.law_firm_name" class="danger_text">{{ errors.law_firm_name[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Contact Details of the Law Firm</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="law_firm_contact"
                name="law_firm_contact"
                v-model="editW_orderList.law_firm_contact"
                placeholder="Enter Address of The Law Firm"
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
                placeholder="Enter Lawyer's Name"
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
                placeholder="Enter Lawyer's Email"
              />
              <span v-if="errors.lawyer_email" class="danger_text">{{ errors.lawyer_email[0] }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Lawyer's Contact no.</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="lawyer_contact"
                name="lawyer_contact"
                v-model="editW_orderList.lawyer_contact"
                placeholder="Enter Lawyer's Contact no."
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
                placeholder="Enter Declearing Agent"
              />
              <span v-if="errors.declaring_agent" class="danger_text">{{ errors.declaring_agent[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">OPA</label>
            </div>
            <div class="col-75">
              <input type="text" id="opa" name="opa" v-model="editW_orderList.opa" placeholder="Enter OPA" />
              <span v-if="errors.opa" class="danger_text">{{ errors.opa[0] }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label for="fname">Charterer's Protecting Agent</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="charterer_protecting_agent"
                name="charterer_protecting_agent"
                v-model="editW_orderList.charterer_protecting_agent"
                placeholder="Enter Charterer's Protecting Agent"
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
              <input type="text" id="c_n_f" name="c_n_f" v-model="editW_orderList.c_n_f" placeholder="Enter C&F" />
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
                placeholder="Enter Stevedore Company"
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
                placeholder="Enter Barge Provider"
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
                placeholder="Enter Road Transportation Provider"
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
                <input
                  style="
                    width: 10%;
                    background-color: #01579b;
                    margin-right: 0%;
                    color: rgb(238 239 240);
                    font-weight: 600;
                    margin-top: -3%;
                    margin-left: 90%;
                    border-radius: 5px;
                  "
                  type="button"
                  value="+Add New"
                  class="add_new"
                  @click="addRowClub"
                />
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
                    <tr v-for="(secur, index) in security.club" :key="index" style="width: 100%">
                      <td style="width: 25%">
                        <input
                          type="text"
                          id="club_lou"
                          name="club_lou"
                          v-model="secur.club_lou"
                          placeholder="Enter  Club LOU Name"
                        />
                        <span v-if="errors.club_lou" class="danger_text">{{ errors.club_lou[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          type="date"
                          id="lou_issue_date"
                          name="lou_issue_date"
                          v-model="secur.lou_issue_date"
                          placeholder="Enter  Date of Issuance"
                        />
                        <span v-if="errors.lou_issue_date" class="danger_text">{{ errors.lou_issue_date[0] }}</span>
                      </td>
                      <td style="width: 25%; position: center">
                        <input
                          style="margin-left: 18%; margin-bottom: 4px"
                          type="file"
                          name="lou_file"
                          @change="attachClubLouFile(index, $event)"
                          ref="workOrderClubLouFile"
                          multiple
                        />
                        <iframe :src="secur.lou_file" title="description" v-if="secur.lou_file"></iframe>
                        <span v-if="errors.attachLouFile" class="danger_text">{{ errors.attachLouFile[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          style="background-color: red; color: aliceblue"
                          type="button"
                          value="Remove"
                          class="back-btn"
                          @click="deleteRowClub(index)"
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
                <input
                  style="
                    width: 10%;
                    background-color: #01579b;
                    margin-right: 0%;
                    color: rgb(238 239 240);
                    font-weight: 600;
                    margin-top: -3%;
                    margin-left: 90%;
                    border-radius: 5px;
                  "
                  type="button"
                  value="+Add New"
                  class="add_new"
                  @click="addRowBank"
                />
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
                    <tr v-for="(bank, index) in security.bank_guarantee" :key="index" style="width: 100%">
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
                          style="margin-left: 18%; margin-bottom: 4px"
                          type="file"
                          name="bank_file"
                          @change="attachBankFile(index, $event)"
                          ref="workOrderBankFile"
                        />
                        <iframe :src="bank.bank_file" title="description" v-if="bank.bank_file"></iframe>
                        <span v-if="errors.bank_file" class="danger_text">{{ errors.bank_file[0] }}</span>
                      </td>
                      <td style="width: 25%">
                        <input
                          style="background-color: red; color: aliceblue"
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
          <input type="submit" value="Update" />
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
import { http, downloadPdf } from "../../../service/http_service";

export default {
  name: "AddW_Order",

  data() {
    let apiUrl = this.$store.state.apiUrl;
    // let fid = this.relavent_files.id;
    // let token = this.$store.state.token;
    return {
      download_file_url: apiUrl + "v1/work_orders/download_relevent_file/",
      charterers: "",
      files: "",
      // lou_file: "",
      // consignes: [{ name: "" }],
      // cargos: [{ name: "", quantity: "" }],
      // containers: [{ name: "", number: "" }],
      // ports: [{ loading: "", discharge: "" }],
      // marines: [{ name: "" }],
      // marine_surveys: [{ survey_scope: "" }],
      // specialist_names: "",
      surveys: [],
      // attachments: [{ relevant_file: "" }],
      securitys: [],
      banks: [],

      // editW_orderList: {},
      //  attachments: [{ index: "" }],

      // editW_orderList: {
      //   new,
      //   file_opening_date: "",
      //   iml_reference_no: "",
      //   vessel_name: "",
      //   voyage_no: "",
      //   nature_of_incident: "",
      //   eta_date_time_pod: "",
      //   ata_date_time_pod: "",
      //   atb_date_time_pod: "",
      //   etcd_date_time_pod: "",
      //   atd_date_time_pol: "",
      //   club: "",
      //   club_file_reference_no: "",
      //   club_pic: "",
      //   shipowner_name: "",
      //   shipowner_file_reference_no: "",
      //   shipowner_pic: "",
      //   marine_survey_firm_reference_no: "",
      //   marine_survey_firm: "",
      //   marine_survey_location: "",
      //   // survey_scope: "",
      //   specialist_reference_no: "",
      //   survey_category: "",
      //   specialist_organization: "",
      //   specialist_name: "",
      //   specialist_survey_category: "",
      //   specialist_survey_location: "",
      //   // specialist_survey_scope: "",
      //   suit_nature: "",
      //   admiralty_suit_no: "",
      //   admiralty_court_location: "",
      //   case_status: "",
      //   law_firm_name: "",
      //   lawyer: "",
      //   declaring_agent: "",
      //   opa: "",
      //   c_n_f: "",
      //   stevedore_company: "",
      //   barge_provider: "",
      //   rt_provider: "",
      //   club_lou: "",
      //   lou_issue_date: "",
      //   lou_file: "",
      //   bank_guarantee: "",
      //   bank_issue_date: "",
      //   bank_file: "",
      //   law_firm_contact: "",
      //   lawyer_email: "",
      //   lawyer_name: "",
      //   lawyer_contact: "",
      //   charterer_protecting_agent: "",
      //   //prev
      //   // client_id: "",
      //   // reference: "",
      //   // client_name: "",
      //   // work_order_date: "",
      //   // project_name: "",
      //   // ata_date_time_pod: "",
      //   // pod: "",
      //   // atd_date_time_pol: "",
      //   // vessel_id: "",
      //   // vessel_name: "",
      //   // eta_port_name: "",
      //   // eta_date: "",
      //   // eta_time: "",
      //   // c_f_consigne_id: "",
      //   // carrier_agent_id: "",
      //   // c_f_consigne: "",
      //   // carrier_agent: "",
      //   // cargo: "",
      //   // club: "",
      //   // member: "",
      //   // legal_section: "",
      //   // image: "",
      // },
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
    attachReleventFile: function () {
      this.files = this.$refs.workOrderReleventFile.files;
    },
    // attachLouFile: function () {
    //   this.lou_file = this.$refs.workOrderClubLouFile.files[0];
    //   // this.lou_file = this.$refs.workOrderReleventFile.files;
    // },
    addRowClub: function () {
      this.security.club.push({ club_lou: "", lou_issue_date: "", lou_file: "" });
    },

    deleteRowClub(index) {
      this.security.club.splice(index, 1);
    },
    addRowBank: function () {
      this.security.bank_guarantee.push({
        bank_guarantee: "",
        bank_issue_date: "",
        bank_file: "",
      });
    },

    deleteRowBank(index) {
      this.security.bank_guarantee.splice(index, 1);
    },
    addRowSurveyName: function () {
      this.specialist_names.push({ name: "" });
    },

    deleteRowSurveyName(index) {
      this.specialist_names.splice(index, 1);
    },
    addRowSurveyScope: function () {
      this.specialist_survey_scopes.push({ specialist_survey_scope: "" });
    },

    deleteRowSurveyScope(index) {
      this.specialist_survey_scopes.splice(index, 1);
    },
    addRowSpecialist: function () {
      this.specialists.push({ name: "" });
    },

    deleteRowSpecialist(index) {
      this.specialists.splice(index, 1);
    },
    addRowMarine: function () {
      this.marines.push({ name: "" });
    },

    deleteRowMarine(index) {
      this.marines.splice(index, 1);
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
      this.chars.push({
        charterer_name: "",
        charterer_type: "",
        charterer_file_reference_no: "",
        charterer_pic: "",
      });
    },

    deleteRow(index) {
      this.chars.splice(index, 1);
    },

    confirmDelete(relavent_files) {
      let relavent_files_id = relavent_files.id;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log(relavent_files_id);
            this.deleteFile(relavent_files_id);
          }
        });
    },

    deleteFile: async function (id) {
      try {
        return http()
          .delete("v1/work_orders/relevent_files/destroy/" + id)
          .then(() => {
            this.$swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: this.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.getEditW_order();
            this.$router.go(0);
          });
      } catch (e) {
        console.log(e);
      }
    },

    attachClubLouFile: function (index, $event) {
      console.log("inside attachClubLouFile");
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = () => {
        const security = this.security.club[index];
        this.security.club.splice(index, 1, {
          ...security,
          lou_file: reader.result,
        });
      };
    },
    attachBankFile: function (index, $event) {
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = () => {
        const bank = this.security.bank_guarantee[index];
        this.security.bank_guarantee.splice(index, 1, {
          ...bank,
          bank_file: reader.result,
        });
      };
    },

    editW_order: async function () {
      try {
        var charterer_data = JSON.stringify(this.chars);
        var bank_data = JSON.stringify(this.security.bank_guarantee);
        var club_data = JSON.stringify(this.security.club);
        var specialist_name = JSON.stringify(this.specialist_names);
        var specialist_survey_scope = JSON.stringify(this.specialist_survey_scopes);
        let id = this.$route.params.id;
        let formData = new FormData();

        formData.append("client_id", this.editW_orderList.client_id);
        if (this.editW_orderList.club_name != null) {
          formData.append("club_name", this.editW_orderList.club_name);
        }
        if (this.editW_orderList.file_opening_date != null) {
          formData.append("file_opening_date", this.editW_orderList.file_opening_date);
        }
        if (this.editW_orderList.admiralty_court_location != null) {
          formData.append("admiralty_court_location", this.editW_orderList.admiralty_court_location);
        }
        if (this.editW_orderList.admiralty_suit_no != null) {
          formData.append("admiralty_suit_no", this.editW_orderList.admiralty_suit_no);
        }
        if (this.editW_orderList.ata_date_time_pod != null) {
          formData.append("ata_date_time_pod", this.editW_orderList.ata_date_time_pod);
        }
        if (this.editW_orderList.atb_date_time_pod != null) {
          formData.append("atb_date_time_pod", this.editW_orderList.atb_date_time_pod);
        }
        if (this.editW_orderList.atd_date_time_pol != null) {
          formData.append("atd_date_time_pol", this.editW_orderList.atd_date_time_pol);
        }
        if (this.editW_orderList.barge_provider != null) {
          formData.append("barge_provider", this.editW_orderList.barge_provider);
        }
        if (this.editW_orderList.c_n_f != null) {
          formData.append("c_n_f", this.editW_orderList.c_n_f);
        }
        if (this.editW_orderList.case_status != null) {
          formData.append("case_status", this.editW_orderList.case_status);
        }
        if (this.editW_orderList.charterer_protecting_agent != null) {
          formData.append("charterer_protecting_agent", this.editW_orderList.charterer_protecting_agent);
        }
        if (this.editW_orderList.claim_handler != null) {
          formData.append("claim_handler", this.editW_orderList.claim_handler);
        }
        if (this.editW_orderList.club_pic != null) {
          formData.append("club_pic", this.editW_orderList.club_pic);
        }
        if (this.editW_orderList.club_file_reference_no != null) {
          formData.append("club_file_reference_no", this.editW_orderList.club_file_reference_no);
        }
        if (this.editW_orderList.declaring_agent != null) {
          formData.append("declaring_agent", this.editW_orderList.declaring_agent);
        }
        if (this.editW_orderList.eta_date_time_pod != null) {
          formData.append("eta_date_time_pod", this.editW_orderList.eta_date_time_pod);
        }
        if (this.editW_orderList.etb_date_time_pod != null) {
          formData.append("etb_date_time_pod", this.editW_orderList.etb_date_time_pod);
        }
        if (this.editW_orderList.etcd_date_time_pod != null) {
          formData.append("etcd_date_time_pod", this.editW_orderList.etcd_date_time_pod);
        }
        if (this.editW_orderList.iml_reference_no != null) {
          formData.append("iml_reference_no", this.editW_orderList.iml_reference_no);
        }
        if (this.editW_orderList.law_firm_contact != null) {
          formData.append("law_firm_contact", this.editW_orderList.law_firm_contact);
        }
        if (this.editW_orderList.law_firm_name != null) {
          formData.append("law_firm_name", this.editW_orderList.law_firm_name);
        }
        if (this.editW_orderList.lawyer_contact != null) {
          formData.append("lawyer_contact", this.editW_orderList.lawyer_contact);
        }
        if (this.editW_orderList.lawyer_email != null) {
          formData.append("lawyer_email", this.editW_orderList.lawyer_email);
        }
        if (this.editW_orderList.lawyer_name != null) {
          formData.append("lawyer_name", this.editW_orderList.lawyer_name);
        }
        if (this.editW_orderList.marine_survey_firm != null) {
          formData.append("marine_survey_firm", this.editW_orderList.marine_survey_firm);
        }
        if (this.editW_orderList.nature_of_incident != null) {
          formData.append("nature_of_incident", this.editW_orderList.nature_of_incident);
        }
        if (this.editW_orderList.opa != null) {
          formData.append("opa", this.editW_orderList.opa);
        }
        if (this.editW_orderList.rt_provider != null) {
          formData.append("rt_provider", this.editW_orderList.rt_provider);
        }
        if (this.editW_orderList.shipowner_file_reference_no != null) {
          formData.append("shipowner_file_reference_no", this.editW_orderList.shipowner_file_reference_no);
        }
        if (this.editW_orderList.shipowner_name != null) {
          formData.append("shipowner_name", this.editW_orderList.shipowner_name);
        }
        if (this.editW_orderList.shipowner_pic != null) {
          formData.append("shipowner_pic", this.editW_orderList.shipowner_pic);
        }
        if (this.editW_orderList.specialist_name != null) {
          formData.append("specialist_name", this.editW_orderList.specialist_name);
        }
        if (this.editW_orderList.specialist_name != null) {
          formData.append("specialist_name", this.editW_orderList.specialist_organization);
        }
        if (this.editW_orderList.specialist_reference_no != null) {
          formData.append("specialist_reference_no", this.editW_orderList.specialist_reference_no);
        }
        if (this.editW_orderList.specialist_survey_category != null) {
          formData.append("specialist_survey_category", this.editW_orderList.specialist_survey_category);
        }
        if (this.editW_orderList.specialist_survey_location != null) {
          formData.append("specialist_survey_location", this.editW_orderList.specialist_survey_location);
        }
        if (this.editW_orderList.specialist_survey_scope != null) {
          formData.append("specialist_survey_scope", this.editW_orderList.specialist_survey_scope);
        }
        if (this.editW_orderList.stevedore_company != null) {
          formData.append("stevedore_company", this.editW_orderList.stevedore_company);
        }
        if (this.editW_orderList.suit_nature != null) {
          formData.append("suit_nature", this.editW_orderList.suit_nature);
        }
        if (this.editW_orderList.survey_category != null) {
          formData.append("survey_category", this.editW_orderList.survey_category);
        }
        // if (this.editW_orderList.survey_firm != null) {
        //   formData.append("survey_firm", this.editW_orderList.survey_firm);
        // }
        if (this.editW_orderList.survey_firm_reference_no != null) {
          formData.append("survey_firm_reference_no", this.editW_orderList.survey_firm_reference_no);
        }
        if (this.editW_orderList.survey_location != null) {
          formData.append("survey_location", this.editW_orderList.survey_location);
        }
        if (this.editW_orderList.survey_scope != null) {
          formData.append("survey_scope", this.editW_orderList.survey_scope);
        }
        if (this.editW_orderList.vessel_name != null) {
          formData.append("vessel_name", this.editW_orderList.vessel_name);
        }
        if (this.editW_orderList.voyage_no != null) {
          formData.append("voyage_no", this.editW_orderList.voyage_no);
        }
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append("relevent_files[" + i + "]", file);
        }
        formData.append("charterer_data", charterer_data);
        formData.append("bank_data", bank_data);
        formData.append("security_data", club_data);
        formData.append("specialist_name", specialist_name);
        formData.append("specialist_survey_scope", specialist_survey_scope);
        // this.club_data.forEach((item) => formData.append("lou_file", item.lou_file));
        // this.chars.forEach((item) => formData.append("charterer_type[]", item.charterer_type));
        // this.chars.forEach((item) =>
        //   formData.append("charterer_file_reference_no[]", item.charterer_file_reference_no)
        // );
        // this.chars.forEach((item) => formData.append("charterer_pic[]", item.charterer_pic));

        formData.append("_method", "PUT");

        await this.$store.dispatch("w_order/update_w_order", { id: id, data: formData }).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.getEditW_order(this.$route.params.id);
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
  height: 42px;
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
.back-btn {
  padding: 7px 9px;
}
/* label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 30px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
  margin-left: 54px;
  margin-top: -16%;
}

label:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 20px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}
input:checked + label {
  background: #bada55;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 30px;
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-right: 0;
} */
input[type="text"],
[type="date"],
[type="datetime-local"] {
  width: 97%;
  height: 42px;
}

input[type="file"] {
  margin-top: 4px;
  margin-left: 6px;
}
input[type="submit"] {
  padding: 8px 10px;
}
.download {
  background-color: #3e8e41;
}
</style>
