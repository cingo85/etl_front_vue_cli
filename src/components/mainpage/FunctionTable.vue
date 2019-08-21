<template>
  <table class="table table-bordered">
    <thead id="sortableCol">
      <tr>
        <th class="borderless" scope="col" colspan="2">
          <button>回上一層</button>
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
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">
          <button type="button" class="btn btn btn-info btn-lg btn-block" @click="changecolumn()">排序</button>
        </th>
        <th scope="col" v-for="(item,index) in functionTable.Data.ColTable">
          <div
            style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;"
          >
            <div class="all-button plus-button" id="addrow" @click="addCol(index)"></div>
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
        <th scope="col" v-for="(item,index) in functionTable.Data.ColTable">
          <textarea class="content" type="text" v-model="item.DBname"></textarea>
        </th>
      </tr>
      <tr>
        <th scope="col" colspan="2">
          <button type="button" class="btn btn btn-info btn-lg btn-block">發版</button>
        </th>
        <th scope="col" colspan="3" rowspan="2">大表中文名稱</th>
        <th scope="col">表單名稱</th>
        <th scope="col" v-for="(item,index) in functionTable.Data.ColTable">
          <textarea class="content" type="text" v-model="item.TableName"></textarea>
        </th>
      </tr>
      <tr>
        <th scope="col" colspan="2">
          <button type="button" class="btn btn btn-info btn-lg btn-block">暫存</button>
        </th>
        <th scope="col">串接順序</th>
        <th scope="col" v-for="(item,index) in functionTable.Data.ColTable">
          <textarea class="content sort-key" id type="text" v-model="index">{{index}}</textarea>
        </th>
      </tr>
      <tr>
        <th scope="row"></th>
        <td>欄位英文</td>
        <td>欄位中文</td>
        <td>欄位型態</td>
        <td>pk/nop</td>
        <td>表單邏輯</td>
        <th scope="col" v-for="(item,index) in functionTable.Data.ColTable">
          <textarea class="content" type="text"></textarea>
        </th>
      </tr>
    </thead>

    <tbody id="sortableRow">
      <tr :id="'drag'+index" v-for="(item,index) in functionTable.Data.functionData">
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
        <td v-for="(item,index2) in functionTable.Data.ColTable">
          <textarea class="content" type="text"></textarea>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { functionTable } from "@/assets/js/hello.js";
import $ from "jquery";
export default {
  name: "functionTable",
  data() {
    return {
      functionTable: ""
    };
  },
  created: function() {
    this.functionTable = functionTable;
  },
  mounted: function() {
    // $(document).disableSelection();
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
  },
  computed: {
    repeat() {
      this.sortnum.filter(function(element, index, arr) {
        return arr.indexOf(element) !== index;
      });
    }
  },
  methods: {
    changecolumn: function() {
      //console.log(this.newDB);
      var $this = this;
      var i = 0;

      this.sortnum.length = 0; //newDB清空
      $(".sort-key").each(function(index, item) {
        $this.sortnum.push($(this).val()); //抓到新的排序
      });
      //檢查順序是否重複
      // var repeat = this.sortnum.filter(function(element, index, arr){
      //   return arr.indexOf(element) !== index;
      // })

      alert(this.repeat);

      this.DB.forEach(function(item, index) {
        var newnum = $this.sortnum[i];
        $this.newDB[newnum] = $this.DB[i]; //把新的值塞到newDB
        i++;
      });
      this.DB.length = 0; //DB清空
      for (var i = 0; i < this.newDB.length; i++) {
        this.DB[i] = this.newDB[i];
      }

      this.$forceUpdate();
    },
    addCol: function(index) {
      this.functionTable.Data.ColTable.splice(index + 1, 0, "add");
      this.DB.splice(index + 1, 0, "");
    },
    removeCol: function(index) {
      this.functionTable.Data.ColTable.splice(index, 1);
      this.DB.splice(index, 1);
    },
    addRow: function(index) {
      this.functionTable.Data.RowTable.splice(index + 1, 0, "add");
      let obj = {
        eng: "",
        chin: "",
        type: "",
        pk: "",
        logic: ""
      };
      this.functionTable.Data.functionData.splice(index + 1, 0, obj);
    },
    removeRow: function(index) {
      this.functionTable.Data.RowTable.splice(index, 1);
      this.functionTable.Data.functionData.splice(index, 1);
    },
    toggleModel: function() {
      // $(function() {
      $("#ModelPattern").change(function() {
        alert("切換殺戮模式");
      });
      // });
    }
    /*
     *畫面控制選項
     */
  }
};
</script>

<style>
</style>
