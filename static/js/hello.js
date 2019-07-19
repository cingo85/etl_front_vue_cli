let vueData={
  functionTable:{
    ColTable:['default','default','default','default','default','default','default'],
    RowTable:['default','default','default'],
  },
  DB:[
      {
        DBname:'DB0',
        TableName:'學生基本資料0'
      },
      {
        DBname:'DB1',
        TableName:'學生基本資料1'
      },
      {
        DBname:'DB2',
        TableName:'學生基本資料2'
      },
      {
        DBname:'DB3',
        TableName:'學生基本資料3'
      },
      {
        DBname:'DB4',
        TableName:'學生基本資料4'
      },
      {
        DBname:'DB5',
        TableName:'學生基本資料5'
      },
      {
        DBname:'DB6',
        TableName:'學生基本資料6'
      },
      {
        DBname:'DB7',
        TableName:'學生基本資料1'
      }
    ],
  newDB:[],
  sortnum:[],
  functionData:[

     {
        eng:'1',
        chin:'姓名',
        type:'String',
        pk:'yes',
        logic:'nothing1'
      },
      {
        eng:'2',
        chin:'姓名',
        type:'String',
        pk:'yes',
        logic:'nothing2'
      },
      {
        eng:'3',
        chin:'姓名',
        type:'String',
        pk:'yes',
        logic:'nothing2'
      }
  ]
 
}
var app = new Vue ({
  el:'#app',
	data: vueData,
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