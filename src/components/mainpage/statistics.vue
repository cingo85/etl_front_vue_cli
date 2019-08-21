<template>
  <div class="wrapper wrapper-content">
    <div class="row">
      <div class="col-lg-12">
        <div class="ibox">
          <div class="ibox-title">
            <div class="row">
              <div
                class="col-lg-6"
                v-for="projectItem of this.$store.state.IndexPage_module.projectData"
                v-if="projectItem.projectId === projectId"
              >
                <h2>{{projectItem.project_name}}</h2>
              </div>
              <div class="col-lg-6">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin-left: 850px"
                  @click="goback()"
                >回專案清單</button>
              </div>
            </div>
          </div>

          <div class="ibox-content">
            <div class="row">
              <h2>資料統計表</h2>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <div class="custom-file">
                  <input type="file" class="btn btn-primary" @change="csvFile($event)" />
                </div>
              </div>
              <div class="col-lg-6">
                <button type="button" class="btn btn-primary">匯出</button>
              </div>
            </div>
            <div style="margin: 5px"></div>
            <table class="footable table" data-filter="#filter">
              <thead>
                <tr>
                  <th>資料原</th>
                  <th>資料庫</th>
                  <th>表單</th>
                  <th>資料筆數</th>
                  <th>欄位數量</th>
                  <th>是否串接</th>
                  <th>資料描述</th>
                  <th>未串接原因</th>
                  <th>備註</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in t_table_master">
                <tr>
                  <td v-model="t_table_master[index].datasource_type">{{item.datasource_type}}</td>
                  <td v-model="t_table_master[index].datasource_name">{{item.datasource_name}}</td>
                  <td v-model="t_table_master[index].table_cname">{{item.table_cname}}</td>
                  <td
                    v-model="t_table_master[index].table_column_quantity"
                  >{{item.table_column_quantity}}</td>
                  <td
                    v-model="t_table_master[index].table_data_quantity"
                  >{{item.table_data_quantity}}</td>
                  <td v-model="t_table_master[index].isConcatenation">{{item.isConcatenation}}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="資料描述"
                      size="30"
                      class="form-control"
                      v-model="t_table_master[index].description"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="未串接原因"
                      size="30"
                      class="form-control"
                      v-model="t_table_master[index].reason"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="備註"
                      size="30"
                      class="form-control"
                      v-model="t_table_master[index].tMasterNote"
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
</template>

<script>
import {
  apiUpdateTableMaster,
  apiUpdateDataBaseByProjectId,
  apiDatasourceNMastserByProjectId
} from "../../api";
import { Papa } from "papaparse";
export default {
  name: "statistics",
  data() {
    return {
      projectId: this.$route.query.projectId,
      csvfile: [{}],
      t_table_master: []
    };
  },
  created() {
    var projectId = this.$route.query.projectId;
    apiDatasourceNMastserByProjectId({
      projectId: projectId
    })
      .then(res => {
        console.log(res);
        this.t_table_master = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goback() {
      this.$router.history.go(-1);
    },
    csvFile(event) {
      var file = event.target.files[0];
      this.$papa.parse(event.target.files[0], {
        header: true,
        complete: results => {
          var tableId = results.data[0].table_id;
          var tableName = results.data[0].table_name;
          var tableDataQuantity = results.data[0].table_data_quantity;
          var tableColumnQuantity = results.data[0].table_column_quantity;

          if (
            tableId === undefined ||
            tableName === undefined ||
            tableDataQuantity === undefined ||
            tableColumnQuantity === undefined
          ) {
            alert("資料格式錯誤");
          } else {
            this.csvfile = results.data;
          }
        }
      });
    },
    updateTableMaster(t_table_master) {
      t_table_master.forEach(element => {
        if (!(element.table_id === null)) {
          const uuidv4 = require("uuid/v4");
          var table_id_temp_UUID = uuidv4();
          apiUpdateTableMaster({
            sn: element.sn,
            datasource_type: element.datasource_type,
            projectId: element.projectId,
            database_note: element.database_note,
            datasource_id: element.datasource_id,
            table_id: table_id_temp_UUID,
            table_cname: element.table_cname,
            table_ename: element.table_ename,
            table_pk: element.table_pk,
            table_pk_name: element.table_pk_name,
            table_column_quantity: element.table_column_quantity,
            table_data_quantity: element.table_data_quantity,
            TableMasterState: "CsvImport",
            isConcatenation: false,
            description: element.description,
            reason: element.reason,
            tMasterNote: element.tMasterNote,
            datasource_name: element.datasource_name
          });
          apiUpdateDataBaseByProjectId({
            projectId: element.projectId,
            datasource_id: element.datasource_id,
            DataBaseState: element.state,
            datasource_name: element.datasource_name,
            datasource_type: element.datasource_type,
            sn: element.sn
          });
        }
      });
    }
  },
  computed: {
    // t_table_master: function() {}
  },
  watch: {
    csvfile: function() {
      var resultArray = [];
      let index = 0;
      this.t_table_master.map(val => {
        var obj = {
          datasource_type: "",
          projectId: "",
          database_note: "",
          datasource_id: "",
          table_id: "",
          table_cname: "",
          table_pk: "",
          table_pk_name: "",
          table_column_quantity: "",
          table_data_quantity: "",
          TableMasterState: "",
          isConcatenation: false,
          description: "",
          reason: "",
          tMasterNote: "",
          datasource_name: "",
          t_column_master: [{
            table_id:"",
            column_id:"",
            column_name:"",
            column_read_name:"",
            column_c_name:"",
            is_pk:"",
            column_type:"",
            column_length:"",
            column_default:"",
            is_datamodel_attribute:""
          }]
        };

        obj.projectId = val.projectId;
        obj.datasource_type = val.datasource_type;
        obj.datasource_id = val.datasource_id;
        obj.database_note = val.database_note;
        obj.datasource_name = val.datasource_name;
        obj.TableMasterState = val.TableMasterState;
        obj.reason = val.reason;
        obj.tMasterNote = val.tMasterNote;
        obj.description = val.description;
        this.csvfile.map(val2 => {
          if (val.projectId === val2.project_id) {
            if (val.datasource_id === val2.datasource_id) {
              obj.table_id = val2.table_id;
              obj.table_cname = val2.table_cname;
              obj.table_column_quantity = val2.table_column_quantity;
              obj.table_data_quantity = val2.table_data_quantity;
            }
          }
        });
        resultArray.splice(index++, 0, obj);
      });
      this.t_table_master = resultArray;
    },
    t_table_master: {
      handler(t_table_master) {
        this.updateTableMaster(this.t_table_master);
      },
      deep: true,
      immediate: false

      /*
       * 第一次綁定就執行
       */
      // handler function(t_table_master) {
      //   this.updateTableMaster(this.t_table_master);
      // },
      // deep: true,
      // immediate: true
    }
  }
};
</script>

<style>
</style>
