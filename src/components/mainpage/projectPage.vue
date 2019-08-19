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
                  onclick="location.href='./indexPage'"
                >回專案清單</button>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <button type="button" class="btn btn-primary" @click="query(projectId)">資料統計表</button>
                <button type="button" class="btn btn-primary" href="#modal-form">匯出設定檔</button>
                <a data-toggle="modal" class="btn btn-primary" href="#modal-form-update">編輯基本資料</a>
              </div>
            </div>
          </div>
          <div class="ibox-content">
            <div class="col-lg-12" style="padding-left:485px">資料來源:</div>
            <div
              class="row"
              v-for="item in DataSouce"
              v-if="item.projectId === projectId"
              v-show="item.is_input_datasource"
            >
              <div
                class="col-lg-12"
                style="padding-left:510px"
                v-if="item.datasource_type === 'database'"
              >SQL:{{item.database_ip}}+{{item.database_port}}</div>
              <div
                class="col-lg-12"
                style="padding-left:510px"
                v-if="item.datasource_type === 'datafolder'"
              >CSV:{{item.data_root}}</div>
            </div>
            <div
              class="row"
              v-for="projectItem of this.$store.state.IndexPage_module.projectData"
              v-if="projectItem.projectId === projectId"
            >
              <div class="col-lg-4" style="padding-left:500px">保固期限:</div>
              <div class="col-lg-2">{{projectItem.warr_date}}</div>
              <div class="col-lg-1">驗收日期:</div>
              <div class="col-lg-5">{{projectItem.check_date}}</div>
              <div class="col-lg-12" style="padding-left:485px">備註:</div>
              <div class="col-lg-12" style="padding-left:485px">{{projectItem.note}}</div>
            </div>
          </div>
          <div class="ibox-content">
            <div class="row">
              <div class="col-lg-4">
                <h3 style="margin-left: 510px">DS表格清單</h3>
              </div>
              <div class="col-lg-4">
                <input
                  type="text"
                  style="margin-right: 150px;margin-left:30px;margin-top:3px;;width: 30%"
                  xclass="form-control col-lg-6"
                  id="filter"
                  placeholder="Search"
                />
              </div>
              <div class="col-lg-4">
                <a data-toggle="modal" class="btn btn-primary" href="#modal-table-form">新增表單</a>
              </div>
            </div>
            <div style="margin: 5px"></div>
            <table class="footable table" data-filter="#filter" style="margin:auto;width: 50%">
              <thead>
                <tr>
                  <th>表單名稱</th>
                  <th>版本</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>嘉義大學-第三期</td>
                  <td>嘉義大學</td>
                </tr>
                <tr>
                  <td>台灣首府大學</td>
                  <td>台灣首府大學</td>
                </tr>
                <tr>
                  <td>國立高雄大學</td>
                  <td>國立高雄大學</td>
                </tr>
                <tr>
                  <td>交通大學</td>
                  <td>交通大學</td>
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
  apiQueryDataBaseByprojectId,
  apiQueryTableMasterByProjectId
} from "../../api";
import { mapState } from "vuex";
import { type } from "os";
export default {
  data() {
    return {
      projectId: this.$route.query.projectId,
      DataSouce: "",
      TableMaster: ""
    };
  },
  beforeCreate() {
    this.$store.dispatch("initStore");
    //this.test = this.$store.state.IndexPage_module.projectData;
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
    apiQueryTableMasterByProjectId({
      projectId: this.projectId
    })
      .then(res => {
        this.TableMaster = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // this.$store.state.IndexPage_module.projectData;
  },
  computed: {},
  methods: {
    query(projectId) {
      this.$router.push({
        name: "statistics",
        query: {
          projectId: projectId
        }
      });
    }
  }
};
</script>

<style>
</style>
