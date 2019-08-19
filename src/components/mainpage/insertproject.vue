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
                <input size="21" type="text" class="form-control" v-model="project_name" />
              </div>
              <div class="form-group col-md-2">
                <label for="staticEmail2">客戶名稱</label>
              </div>
              <div class="form-group col-md-4">
                <label for="inputPassword2" class="sr-only"></label>
                <input size="21" type="text" class="form-control" v-model="customer_name" />
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
                  <input type="date" class="form-control" value="03/04/2014" v-model="check_date" />
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
                  <input type="date" class="form-control" value="03/04/2014" v-model="warr_date" />
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
                  v-model="t_datasource[index].datasource_type"
                  @click="cleanValue('dataSource',index,t_datasource[index].datasource_type)"
                >
                  <option value>請選擇</option>
                  <option value="database">資料庫</option>
                  <option value="datafolder">資料夾</option>
                </select>
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasource_type === 'database'"
                v-show="t_datasource[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫IP"
                  class="form-control"
                  v-model="t_datasource[index].database_ip"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasource_type === 'database'"
                v-show="t_datasource[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫Port"
                  size="10"
                  class="form-control"
                  v-model="t_datasource[index].database_port"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource[index].datasource_type === 'database'"
                v-show="t_datasource[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫帳號"
                  class="form-control"
                  v-model="t_datasource[index].database_user"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource[index].datasource_type === 'database'"
                v-show="t_datasource[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫密碼"
                  class="form-control"
                  v-model="t_datasource[index].database_password"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasource_type === 'database'"
                v-show="t_datasource[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫名稱"
                  class="form-control"
                  v-model="t_datasource[index].datasource_name"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasource_type === 'database'"
                v-show="t_datasource[index].datasource_type ==='database'"
              ></div>
              <div
                class="form-group col-md-6"
                v-if="t_datasource[index].datasource_type === 'datafolder'"
                v-show="t_datasource[index].datasource_type ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾路徑"
                  size="50"
                  class="form-control"
                  v-model="t_datasource[index].data_root"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource[index].datasource_type === 'datafolder'"
                v-show="t_datasource[index].datasource_type ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾名稱"
                  style="margin-left:-94px"
                  class="form-control"
                  v-model="t_datasource[index].datasource_name"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource[index].datasource_type != ''"
                v-show="t_datasource[index].datasource_type !=''"
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
                  v-model="t_datasource2[index].datasource_type"
                  @click="cleanValue('dataPath',index,t_datasource2[index].datasource_type)"
                >
                  <option value>請選擇</option>
                  <option value="database">資料庫</option>
                  <option value="datafolder">資料夾</option>
                </select>
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasource_type === 'database'"
                v-show="t_datasource2[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫IP"
                  class="form-control"
                  v-model="t_datasource2[index].database_ip"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasource_type === 'database'"
                v-show="t_datasource2[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫Port"
                  size="10"
                  class="form-control"
                  v-model="t_datasource2[index].database_port"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource2[index].datasource_type === 'database'"
                v-show="t_datasource2[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫帳號"
                  class="form-control"
                  v-model="t_datasource2[index].database_user"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource2[index].datasource_type === 'database'"
                v-show="t_datasource2[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫密碼"
                  class="form-control"
                  v-model="t_datasource2[index].database_password"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasource_type === 'database'"
                v-show="t_datasource2[index].datasource_type ==='database'"
              >
                <input
                  type="text"
                  placeholder="資料庫名稱"
                  class="form-control"
                  v-model="t_datasource2[index].datasource_name"
                />
              </div>
              <div
                class="form-group col-md-1"
                v-if="t_datasource2[index].datasource_type === 'database'"
                v-show="t_datasource2[index].datasource_type ==='database'"
              ></div>
              <div
                class="form-group col-md-6"
                v-if="t_datasource2[index].datasource_type === 'datafolder'"
                v-show="t_datasource2[index].datasource_type ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾路徑"
                  size="50"
                  class="form-control"
                  v-model="t_datasource2[index].data_root"
                />
              </div>
              <div
                class="form-group col-md-2"
                v-if="t_datasource2[index].datasource_type === 'datafolder'"
                v-show="t_datasource2[index].datasource_type ==='datafolder'"
              >
                <input
                  type="text"
                  placeholder="資料夾名稱"
                  style="margin-left:-94px"
                  class="form-control"
                  v-model="t_datasource2[index].datasource_name"
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
                  v-model="note"
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
      project_name: "",
      project_creater_id: "KATE",
      project_last_modify_id: "KATE",
      customer_name: "",
      check_date: "",
      warr_date: "",
      note: "",
      t_datasource: [
        {
          projectId: project_id_UUID,
          datasource_type: "",
          database_ip: "",
          database_port: "",
          database_user: "",
          database_password: "",
          database_note: "",
          state: "",
          data_root: "",
          datasource_name: "",
          datasource_id: datasource_id_UUID,
          is_input_datasource: true,
          is_output_datasource: false
        }
      ],
      t_datasource2: [
        {
          projectId: project_id_UUID,
          datasource_type: "",
          database_ip: "",
          database_port: "",
          database_user: "",
          database_password: "",
          database_note: "",
          state: "",
          data_root: "",
          datasource_name: "blabla",
          datasource_id: datasource_id_UUID2,
          is_input_datasource: false,
          is_output_datasource: true
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
        project_name: this.project_name,
        customer_name: this.customer_name,
        check_date: this.check_date,
        warr_date: this.warr_date,
        note: this.note,
        projectId: this.projectId,
        project_creater_id: "kate",
        project_last_modify_id: "kate",
        state: "",
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
        datasource_type: "",
        datasource_id: datasource_id_UUID,
        database_ip: "",
        database_port: "",
        database_user: "",
        database_password: "",
        note: "",
        state: "",
        data_root: "",
        datasource_name: "",
        is_input_datasource: true,
        is_output_datasource: false
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
        datasource_type: optionValue,
        datasource_id: datasource_id_UUID,
        database_ip: "",
        database_port: "",
        database_user: "",
        database_password: "",
        note: "",
        state: "",
        data_root: "",
        datasource_name: "",
        is_input_datasource: true,
        is_output_datasource: false
      };
      let objSetting2 = {
        projectId: this.projectId,
        datasource_type: optionValue,
        datasource_id: datasource_id_UUID,
        database_ip: "",
        database_port: "",
        database_user: "",
        database_password: "",
        note: "",
        state: "",
        data_root: "",
        datasource_name: "",
        is_input_datasource: false,
        is_output_datasource: true
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
