<template>
  <div>
    <div class="row">
      <div class="col-lg-1">
        <button @click="test()">回上一層</button>
      </div>
      <div class="col-lg-1">
        <input
          @click="toggleModel()"
          id="ModelPattern"
          type="checkbox"
          checked
          data-toggle="toggle"
          data-onstyle="danger"
          data-on="編輯模式"
          data-off="檢視模式"
        />
      </div>
      <div class="col-lg-1">
        <input
          type="checkbox"
          checked
          data-toggle="toggle"
          data-onstyle="success"
          data-offstyle="primary"
          data-on="大表"
          data-off="串接"
        />
      </div>
      <div class="col-lg-1">
        <button type="button" class="btn btn btn-info btn-lg btn-block" @click="changecolumn()">排序</button>
      </div>
      <div class="col-lg-1">大表英文名稱</div>
      <div class="col-lg-1">大表中文名稱</div>
      <div class="col-lg-1">
        <button type="button" class="btn btn btn-info btn-lg btn-block">發版</button>
      </div>
      <div class="col-lg-1">
        <button type="button" class="btn btn btn-info btn-lg btn-block">暫存</button>
      </div>
      <div class="col-lg-1">
        <!-- <div id="addColumn" > -->
        增加資料源
        <select @change="onSelectDataSource($event)">
          <option value disabled selected>--請選擇--</option>
          <option
            v-for="item in SourceTableMaster"
            :value="item.tableId+'.'+item.table_cname"
          >{{item.table_cname}}</option>
        </select>
        <!-- </div> -->
      </div>
      <div class="col-lg-1">
        <button id="addRow" @click="addRow(index)">增加來源</button>
      </div>
      <div class="col-lg-1">
        <button @click="test()">回上一層</button>
      </div>
      <div class="col-lg-1">
        <button @click="test()">回上一層</button>
      </div>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <draggable v-model="headers" tag="tr">
          <th v-for="header in headers" :key="header" scope="col">{{ header }}</th>
        </draggable>
      </thead>
      <draggable v-model="list" tag="tbody">
        <tr v-for="item in list" :key="item.name">
          <td v-for="header in headers" :key="header">
            <input   v-if="header==='ColumnEng' || header==='ColumnChi' || header==='ColumnType' || header === 'PrimaryKey' || header === 'TableLogic'"  @click="change(item[header])" v-model="item[header]"></input>
            <div v-else v-for="itemMaster in Column" v-if="header === itemMaster.tableName">
                <select v-model="item[header]">
                  <option value disabled selected>--請選擇--</option>
                  <option
                          v-for="itemdetail in itemMaster.tableValue"
                          :value="itemdetail.column_id"
                  >{{itemdetail.column_name}}</option>
                </select>
            </div>
          </td>
        </tr>
      </draggable>
    </table>
  </div>
</template>
<script>
import VuexStore from "../../store";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
import {
  apiQueryDataBaseByprojectId,
  apiQueryTableMasterByDatasourceId,
  apiQueryColumnMasterByTableId,
  apiQueryTableMasterByProjectId
} from "../../api";

export default {
  name: "functionTable",
  display: "Table",
  order: 8,
  components: {
    draggable
  },
  data() {
    return {
      tableId: this.$route.query.tableId,
      projectId: this.$route.query.projectId,
      DataSource: "",
      Column: [],
      tableMaster: this.$store.state.FunctionTable_module,
      headers: [
        "ColumnEng",
        "ColumnChi",
        "ColumnType",
        "PrimaryKey",
        "TableLogic"
      ],
      list: [
      ],
      dragging: false,
      SourceTableMaster: "",
      ReadOnly : true
    };
  },
  created: function() {
    apiQueryDataBaseByprojectId({
      projectId: this.projectId
    })
      .then(res => {
        this.DataSource = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    apiQueryTableMasterByProjectId({
      projectId: this.projectId
    })
      .then(res => {
        this.SourceTableMaster = res.data;
      })
      .catch(err => {
        console.log(err);
      });
     this.$store.dispatch("loadingOneTableMaster", this.$route.query.tableId);
    // let objtemp = this.$store.state.FunctionTable_module.tableMaster;
  },
  mounted: function() {

  },
  watch: {
  },
  computed: {
  },
  methods: {
    removeCol: function(index) {
      this.ColTable.splice(index, 1);
    },
    addRow: function(index) {
    var obj={};
    this.headers.forEach(function(element) {
        obj[element] = "";
      });
      this.list.push(obj);
    },
    removeRow: function(index) {
      this.RowTable.splice(index, 1);
    },
    /*
     *小J新加 超幹酷炫屌炸天
     */
    async onSelectDataSource(event) {
      let DataSourceId = event.target.value;
      let strArr = DataSourceId.split(".");
      this.headers.push(strArr[1]);

      this.list.forEach(function(element) {
        element["" + strArr[1] + ""] = "";
      });
      await apiQueryColumnMasterByTableId(DataSourceId)
        .then(res => {

          let obj = {
            tableName:strArr[1],
            tableValue:res.data
          }

          this.Column.push(obj);
        })
        .catch(err => {
          console.log(err);
        });
    }
    /*
     *畫面控制選項
     */
  }
};
</script>

<style>
</style>
