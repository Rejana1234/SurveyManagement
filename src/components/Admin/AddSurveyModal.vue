<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AddSurvey",
  components: {},
  mixins: [],
  data() {
    return {
      count: 1,
      id: this.$route.params.id,
      surveyData: {
        work_order_id: "",
        start_date: "",
        end_date: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapState({
      workOrder: (state) => state.w_order.w_orders,
      message: (state) => state.survey.success_message,
    }),
  },
  watch: {},
  mounted() {
    this.getAllW_Order();
  },
  methods: {
   

    ...mapActions({
      getAllW_Order: "w_order/get_all_w_order",
    }),

    addSurvey: async function () {
      try {
        let formData = new FormData();

        formData.append("work_order_id", this.$route.params.id);
        formData.append("start_date", this.surveyData.start_date);
        formData.append("end_date", this.surveyData.end_date);

        await this.$store.dispatch("survey/add_survey", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });

          this.surveyData = {};
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

.modal-vue .overlay {
  position: fixed;
  z-index:999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal {
  position: relative;
  scrollbar-width: none;
  width: 300px;
  z-index: 999;
  margin: -5% auto;
  padding: 20px 30px;
  background-color: #fff;
  
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgb(214, 211, 211);
}
.modal-vue .show {
  background-color: blue;
  margin-left: 1.2%;
}


#add_survey {
  background: white;
  padding: var(--card-padding);
  border-radius: 1rem;
  height: fit-content;
  width: 100%;
  box-shadow: rgb(226, 225, 225);
  transition: all 300ms ease;
  margin-top: 5%;
}

.row {
  margin-top: 3%;
}
.row1 {
  margin-top: 5%;
}
.button {
  display: flex;
  justify-content: flex-end;
}
.add-btn {
  background-color: rgb(37, 37, 246);
  color: rgb(255, 255, 255);
  border: 1px solid gray;
  cursor: pointer;
  float: right;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 0.15rem solid white;
  margin-left: 1px;
}
.delete {
  background-color: red;
  color: rgb(255, 255, 255);
}
.submit-btn {
  background-color: green;
  color: rgb(255, 255, 255);
  border: 1px solid gray;
  cursor: pointer;
  float: right;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 0.15rem solid white;
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
.btn {
  margin-top: 1rem;
  /* display: inline-flex; */
  padding: 0.1rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 0.15rem solid black;
  color: black;
  cursor: pointer;
  background: none;
  margin-left: 12%;
}

.btn1 {
  margin-top: 1rem;
  /* display: inline-flex; */
  padding: 0.1rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 0.15rem solid black;
  color: rgb(255, 254, 254);
  cursor: pointer;
  background: rgb(5, 165, 5);
  margin-left: 10%;
}
label {
  /* margin: .4rem 0; */
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
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  /* width: 100%; */
  margin-top: 6px;
  margin-right: 2%;
}

.col-75 {
  float: left;
  /* width: 100%; */
  margin-top: 6px;
  margin-right: 6.7%;
}

.button {
  margin-left: 80%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 5px;
  }
}
</style>
