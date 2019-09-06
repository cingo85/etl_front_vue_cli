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
            v-for="(item,index) in SourceTableMaster"
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
            <!-- <template v-if="header === 'ColumnEng'">{{ item[header] }}</template>
            <template v-if="header === 'ColumnChi'">{{ item[header] }}</template>
            <template v-if="header === 'ColumnType'">{{ item[header] }}</template>
            <template v-if="header === 'PrimaryKey'">{{ item[header] }}</template>
            <template v-if="header === 'TableLogic'">{{ item[header] }}</template>-->
            <!-- <template @click="change(item[header])">{{ item[header] }}</template> -->
            <!-- {{ item[header] }} -->
            <input  disabled="false" v-if="header==='ColumnEng' || header==='ColumnChi' || header==='ColumnType' || header === 'PrimaryKey' || header === 'TableLogic'"  @click="change(item[header])" v-model="item[header]"></input>
            <select v-else>
              <option value disabled selected>--請選擇--</option>
              <option v-for="(item,index) in Column" v-if="header === item">{{item}}</option>
            </select>
            <!-- <input v-if="!(ReadOnly)"></input> -->
            <!-- <select v-if="header!='TableLogic'">
              <option value disabled selected>--請選擇--</option>
              <option v-for="(item,index) in Column" v-if="header === item">{{item}}</option>
            </select> -->
            <!-- <input v-if="header!='TableLogic'"  @click="change(item[header])" v-model="item[header]"></input> -->
          </td>
          <!-- <td v-for="(item,index2) in functionData">
            <select>
              <option value disabled selected>--請選擇--</option>
              <option v-for="(item,index) in Column" :value="item.column_id">{{item.column_name}}</option>
            </select>
          </td>-->
        </tr>
      </draggable>
    </table>
  </div>
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
      ColTable: [],
      RowTable: [],
      tableId: this.$route.query.tableId,
      projectId: this.$route.query.projectId,
      DataSource: "",
      TableSource: "",
      Column: [],
      tableMaster: this.$store.state.FunctionTable_module,
      index: "",
      RowTableLength: "",
      ColTableLength: "",
      functionData: [],
      test: "",
      newDB: [],
      sortnum: [],
      headers: [
        "ColumnEng",
        "ColumnChi",
        "ColumnType",
        "PrimaryKey",
        "TableLogic"
      ],
      list: [
        {
          ColumnEng: 1,
          ColumnChi: "Abby",
          ColumnType: "basket",
          PrimaryKey: "dddd",
          TableLogic: ""
        },
        {
          ColumnEng: 2,
          ColumnChi: "Brooke",
          ColumnType: "",
          PrimaryKey: "dddd",
          TableLogic: ""
        },
        {
          ColumnEng: 3,
          ColumnChi: "",
          ColumnType: "volley",
          PrimaryKey: "",
          TableLogic: ""
        },
        {
          ColumnEng: 4,
          ColumnChi: "David",
          ColumnType: "rugby",
          PrimaryKey: "",
          TableLogic: ""
        }
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
        // res.data.forEach(item =>{
        //   console.log(item.tableId)
        // })
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
    change: function(item) {
      console.log(item);
    },
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
    var obj={
        };
    this.headers.forEach(function(element) {
        obj[element] = "";
        console.log(obj)
      });
      // console.log(obj)
      this.list.push(obj);
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
    async onSelectDataSource(event) {
      let DataSourceId = event.target.value;
      // console.log(DataSourceId);
      let strArr = DataSourceId.split(".");
      this.headers.push(strArr[1]);
      // console.log(this.headers);
      this.list.forEach(function(element) {
        element["" + strArr[1] + ""] = "";
      });

      let Tablemap = new Map();
      let Columnarr = new Array();
      let index = 0;
      // let obj = {
      //   tableId: "",
      //   column_name: ""
      // };
      await apiQueryColumnMasterByTableId(strArr[0])
        .then(res => {
          // res.data.forEach(item => {
          //   let obj = {
          //     tableId: "",
          //     column_name: ""
          //   };
          //   console.log(item);
          //   obj.tableId = item.tableId;
          //   obj.column_name = item.column_name;
          //   if (Tablemap.get(strArr[1]) === undefined) {
          //     Tablemap.set(strArr[1], (Columnarr = new Array()));
          //     Tablemap.get(strArr[1]).splice(index++, 0, obj);
          //   } else {
          //     Tablemap.get(strArr[1]).splice(index++, 0, obj);
          //   }
          // });

          // // Tablemap.set(strArr[1], obj);
          // console.log(Tablemap);
          this.Column.push(res.data);
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
