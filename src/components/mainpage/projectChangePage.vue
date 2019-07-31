<template>
  <div id="modal-form" class="modal fade" aria-hidden="true" tabindex="-1" role="dialog">
    <div class="modal-dialog" style="text-align: center;margin-left: 350px;margin-top: 150px">
      <div class="modal-content" style="width:1200px">
        <div class="modal-header">
          <h3 class="m-t-none m-b">建立新專案</h3>
        </div>

        <div class="modal-body">
          <form xclass="form-inline">
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
            <div style="margin: 5px" class="form-inline">
              <div class="form-group col-md-2">
                <label for="staticEmail2">資料來源</label>
              </div>
              <div id="selectdatasourceDiv" class="form-group col-md-10">
                <label for="inputPassword2" class="sr-only"></label>
                <select class="custom-select" v-model="datasource_type">
                  <option value>請選擇</option>
                  <option value="database">資料庫</option>
                  <option value="datafolder">資料夾</option>
                </select>
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

export default {
  name: "projectChangePage",
  data() {
    return {
      project_name: "",
      customer_name: "",
      check_date: "",
      warr_date: "",
      note: "",
      datasource_type: ""
    };
  },
  methods: {
    createNewProject() {
      apiCreateNewProject({
        project_name: this.project_name,
        customer_name: this.customer_name,
        check_date: this.check_date,
        warr_date: this.warr_date,
        note: this.note
      }),
        apiCreateNewDataBase({
          datasource_type: this.datasource_type,
          database_ip: this.database_ip,
          database_port: this.database_port,
          datasource_name: this.datasource_name,
          database_user: this.database_user,
          database_password: this.database_password,
          note: this.note,
          state: this.state,
          data_root: this.data_root
        });
    }
  }
};
</script>

<style>
</style>
