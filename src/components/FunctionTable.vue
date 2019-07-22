<template>
    <body>
    <div id="app">
    <noscript>
      <strong>We're sorry but etl_front_vue_cli doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

      <header class="top-menu">
        <div class="wrapper-brand">
          <a class="brand">大學校院<br>校務資料庫<br>填報上傳系統</a>
        </div>
        <div class="container">
          <nav >
            <ul>
              <li class="feature1"><a href="#"><i class="fas fa-users"></i>您好 test</a></li>
              <li class="feature2"><a href="#"><i class="fas fa-sign-out-alt"></i>登出</a></li>
              <li class="feature3"><a href="#"><i class="fas fa-wrench"></i>設定</a></li>
             
            </ul>
          </nav>
        </div>
      </header>
      <aside>
          <nav id="menu" class="rad-sidebar">
            <ul>
              <li><a href="#" class="active"><i class="fa fa-home"></i>校10-2. 配合大專校院弱勢學生助學計畫之其他助學措施統計表(10月填報)</a></li>
              <li><a href="#"><i class="fa fa-info-circle"></i>校10-2. 配合大專校院弱勢學生助學計畫之其他助學措施統計表(10月填報)</a></li>
              <li>
                <a href="#"><i class="fa fa-laptop"></i>校10-2. 配合大專校院弱勢學生助學計畫之其他助學措施統計表(10月填報)<i class="fa fa-caret-down"></i></a>
                <ul>
                  <li><a href="#">BBB</a></li>
                  <li><a href="#">CCC</a></li>
                  <li><a href="#">DDD</a></li>
                </ul>
              </li>
              <li><a href="#"><i class="fa fa-info-circle"></i>校10-2. 配合大專校院弱勢學生助學計畫之其他助學措施統計表(10月填報)</a></li>
            </ul>
            <!--開啟選單按鈕-->
            <a href="#" class="rad-toggle-btn">
              <i class="fa fa-bars"></i>
            </a>
          </nav>
      </aside>
  
      <main>
        <div class="container-fluid layout" >
            
          <table class="table table-bordered" >
            <thead id="sortableCol">
              <tr>
                  <th class="borderless" scope="col" colspan="2"></th>
                  <th scope="col" ></th>
                  <th scope="col" ></th>
                  <th scope="col"></th>
                  <th scope="col" ><button type="button"  class="btn btn btn-info btn-lg btn-block" @click="changecolumn()">排序</button></th>
                  <th scope="col" v-for="(item,index) in functionTable.ColTable">
                      <div  style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;">
                        <div class="all-button plus-button" id="addrow" @click="addCol(index)"></div>
                        <div class="all-button minus minus-button" id="minusrow" @click="removeCol(index)"></div>
                      </div>   
                  </th>
              </tr>
              <tr>
                <th scope="col" colspan="2"><button type="button" class="btn btn btn-info btn-lg btn-block"><i class="fas fa-eye"></i></button></th>
                <th scope="col" colspan="3" >大表英文名稱</th>
                <th scope="col" >資料庫名稱</th>
                <th scope="col"  v-for="(item,index) in functionTable.ColTable" ><textarea class="content" type="text" v-model="DB[index].DBname"></textarea></th>
              </tr>
              <tr>
                <th scope="col" colspan="2"><button type="button" class="btn btn btn-info btn-lg btn-block">發版</button></th>
                <th scope="col" colspan="3"  rowspan="2">大表中文名稱</th>
                <th scope="col" >表單名稱</th>
                <th scope="col"  v-for="(item,index) in functionTable.ColTable"><textarea class="content" type="text" v-model="DB[index].TableName"></textarea></th>
  
              </tr>
              <tr>
                <th scope="col" colspan="2"><button type="button" class="btn btn btn-info btn-lg btn-block">暫存</button></th>
                <th scope="col" >串接順序</th>
                <th scope="col"  v-for="(item,index) in functionTable.ColTable"><textarea class="content sort-key" id="" type="text" v-model="index">{{index}}</textarea></th>
              </tr>
              <tr>
                  <th scope="row" ></th>
                  <td>欄位英文</td>
                  <td>欄位中文</td>
                  <td>欄位型態</td>
                  <td>pk/nop</td>
                  <td>表單邏輯</td>
                  <th scope="col"  v-for="(item,index) in functionTable.ColTable"><textarea class="content" type="text"></textarea></th>
              </tr>
            </thead>
  
  
  
            <tbody id="sortableRow">
              <tr :id="'drag'+index" v-for="(item,index) in functionTable.RowTable">
                <td scope="row" id="draggable">
                  <div  style="display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;">
                      <div class="all-button plus-button" id="addrow" @click="addRow(index)"></div>
                      <div class="all-button minus minus-button" id="minusrow" @click="removeRow(index)"></div>
                  </div>
                </td>
                <td><textarea class="content" type="text" v-model="functionData[index].eng">{{functionData[index].eng}}</textarea></td>
                <td><textarea class="content" type="text" v-model="functionData[index].chin">{{functionData[index].chin}}</textarea></td>
                <td><textarea class="content" type="text" v-model="functionData[index].type">{{functionData[index].type}}</textarea></td>
                <td><textarea class="content" type="text" v-model="functionData[index].pk">{{functionData[index].pk}}</textarea></td>
                <td><textarea class="content" type="text" v-model="functionData[index].login">{{functionData[index].login}}</textarea></td>
                <td  v-for="(item,index) in functionTable.ColTable" ><textarea class="content" type="text"></textarea></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <!-- built files will be auto injected -->
  </body>

