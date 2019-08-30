<template>
  <!-- <div class="row">
    <div class="col-8">
      <h3>Draggable table</h3>
      <table class="table table-striped">
        <thead class="thead-dark">
          <draggable v-model="headers" tag="tr">
            <th v-for="header in headers" :key="header" scope="col">{{ header }}</th>
          </draggable>
        </thead>
        <draggable v-model="list" tag="tbody">
          <tr v-for="item in list" :key="item.name">
            <td v-for="header in headers" :key="header">{{ item[header] }}</td>
          </tr>
        </draggable>
      </table>
    </div>
  </div>-->

  <table class="table table-bordered" id="table">
    <thead id="sortableCol">
      <tr>
        <th class="borderless" scope="col" colspan="2">
          <button @click="test()">回上一層</button>
        </th>
        <th scope="col">
          <div>
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
          <div>
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
        </th>
        <th scope="col">
          <button type="button" class="btn btn btn-info btn-lg btn-block" @click="changecolumn()">排序</button>
        </th>
        <th scope="col"></th>
        <th scope="col">
          <div class="all-button plus-button" id="addrow" @click="addColumn(0)"></div>
        </th>
        <th :id="'drag2'+index" scope="col" v-for="(item,index) in ColTable">
          <div
            style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;"
          >
            <div class="all-button plus-button" id="addrow" @click="addColumn(index)"></div>
            <div class="all-button minus minus-button" id="minusrow" @click="removeCol(index)"></div>
          </div>
        </th>
      </tr>

      <tr>
        <th scope="col" colspan="2">
          <button type="button" class="btn btn btn-info btn-lg btn-block">
            <i class="fas fa-eye"></i>
          </button>
        </th>
        <th scope="col" colspan="3">大表英文名稱</th>
        <th scope="col">資料庫名稱</th>
        <th scope="col" v-for="(item,index) in ColTable">
          <select @change="onSelectDataSource($event,item)">
            <option value disabled selected>--請選擇--</option>
            <option
              v-for="(item,index) in DataSource"
              :value="item.datasourceId"
              v-if="item.is_input_datasource"
            >{{item.datasource_name}}</option>
          </select>
        </th>
      </tr>

      <tr>
        <th scope="col" colspan="2">
          <button type="button" class="btn btn btn-info btn-lg btn-block">發版</button>
        </th>
        <th scope="col" colspan="3" rowspan="2">大表中文名稱</th>
        <th scope="col">表單名稱</th>
        <th scope="col" v-for="(item,index) in ColTable">
          <select @change="onSelectTable($event,item)">
            <option value disabled selected>--請選擇--</option>
            <option v-for="(item,index) in TableSource" :value="item.tableId">{{item.table_cname}}</option>
          </select>
        </th>
      </tr>
      <tr>
        <th scope="col" colspan="2">
          <button type="button" class="btn btn btn-info btn-lg btn-block">暫存</button>
        </th>
        <th scope="col">串接順序</th>
        <th scope="col" v-for="(item,index) in ColTable">
          <textarea class="content sort-key" id type="text" v-model="index">{{index}}</textarea>
        </th>
      </tr>
      <tr>
        <th scope="row">
          <div
            style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;"
          >
            <div class="all-button plus-button" id="addrow" @click="addRow(index)"></div>
          </div>
        </th>
        <td>欄位英文</td>
        <td>欄位中文</td>
        <td>欄位型態</td>
        <td>pk/nop</td>
        <td>表單邏輯</td>
        <th scope="col" v-for="(item,index) in ColTable">
          <textarea class="content" type="text"></textarea>
        </th>
      </tr>
    </thead>

    <tbody id="sortableRow">
      <!-- <tr>
        <div
          style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;"
        >
          <div class="all-button plus-button" id="addrow" @click="addRow(index)"></div>
        </div>
      </tr>-->
      <tr :id="'drag'+index" v-for="(item,index) in RowTable">
        <td scope="row" id="draggable">
          <div
            style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;"
          >
            <div class="all-button plus-button" id="addrow" @click="addRow(index)"></div>
            <div class="all-button minus minus-button" id="minusrow" @click="removeRow(index)"></div>
          </div>
        </td>
        <td>
          <textarea class="content" type="text" v-model="item.eng">{{item.eng}}</textarea>
        </td>
        <td>
          <textarea class="content" type="text" v-model="item.chin">{{item.chin}}</textarea>
        </td>
        <td>
          <textarea class="content" type="text" v-model="item.type">{{item.type}}</textarea>
        </td>
        <td>
          <textarea class="content" type="text" v-model="item.pk">{{item.pk}}</textarea>
        </td>
        <td>
          <textarea class="content" type="text" v-model="item.login">{{item.login}}</textarea>
        </td>
        <td v-for="(item,index2) in functionData">
          <select>
            <option value disabled selected>--請選擇--</option>
            <option v-for="(item,index) in Column" :value="item.column_id">{{item.column_name}}</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import VuexStore from "../../store";
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
import {
  apiQueryDataBaseByprojectId,
  apiQueryTableMasterByDatasourceId,
  apiQueryColumnMasterByTableId
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
      ColTable: [],
      RowTable: [],
      tableId: this.$route.query.tableId,
      projectId: this.$route.query.projectId,
      DataSource: "",
      TableSource: "",
      Column: "",
      tableMaster: this.$store.state.FunctionTable_module,
      index: "",
      RowTableLength: "",
      ColTableLength: "",
      functionData: [],
      test: "",
      newDB: [],
      sortnum: [],
      headers: ["id", "name", "sport"],
      list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "" },
        { id: 3, name: "", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ],
      dragging: false
    };
  },
  created: function() {
    apiQueryDataBaseByprojectId({
      projectId: this.projectId
    })
      .then(res => {
        this.DataSource = res.data;
        var x = res.data.datasource_name;

        console.log(x);
      })
      .catch(err => {
        console.log(err);
      });

    this.$store.dispatch("loadingOneTableMaster", this.$route.query.tableId);
    let objtemp = this.$store.state.FunctionTable_module.tableMaster;
    // this.functionTable = functionTable;
  },
  mounted: function() {
    //  this.$store.state.FunctionTable_module.tableMaster.data.forEach(element => {
    //    console.log(element);
    //  });

    $("#sortableRow").sortable({
      revert: true,
      axis: "y",
      cursor: "pointer",
      // cancel:'#nodrag',
      stop: function() {
        var arr = $("#sortableRow").sortable("toArray");
        console.log(arr);
        localStorage.arr = arr;
        var localSt = localStorage.arr;
        if (localSt) {
          var resArr = localSt.split(",");
          console.log(resArr);
        }
        var resUl = $("tbody");
        for (var i = 0; i < resArr.length; i++) {
          resUl.append($("#" + resArr[i]));
        }
      }
    });

    $("#sortableCol").sortable({
      revert: true,
      axis: "x",
      cursor: "pointer",
      // cancel:'#nodrag',
      stop: function() {
        var arr = $("#sortableCol").sortable("toArray");
        console.log(arr);
        localStorage.arr = arr;
        var localSt = localStorage.arr;
        if (localSt) {
          var resArr = localSt.split(",");
          console.log(resArr);
        }
        var resUl = $("thead");
        for (var i = 0; i < resArr.length; i++) {
          resUl.append($("#" + resArr[i]));
        }
      }
    });
  },
  watch: {
    ColTable: function() {
      console.log("ColTablechange");

      this.RowTableLength = this.RowTable.length;
      this.ColTableLength = this.ColTable.length;
      // console.log("RowTableLength:" + this.RowTableLength);
      // console.log("ColTableLength:" + this.ColTableLength);
      // if (this.RowTableLength != this.ColTableLength) {
      //   // this.functionData.splice(0, 0, "coordinate");
      //   this.functionData.push("coordinate");
      // }
    },
    deep: true,
    immediate: false,
    RowTable: function() {
      console.log("RowTablechange");
      this.RowTableLength = this.RowTable.length;
      this.ColTableLength = this.ColTable.length;
      // if (this.RowTableLength != this.ColTableLength) {
      //   // this.functionData.splice(0, 0, "coordinate");
      //   this.functionData.push("coordinate");
      // }
    },
    deep: true,
    immediate: false,
    functionData: function() {
      console.log("functionDatachange");
    },
    deep: true,
    immediate: false,
    RowTableLength: function() {
      // console.log(this.RowTableLength);
      // console.log(this.ColTableLength);
      // this.functionData.splice(this.RowTableLength + 1, 0, "obj");
    },
    ColTableLength: function() {
      // console.log(this.RowTableLength);
      // console.log(this.ColTableLength);
    }
  },
  computed: {
    // functionData() {
    //   // this.functionData.splice(index + 1, 0, "test");
    // }
    // repeat() {
    //   this.sortnum.filter(function(element, index, arr) {
    //     return arr.indexOf(element) !== index;
    //   });
    // }
  },

  methods: {
    // changecolumn: function() {
    //   //console.log(this.newDB);
    //   var $this = this;
    //   var i = 0;

    //   this.sortnum.length = 0; //newDB清空
    //   $(".sort-key").each(function(index, item) {
    //     $this.sortnum.push($(this).val()); //抓到新的排序
    //   });
    //   //檢查順序是否重複
    //   var repeat = this.sortnum.filter(function(element, index, arr) {
    //     return arr.indexOf(element) !== index;
    //   });

    //   alert(this.repeat);

    //   this.DB.forEach(function(item, index) {
    //     var newnum = $this.sortnum[i];
    //     $this.newDB[newnum] = $this.DB[i]; //把新的值塞到newDB
    //     i++;
    //   });
    //   this.DB.length = 0; //DB清空
    //   for (var i = 0; i < this.newDB.length; i++) {
    //     this.DB[i] = this.newDB[i];
    //   }

    //   this.$forceUpdate();
    // },
    addColumn: function(index) {
      console.log("This is Column");
      let Columnindex = index;

      let coordinate = {
        Row: this.RowTableLength,
        Col: this.ColumnTableLength
      };

      let Obj = {
        index: index
      };
      // console.log(Columnindex);
      this.ColTable.splice(Columnindex + 1, 0, Obj);
      this.functionData.push(coordinate);
      // if (this.RowTableLength === this.ColTableLength) {
      //   this.functionData.splice(this.test, 0, "coordinate");
      // }

      // this.functionData.splice(index + 1, 0, "obj");
      // this.functionData.splice(index + 1, 0, "test");
      // this.DB.splice(index + 1, 0, "");
      // this.functionData.splice(this.RowTableLength + 1, 0, "obj");
    },
    removeCol: function(index) {
      this.ColTable.splice(index, 1);
      // this.DB.splice(index, 1);
    },
    addRow: function(index) {
      console.log("This is Row");
      let RowIndex = index;
      if (index === "") {
        RowIndex = 0;
      }
      let arr = new Array();
      // console.log(RowIndex);
      let obj = {
        column_name: "",
        column_c_name: "",
        column_type: "",
        is_pk: "",
        columnInTableType: "Row"
      };

      this.RowTable.splice(this.RowIndex + 1, 0, obj);
      console.log("rowTable長度:" + this.RowTable.length);
      console.log("colTable長度:" + this.ColTable.length);
      console.log("compare:" + (this.RowTable.length === this.ColTable.length));
      console.log("is0?:" + (this.ColTable.length != 0));
      let coordinate = {
        Row: this.RowTable.length,
        Col: this.ColTable.length,
        Obj: []
      };
      if (
        this.RowTable.length === this.ColTable.length &&
        this.ColTable.length != 0
      ) {
        this.functionData.push(coordinate);
      }
      // console.log(this.RowTable.length);
      // console.log(this.ColTable.length);
      // if (this.RowTable.length === this.ColTable.length) {
      //   this.functionData.splice(this.test, 0, "coordinate");
      // }
    },
    removeRow: function(index) {
      this.RowTable.splice(index, 1);
      // this.functionData.splice(index, 1);
    },
    toggleModel: function() {
      // console.log("hello");
      // $(function() {
      $("#ModelPattern").change(function() {});
      // });
    },
    /*
     *小J新加
     */
    onSelectDataSource(event, item) {
      let DataSourceId = event.target.value;
      apiQueryTableMasterByDatasourceId(DataSourceId)
        .then(res => {
          this.TableSource = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSelectTable(event, item) {
      let TableId = event.target.value;
      apiQueryColumnMasterByTableId(TableId)
        .then(res => {
          console.log(res);
          this.Column = res.data;
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
