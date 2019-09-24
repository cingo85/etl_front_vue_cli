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
                <h2>{{projectItem.projectName}}</h2>
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
                  <td v-model="t_table_master[index].datasourceType">{{item.datasourceType}}</td>
                  <td v-model="t_table_master[index].datasourceName">{{item.datasourceName}}</td>
                  <td v-model="t_table_master[index].tableCname">{{item.tableCname}}</td>
                  <td
                    v-model="t_table_master[index].tableColumnQuantity"
                  >{{item.tableColumnQuantity}}</td>
                  <td
                    v-model="t_table_master[index].tableDataQuantity"
                  >{{item.tableDataQuantity}}</td>
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
          var tableId = results.data[0].tableId;
          var tableName = results.data[0].table_cname;
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
        if (!(element.tableId === null)) {
          //在已有tableId為更新,需要有SN
          apiUpdateTableMaster({
            sn: element.sn,
            datasourceType: element.datasourceType,
            projectId: element.projectId,
            databaseNote: element.databaseNote,
            datasourceId: element.datasourceId,
            tableId: element.tableId,
            tableCname: element.tableCname,
            tableEname: element.tableEname,
            tablePk: element.tablePk,
            tablePkName: element.tablePkName,
            tableColumnQuantity: element.tableColumnQuantity,
            tableDataQuantity: element.tableDataQuantity,
            tableMasterState: "CsvImport",
            isConcatenation: false,
            description: element.description,
            reason: element.reason,
            tMasterNote: element.tMasterNote,
            datasourceName: element.datasourceName,
            t_column_master: element.t_column_master
          });
          apiUpdateDataBaseByProjectId({
            projectId: element.projectId,
            datasourceId: element.datasourceId,
            DataBaseState: element.state,
            datasourceName: element.datasourceName,
            datasourceType: element.datasourceType,
            sn: element.sn
          });
        } else {
          const uuidv4 = require("uuid/v4");
          var table_id_temp_UUID = uuidv4();
          //沒有tableId為新增一筆 不須SN
          apiUpdateTableMaster({
            sn: element.sn,
            datasourceType: element.datasourceType,
            projectId: element.projectId,
            databaseNote: element.databaseNote,
            datasourceId: element.datasourceId,
            tableId: table_id_temp_UUID,
            tableCname: element.tableCname,
            tableEname: element.tableEname,
            tablePk: element.tablePk,
            tablePkName: element.tablePkName,
            tableColumnQuantity: element.tableColumnQuantity,
            tableDataQuantity: element.tableDataQuantity,
            tableMasterState: "CsvImport",
            isConcatenation: false,
            description: element.description,
            reason: element.reason,
            tMasterNote: element.tMasterNote,
            datasourceName: element.datasourceName,
            t_column_master: element.t_column_master
          });
          apiUpdateDataBaseByProjectId({
            projectId: element.projectId,
            datasourceId: element.datasourceId,
            DataBaseState: element.state,
            datasourceName: element.datasourceName,
            datasourceType: element.datasourceType,
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
      let map = new Map();
      let arr = new Array();
      let indexColumn = 0;

      this.t_table_master.map(val => {
        var obj = {
          sn: val.sn,
          datasourceType: "",
          projectId: "",
          databaseNote: "",
          datasourceId: "",
          tableId: "",
          tableCname: "",
          tablePk: "",
          tablePkName: "",
          tableColumnQuantity: "",
          tableDataQuantity: "",
          tableMasterState: "",
          isConcatenation: false,
          description: "",
          reason: "",
          tMasterNote: "",
          datasourceName: "",
          t_column_master: [
            {
              tableId: "",
              columnId: "",
              columnName: "",
              columnReadName: "",
              columnCname: "",
              isPk: "",
              columnType: "",
              columnLength: "",
              columnDefault: "",
              isDatamodelAttribute: "",
              ColumnMasterState: "CsvImport"
            }
          ]
        };
        obj.projectId = val.projectId;
        obj.datasourceType = val.datasourceType;
        obj.datasourceId = val.datasourceId;
        obj.databaseNote = val.databaseNote;
        obj.datasourceName = val.datasourceName;
        obj.tableMasterState = val.tableMasterState;
        obj.reason = val.reason;
        obj.tMasterNote = val.tMasterNote;
        obj.description = val.description;

        this.csvfile.map(val2 => {
          let columnObj = {
            tableId: "",
            columnId: "",
            columnName: "",
            columnReadName: "",
            columnCname: "",
            isPk: "",
            columnType: "",
            columnLength: "",
            columnDefault: "",
            isDatamodelAttribute: "",
            ColumnMasterState: "CsvImport"
          };

          if (val.projectId === val2.project_id) {
            if (val.datasourceId === val2.datasource_id) {
              obj.tableId = val2.tableId;
              obj.tableCname = val2.table_cname;
              obj.tableColumnQuantity = val2.table_column_quantity;
              obj.tableDataQuantity = val2.table_data_quantity;

              (columnObj.tableId = val2.tableId),
                (columnObj.columnId = val2.column_id),
                (columnObj.columnName = val2.column_name),
                (columnObj.columnReadName = val2.column_read_name),
                (columnObj.columnCname = val2.column_c_name),
                (columnObj.isPk = val2.is_pk),
                (columnObj.columnType = val2.column_type),
                (columnObj.columnLength = val2.column_length),
                (columnObj.columnDefault = val2.column_default),
                (columnObj.isDatamodelAttribute =
                  val2.is_datamodel_attribute);

              if (map.get(val2.tableId) === undefined) {
                map.set(val2.tableId, (arr = new Array()));
                map.get(val2.tableId).splice(indexColumn++, 0, columnObj);
              } else {
                map.get(val2.tableId).splice(indexColumn++, 0, columnObj);
              }
            }
          }
        });
        obj.t_column_master = map.get(obj.tableId);
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
