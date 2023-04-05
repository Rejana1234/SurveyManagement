<template>
  <div class="card">
    <h2>Vessel List</h2>
    <div class="flex-container" style="justify-content: flex-end">
      <div class="exportimport">
        <form @submit.prevent="uploadFile" enctype="multipart/form-data">
          <a :href="url" type="button" class="export" style="font-weight: 900">
            <span class="material-icons-sharp add" style="font-size: 11px"
              >download</span
            >
            Export
          </a>
        </form>
      </div>
      <router-link to="add_vessels">
        <button type="button" class="add_new">
          <span class="material-icons-sharp add" style="font-size: 11px">add</span>Add New
        </button>
      </router-link>
    </div>

    <div class="flex-container">
      <div class="flex-item">
        Show:
        <select name="cars" class="entries_count" id="cars" style="appearance: auto" v-model="tableData.length" @change="getAllVessel()">
          <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
        </select>
        record per page.
      </div>

      <div class="flex-item">
        <input type="text" v-model="tableData.search" @input="getAllVessel()" placeholder="Search here" class="search" />
      </div>
    </div>

    <div style="padding: 10px 10px; overflow-x: auto">
      <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
          <tbody>
          <tr v-show="vessels.length" v-for="vessel in vessels" :key="vessel.id" >
            <td data-label="#Sl" style="text-align: center">{{ vessel.id }}</td>
            <td data-label="Vessels Type" style="text-align: center">{{ vessel.name }}</td>
            <td data-label="Vessels Code" style="text-align: center">{{ vessel.code}}</td>
            <td data-label="Action" style="text-align: center">
            <router-link :to="`/dashboard/edit_vessels/${vessel.id}`">
              <button type="button" class="actio-button-margin edit">
                <span class="material-icons-sharp add" style="font-size: 11px">edit</span>
               
              </button>
            </router-link>
            <button type="button" class="actio-button-margin delete" v-on:click="deleteVessel(vessel)">
              <span class="material-icons-sharp add" style="font-size: 11px">delete</span>
             
            </button>
          </td>
          </tr>

          <tr v-show="!vessels.length">
              <td colspan="7">No Data Found</td>
            </tr>
          </tbody>
      </datatable>
    </div>
    <div>
      <div class="flex-container-pagination" style="padding-right: 10px">
        <div class="flex-item">Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} records</div>
        <div style="display: flex; justify-content: flex-end">
          <pagination :pagination.sync="pagination" :offset="5" @paginate="getAllVessel();"></pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import DataTable from '../../../components/datatable/Datatable';
    import Pagination from '../../../components/datatable/Pagination.vue';

    import {mapState} from 'vuex';

    import { http } from '../../../service/http_service';

    export default {

    name: "InterportVessels",
    title: "Inter-Port - Vessels",

    components:{
        datatable: DataTable,
        pagination: Pagination
    },

    data(){
        let sortOrders = {};
        let columns = [
            {label: '#Sl', name: 'id' },
            {label: 'Vessels Type', name: 'name'},
            {label: 'Vessels Code', name: 'code'},
            {label: 'Action', name: 'action'},
        ];
        columns.forEach((column) => {
            sortOrders[column.name] = -1;
        });

        return {
            vessels: [],
            columns: columns,
            sortKey: 'id',
            sortOrders: sortOrders,
            perPage: ['10', '20', '30','25','50','100'],
            tableData: {
                draw: 0,
                length: 10,
                search: '',
                column: 0,
                dir: 'desc',
            },
            pagination: {
                last_page: '',
                current_page: 1,
                total: '',
                last_page_url: '',
                next_page_url: '',
                prev_page_url: '',
                from: '',
                to: ''
            },
            url: "http://127.0.0.1:8000/api/interport/v1/vessels/export",
        }
    },

    computed:{
        ...mapState({
            message: state => state.vessels.success_message
        })
    },

    mounted(){
      this.getAllVessel();
    },

    methods: {
        getAllVessel(){

            this.tableData.draw++;
            let params = new URLSearchParams();
            params.append('page', this.pagination.current_page);
            params.append('draw', this.tableData.draw);
            params.append('length', this.tableData.length);
            params.append('search', this.tableData.search);
            params.append('column', this.tableData.column);
            params.append('dir', this.tableData.dir);

            return http().get('v1/vessel/getData?'+params)
                .then(response => {
                    this.vessels = response.data.data.data;
                    this.pagination = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },

        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            this.tableData.column = this.getIndex(this.columns, 'name', key);
            this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
            this.getAllVessel();
        },

        getIndex(array, key, value) {
            return array.findIndex(i => i[key] == value)
        },
        deleteVessel: async function(department){
        let id = department.id;

                try {
                    await this.$store.dispatch('vessels/delete_vessel', id).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: this.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                      this.getAllVessel();
                    })
                }catch (e) {
                    console.log(e);
                }
            }
        
    }

};
</script>

<style scoped>

  .card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: #f1f1f1;
  margin-top: 25px;
}

button {
  padding: 5px 5px;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
.search {
    padding: 10px 20px;
    outline: none;
    border: 1px solid #ddd;
    /* border-radius: 6px; */
    margin-right: 0;
  }
  .exportimport {
  margin-top: 1.25%;
}
</style>
