<template>
  <div id="modal-table-form" class="modal fade" aria-hidden="true" tabindex="-1" role="dialog">
    <div class="modal-dialog" style="text-align: center;margin-left: 650px;margin-top: 150px">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="m-t-none m-b">建立新表單</h3>
        </div>

        <div class="modal-body">
          <form xclass="form-inline">
            <div style="margin: 5px" class="form-inline">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="staticEmail2">表單英文名稱</label>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword2" class="sr-only"></label>
                  <input size="23" type="text" class="form-control" v-model="tableEname" />
                </div>
              </div>
            </div>
            <div style="margin: 5px" class="form-inline">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="staticEmail2">表單中文名稱</label>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword2" class="sr-only"></label>
                  <input size="23" type="text" class="form-control" v-model="tableCname" />
                </div>
              </div>
            </div>
            <div style="margin: 5px" class="form-inline">
              <div class="form-group col-md-2">
                <label for="staticEmail2">備註</label>
              </div>
              <div class="form-group col-md-10">
                <label for="inputPassword2" class="sr-only"></label>
                <textarea
                  class="form-control rounded-0"
                  style="margin-left: 100px"
                  rows="2"
                  cols="100"
                  v-model="tMasterNote"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="create()">確定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from "uuid";
import {apiUpdateTableMaster, apiQueryDataBaseByByProjectIdWithOutPut} from "../../api";


export default {
  name: "createNewTable",
  data() {
    const uuidv4 = require("uuid/v4");
    var table_id = uuidv4();
    return {
      projectId: this.$route.query.projectId,
      databaseNote: '',
      datasourceId: '',
      tableId: table_id,
      tableCname: '',
      tableEname: '',
      tableMasterState: "PMCreate",
      isConcatenation: false,
      description: '',
      reason: '',
      tMasterNote: '',
      version: '1.0',
      projectData: ''
    };
  },
  created: function () {
    apiQueryDataBaseByByProjectIdWithOutPut({
      projectId: this.projectId
    }).then(res => {
     let outdata = res.data;
      outdata.forEach(element =>{
        this.datasourceId = element.datasourceId;
      })

    }).catch(err => {

    })
  },
  methods: {
    create() {
      apiUpdateTableMaster({
        projectId: this.projectId,
        database_note: this.database_note,
        datasourceId: this.datasourceId,
        tableId: this.tableId,
        tableCname: this.tableCname,
        tableEname: this.tableEname,
        tableMasterState: this.tableMasterState,
        isConcatenation: this.isConcatenation,
        description: this.description,
        reason: this.reason,
        tMasterNote: this.tMasterNote,
        version: this.version
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

    }
  }
};
</script>

<style>
</style>
