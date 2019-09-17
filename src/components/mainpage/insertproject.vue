<template>
  <div id="modal-form" class="modal fade" aria-hidden="true" tabindex="-1" role="dialog">
    <div class="modal-dialog" style="text-align: center;margin-left: 350px;margin-top: 150px">
      <div class="modal-content" style="width:1200px">
        <div class="modal-header">
          <h3 class="m-t-none m-b">建立新專案</h3>
        </div>

        <div class="modal-body">
          <form>
            <div style="margin: 5px" class="form-inline">
              <div class="form-group col-md-2">
                <label for="staticEmail2">專案名稱</label>
              </div>
              <div class="form-group col-md-4">
                <label for="inputPassword2" class="sr-only"></label>
                <input size="21" type="text" class="form-control" v-model="projectName" />
              </div>
              <div class="form-group col-md-2">
                <label for="staticEmail2">客戶名稱</label>
              </div>
              <div class="form-group col-md-4">
                <label for="inputPassword2" class="sr-only"></label>
                <input size="21" type="text" class="form-control" v-model="customerName" />
              </div>
            </div>
            <div style="margin: 5px" class="form-inline">
              <div class="form-group col-md-2">
                <label for="staticEmail2">驗收日期</label>
              </div>
              <div class="form-group col-md-4">
                <div class="input-group date">
                  <span class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </span>
                  <input type="date" class="form-control" value="03/04/2014" v-model="checkDate" />
                </div>
              </div>
              <div class="form-group col-md-2">
                <label for="staticEmail2">保固期限</label>
              </div>
              <div class="form-group col-md-4">
                <div class="input-group date">
                  <span class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </span>
                  <input type="date" class="form-control" value="03/04/2014" v-model="warrDate" />
                </div>
              </div>
            </div>

            <div style="margin: 5px" class="form-inline" v-for="(item ,index) in t_datasource">
              <div class="form-group col-md-2">
                <label for="staticEmail2">第{{index+1}}筆資料來源</label>
              </div>
              <div name="selectdatasourceDiv" class="form-group col-md-1">
                <label for="inputPassword2" class="sr-only"></label>
                <select
                  class="custom-select"
                  v-model="t_datasource[index].datasourceType"
                  @click="cleanValue('dataSource',index,t_datasource[index].datasourceType)"
                >
                  <option value>請選擇</option>
                  <option value="database">資料庫</option>
                  <option value="datafolder">資料夾</option>
                </select>
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasourceType === 'database'"
                v-show="t_datasource[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫IP"
                  class="form-control"
                  v-model="t_datasource[index].databaseIp"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasourceType === 'database'"
                v-show="t_datasource[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫Port"
                  size="10"
                  class="form-control"
                  v-model="t_datasource[index].databasePort"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource[index].datasourceType === 'database'"
                v-show="t_datasource[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫帳號"
                  class="form-control"
                  v-model="t_datasource[index].databaseUser"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource[index].datasourceType === 'database'"
                v-show="t_datasource[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫密碼"
                  class="form-control"
                  v-model="t_datasource[index].databasePassword"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasourceType === 'database'"
                v-show="t_datasource[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫名稱"
                  class="form-control"
                  v-model="t_datasource[index].datasourceName"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasourceType === 'database'"
                v-show="t_datasource[index].datasourceType ==='database'"
              ></div>
              <div
                class="form-group col-md-6"
                v-if="t_datasource[index].datasourceType === 'datafolder'"
                v-show="t_datasource[index].datasourceType ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾路徑"
                  size="50"
                  class="form-control"
                  v-model="t_datasource[index].dataRoot"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource[index].datasourceType === 'datafolder'"
                v-show="t_datasource[index].datasourceType ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾名稱"
                  style="margin-left:-94px"
                  class="form-control"
                  v-model="t_datasource[index].datasourceName"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasourceType != ''"
                v-show="t_datasource[index].datasourceType !=''"
              >
                <div class="all-button plus-button" id="addrow" @click="addCol(index)"></div>
                <div
                  class="all-button minus minus-button"
                  id="minusrow"
                  @click="removeCol(index,t_datasource.length)"
                ></div>
              </div>
            </div>

            <div style="margin: 5px" class="form-inline" v-for="(item ,index) in t_datasource2">
              <div class="form-group col-md-2">
                <label for="staticEmail2">資料輸出路徑</label>
              </div>
              <div name="selectdatasourceDiv" class="form-group col-md-1">
                <label for="inputPassword2" class="sr-only"></label>
                <select
                  class="custom-select"
                  v-model="t_datasource2[index].datasourceType"
                  @click="cleanValue('dataPath',index,t_datasource2[index].datasourceType)"
                >
                  <option value>請選擇</option>
                  <option value="database">資料庫</option>
                  <option value="datafolder">資料夾</option>
                </select>
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasourceType === 'database'"
                v-show="t_datasource2[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫IP"
                  class="form-control"
                  v-model="t_datasource2[index].databaseIp"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasourceType === 'database'"
                v-show="t_datasource2[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫Port"
                  size="10"
                  class="form-control"
                  v-model="t_datasource2[index].databasePort"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource2[index].datasourceType === 'database'"
                v-show="t_datasource2[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫帳號"
                  class="form-control"
                  v-model="t_datasource2[index].databaseUser"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource2[index].datasourceType === 'database'"
                v-show="t_datasource2[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫密碼"
                  class="form-control"
                  v-model="t_datasource2[index].databasePassword"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasourceType === 'database'"
                v-show="t_datasource2[index].datasourceType ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫名稱"
                  class="form-control"
                  v-model="t_datasource2[index].datasourceName"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasourceType === 'database'"
                v-show="t_datasource2[index].datasourceType ==='database'"
              ></div>
              <div
                class="form-group col-md-6"
                v-if="t_datasource2[index].datasourceType === 'datafolder'"
                v-show="t_datasource2[index].datasourceType ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾路徑"
                  size="50"
                  class="form-control"
                  v-model="t_datasource2[index].dataRoot"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource2[index].datasourceType === 'datafolder'"
                v-show="t_datasource2[index].datasourceType ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾名稱"
                  style="margin-left:-94px"
                  class="form-control"
                  v-model="t_datasource2[index].datasourceName"
                />
              </div>
            </div>

            <div style="margin: 5px" class="form-inline">
              <div class="form-group col-md-2">
                <label for="staticEmail2">備註</label>
              </div>
              <div class="form-group col-md-10">
                <label for="inputPassword2" class="sr-only">Password</label>
                <textarea
                  class="form-control rounded-0"
                  id="exampleFormControlTextarea2"
                  rows="2"
                  cols="100"
                  v-model="databaseNote"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button v-on:click="createNewProject" type="button" class="btn btn-primary">確定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCreateNewProject, apiCreateNewDataBase } from "../../api";
