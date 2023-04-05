<template>
    <div id="edit_carrier_agent">
        <form class="AddClient" v-on:submit.prevent="editCarrierAgent">
            <h2>Edit Carrier Agent</h2>

            <div class="row">
                <div class="col-25">
                    <label>Name</label>
                </div>
                <div class="col-75">
                    <input
                            type="text"
                            v-model="editCarrierAgentData.name"
                            id="name"
                            name="name"
                            placeholder="Enter Your name"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label>Email</label>
                </div>
                <div class="col-75">
                    <input
                            type="text"
                            v-model="editCarrierAgentData.email"
                            id="email"
                            name="email"
                            placeholder=" Enter Your Email"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label>Phone</label>
                </div>
                <div class="col-75">
                    <input
                            type="number"
                            v-model="editCarrierAgentData.phone"
                            id="mobile"
                            name="phone"
                            placeholder=" Enter Your phone number"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label>Address</label>
                </div>
                <div class="col-75">
              <textarea
                      id="address"
                      v-model="editCarrierAgentData.address"
                      name="address"
                      placeholder="Write your address"
                      style="height: 200px; resize: none;"

              ></textarea>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label>Other Information</label>
                </div>
                <div class="col-75">
              <textarea
                      id="address"
                      v-model="editCarrierAgentData.other_information"
                      name="other_information"
                      placeholder="Other Information"
                      style="height: 200px; resize: none;"

              ></textarea>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label>Tax</label>
                </div>
                <div class="col-75">
                    <input
                            type="text"
                            v-model="editCarrierAgentData.tax"
                            id="tax"
                            name="tax"
                            placeholder="Enter Your Tax Number"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-25"></div>
                <div class="col-75">
                    <input type="submit" value="Update" />
                    <router-link to="/dashboard/carrier_agent">
                        <input type="button" value="Back" class="back-btn" />
                    </router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "EditCarrierAgent",
        title: "Inter-Port - Edit Carrier Agent",

        data(){
            return{
                errors: {}
            }
        },

        computed: {
            ...mapState({
                editCarrierAgentData: state => state.carrier_agent.carrier_agent,
                message: state => state.carrier_agent.success_message
            })
        },

        mounted(){
            this.getEditCarrier(this.$route.params.id);
        },

        methods: {
            ...mapActions({
                getEditCarrier: 'carrier_agent/edit_carrier_agent'
            }),

            editCarrierAgent: async function(){
                try {
                    let id = this.$route.params.id;
                    let formData = new FormData();

                    formData.append('name', this.editCarrierAgentData.name);
                    formData.append('email', this.editCarrierAgentData.email);
                    formData.append('phone', this.editCarrierAgentData.phone);
                    formData.append('address', this.editCarrierAgentData.address);
                    formData.append('other_information', this.editCarrierAgentData.other_information);
                    formData.append('tax', this.editCarrierAgentData.tax);
                    formData.append('_method', 'PUT');

                    await this.$store.dispatch('carrier_agent/update_carrier_agent', {id:id, data:formData}).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        this.getEditCarrier(id);
                        this.$router.go(-1);

                    })
                }catch (e) {
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
        }
    }
</script>

<style scoped>
    #edit_carrier_agent {
        background: white;
        padding: var(--card-padding);
        border-radius: 1rem;
        height: fit-content;
        width: 100%;
        box-shadow: rgb(226, 225, 225);
        transition: all 300ms ease;
        margin-top: 1%;
    }

    .row {
        margin-top: 2%;
    }
    .row1 {
        margin-top: 5%;
        margin-bottom: 5%;
        display: flex;
        justify-content: flex-end;
    }

    .submit-btn {
        background-color: green;
        color: rgb(255, 255, 255);
        padding: 0.5rem 0.5rem;
        border: 1px solid gray;
        border-radius: 0.5rem;
        cursor: pointer;
        float: right;
    }
    .back-btn {
        background-color: #ddd;
        color: #111;
        padding: 0.5rem 0.5rem;
        border: 1px solid gray;
        border-radius: 0.5rem;
        cursor: pointer;
        float: right;
        margin-right: 0.3%;
    }

    label {
        margin-left: 5px;
    }

    input[type="text"],
    select,
    textarea,
    input[type="number"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }
    input[type="date"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        /* resize: vertical; */
    }

    label {
        padding: 12px 12px 12px 0;
        display: inline-block;
    }


    input[type="submit"] {
        background-color: green;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;
        margin-left: 5px;
    }

    input[type="submit"]:hover {
        background-color: rgb(3, 82, 3);
    }
    .back-btn {
        background-color: #ddd;
        color: #111;
        padding: 12px 20px;
        border: 1px solid gray;
        border-radius: 4px;
        cursor: pointer;
        float: right;
    }

    .back-btn:hover {
        background-color: rgb(190, 188, 188);
    }

    .container {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
    }

    .col-25 {
        float: left;
        width: 100%;
        margin-top: 6px;
    }

    .col-75 {
        float: left;
        width: 100%;
        margin-top: 6px;
    }

    .button {
        margin-left: 80%;
    }

    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    @media screen and (max-width: 600px) {
        .col-25,
        .col-75,
        input[type="submit"] {
            width: 100%;
            margin-top: 5px;
        }
    }
</style>