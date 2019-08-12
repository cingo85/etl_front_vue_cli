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
              <tbody v-for="(item,index) in DataSouce">
                <tr>
                  <td>{{item.datasource_type}}</td>
                  <td>{{item.database_note}}</td>
                  <td>{{item.table_name}}</td>
                  <td>{{item.table_column_quantity}}</td>
                  <td>{{item.table_data_quantity}}</td>
                  <td>N</td>
                  <td>
                    <input type="text" placeholder="資料描述" size="30" class="form-control" />
                  </td>
                  <td>
                    <input type="text" placeholder="未串接原因" size="30" class="form-control" />
                  </td>
                  <td>
                    <input type="text" placeholder="備註" size="30" class="form-control" />
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
import { apiQueryDataBaseByprojectId } from "../../api";
import { Papa } from "papaparse";
export default {
  name: "statistics",
  data() {
    return {
      projectId: this.$route.query.projectId,
      DataSouce: "",
      csvfile: { test: "N" },
      t_table_master: {
        project_id: this.$route.query.projectId,
        database_id: "",
        table_id: "",
        table_name: "",
        table_pk: "",
        table_pk_name: "",
        table_column_quantity: "",
        table_data_quantity: "",
        state: ""
      }
    };
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
    }
  },
  created() {
    apiQueryDataBaseByprojectId({
      projectId: this.projectId
    })
      .then(res => {
        this.DataSouce = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