</template>
<script>
import Vue from 'vue'
import '../assets/css/reset.css'
import '../assets/css/style.css'
import 'bootstrap'
import 'jquery'
import 'popper.js'
import $ from 'jquery'
import 'jquery-ui-bundle'
import functionTable from '../assets/js/hello'


Vue.prototype.functionTable = functionTable;



var app = new Vue ({
  el:'#app',
	data: functionTable,
  created:function(){
    //  this.newDB=this.DB;
  },
  mounted:function(){
    // $(document).disableSelection();
    $( '#sortableRow' ).sortable({
      revert: true,
      axis:"y",
      cursor: 'pointer',  
      // cancel:'#nodrag',
      stop:function(){
        var arr=$("#sortableRow").sortable('toArray');
        console.log(arr);
        localStorage.arr=arr;
        var localSt=localStorage.arr;
        if(localSt){
          var resArr = localSt.split(',');
          console.log(resArr);
        }
        var resUl = $('tbody');
        for(var i = 0;i < resArr.length;i++  ){
          resUl.append($("#"+resArr[i]));
        }
      }
    });

  },
  computed:{
      repeat(){
     
        this.sortnum.filter(function(element, index, arr){
          return arr.indexOf(element) !== index;
        })
       
      }
  },
  methods:{

    changecolumn:function(){
        console.log(this.newDB);
        var $this=this;
        var i=0;

        this.sortnum.length=0;      //newDB清空
        $('.sort-key').each(function(index,item){
          $this.sortnum.push($(this).val());  //抓到新的排序
        
        });
        //檢查順序是否重複
        // var repeat = this.sortnum.filter(function(element, index, arr){
        //   return arr.indexOf(element) !== index;
        // })
      
          alert(this.repeat);
      
        this.DB.forEach(function(item,index){
          var newnum=$this.sortnum[i];
          $this.newDB[newnum]=$this.DB[i];//把新的值塞到newDB
          i++;
        });
        this.DB.length=0; //DB清空
        for(var i=0;i<this.newDB.length;i++){
          this.DB[i]=this.newDB[i];
        }

        this.$forceUpdate();
    },
    addCol:function(index){
      this.functionTable.ColTable.splice(index+1,0,'add');
      this.DB.splice(index+1,0,'')

    },
    removeCol:function(index){
      this.functionTable.ColTable.splice(index,1);
      this.DB.splice(index,1)
    },
    addRow:function(index){
      this.functionTable.RowTable.splice(index+1,0,'add');
      let obj={
        eng:'',
        chin:'',
        type:'',
        pk:'',
        logic:''
      };
      this.functionData.splice(index+1,0,obj);

    },
    removeRow:function(index){
      this.functionTable.RowTable.splice(index,1);
      this.functionData.splice(index,1);
    }
  }
});



export default {
  name:'functionTable'
}
</script>

<style>

</style>