import { uuid } from "uuid";

export default {
  name: "projectChangePage",
  data() {
    const uuidv4 = require("uuid/v4");
    var datasource_id_UUID = uuidv4();
    var datasource_id_UUID2 = uuidv4();
    const uuidv1 = require("uuid/v1");
    var project_id_UUID = uuidv1();
    return {
      projectId: project_id_UUID,
      projectName: "",
      projectCreaterId: "KATE",
      projectLastModifyId: "KATE",
      customerName: "",
      checkDate: "",
      warrDate: "",
      databaseNote: "",
      t_datasource: [
        {
          projectId: project_id_UUID,
          datasourceType: "",
          databaseIp: "",
          databasePort: "",
          databaseUser: "",
          databasePassword: "",
          databaseNote: "",
          DataBaseState: "",
          dataRoot: "",
          datasourceName: "",
          datasourceId: datasource_id_UUID,
          isInputDatasource: true,
          isOutputDatasource: false
        }
      ],
      t_datasource2: [
        {
          projectId: project_id_UUID,
          datasource_type: "",
          databaseIp: "",
          databasePort: "",
          databaseUser: "",
          databasePassword: "",
          databaseNote: "",
          DataBaseState: "",
          dataRoot: "",
          datasourceName: "blabla",
          datasourceId: datasource_id_UUID2,
          isInputDatasource: false,
          isOutputDatasource: true
        }
      ]
    };
  },
  created: function() {
    const uuidv1 = require("uuid/v1");
    var project_id_UUID = uuidv1();
    const uuidv4 = require("uuid/v4");
    var datasource_id_UUID = uuidv4();
  },
  watch: {
    datasource_type: function() {
      if ($("div[name='selectdatasourceDiv']").hasClass("col-md-10")) {
        $("div[name='selectdatasourceDiv']").remove("col-md-10");
        $("div[name='selectdatasourceDiv']").add("col-md-1");
      }
    }
  },
  methods: {
    //API接口
    createNewProject() {
      apiCreateNewProject({
        projectName: this.projectName,
        customerName: this.customerName,
        checkDate: this.checkDate,
        warrDate: this.warrDate,
        databaseNote: this.databaseNote,
        projectId: this.projectId,
        projectCreaterId: "kate",
        projectLastModifyId: "kate",
        DataBaseState: "",
        t_datasource: this.t_datasource,
        t_datasource2: this.t_datasource2
      });
    },
    addCol: function(index) {
      $("div[name='selectdatasourceDiv']")
        .remove("form-group col-md-10")
        .add("form-group col-md-1");

      const uuidv4 = require("uuid/v4");
      var datasource_id_UUID = uuidv4();
      let obj = {
        projectId: this.projectId,
        datasourceType: "",
        datasourceId: datasource_id_UUID,
        databaseIp: "",
        databasePort: "",
        databaseUser: "",
        databasePassword: "",
        databaseNote: "",
        DataBaseState: "",
        dataRoot: "",
        datasourceName: "",
        isInputDatasource: true,
        isOutputDatasource: false
      };
      this.t_datasource.splice(index + 1, 0, obj);
    },
    removeCol: function(index, arrayLength) {
      if (arrayLength === 1) {
        alert("已經到底了");
      } else {
        this.t_datasource.splice(index, 1);
      }
    },
    cleanValue: function(al, index, optionValue) {
      const uuidv4 = require("uuid/v4");
      var datasource_id_UUID = uuidv4();
      let objSetting = {
        projectId: this.projectId,
        datasourceType: optionValue,
        datasourceId: datasource_id_UUID,
        databaseIp: "",
        databasePort: "",
        databaseUser: "",
        databasePassword: "",
        databaseNote: "",
        DataBaseState: "",
        dataRoot: "",
        datasourceName: "",
        isInputDatasource: true,
        isOutputDatasource: false
      };
      let objSetting2 = {
        projectId: this.projectId,
        datasourceType: optionValue,
        datasourceId: datasource_id_UUID,
        databaseIp: "",
        databasePort: "",
        databaseUser: "",
        databasePassword: "",
        databaseNote: "",
        DataBaseState: "",
        dataRoot: "",
        datasourceName: "",
        isInputDatasource: false,
        isOutputDatasource: true
      };

      if (al === "dataSource") {
        this.$set(this.t_datasource, index, objSetting);
      } else {
        this.$set(this.t_datasource2, index, objSetting2);
      }
    }
  }
};
</script>

<style>
</style>
