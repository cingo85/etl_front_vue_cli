<template>
    <div>
        <div class="row">
            <div class="col-lg-1">
                <button @click="goback()">回上一層</button>
            </div>
            <div class="col-lg-1">大表英文名稱</div>
            <div class="col-lg-1">大表中文名稱</div>
            <div class="col-lg-1">
                增加資料源
                <select @change="onSelectDataSource($event)">
                    <option value disabled selected="selected">--請選擇--</option>
                    <option
                            v-for="item in DataSource"
                            :value="item.datasourceId"
                    >{{item.datasourceName}}
                    </option>
                </select>
            </div>
            <div class="col-lg-1">
                增加表單
                <select @change="onSelectTable($event)">
                    <option selected="selected">--請選擇--</option>
                    <option
                            v-for="item in OptionValue"
                            :value="item.tableId+'.'+item.tableCname"
                    >{{item.tableCname}}
                    </option>
                </select>
            </div>
            <div class="col-lg-1">
                串接方式
                <select @change="onSelectString($event)">
                    <option value disabled selected>--請選擇--</option>
                    <option value="PK">PK</option>
                    <option value="NPK">NPK</option>
                </select>
            </div>

            <div class="col-lg-1">
                <button id="addRow" @click="addRow()">增加列數</button>
            </div>
            <div class="col-lg-1">
                <button id="pushVersion" @click="pushInColumnMaster()">發行版本</button>
            </div>
            <div class="col-lg-1">
                暫無使用
            </div>
            <div class="col-lg-1">
                暫無使用
            </div>
            <div class="col-lg-1">
                暫無使用
            </div>
            <div class="col-lg-1">
                暫無使用
            </div>
        </div>
        <table class="table">
            <thead class="thead-dark">
            <draggable v-model="headers" tag="tr">
                <th v-for="header in headers" scope="col">
                    <button @click="fix(header)">+</button>
                    {{ header }}
                </th>
            </draggable>
            </thead>
            <draggable v-model="list" tag="tbody">
                <tr v-for="(item,index) in list" :key="item.name">
                    <td v-for="header in headers" :key="header">
                        <input
                                v-if="header==='ColumnEng' || header==='ColumnChi' || header==='ColumnType'  || header === 'TableLogic'"
                                @click="change(item[header])" v-model="item[header]"></input>
                        <select v-if="header === 'PrimaryKey'">
                            <option value disabled selected>--請選擇--</option>
                            <option value="PK">PK</option>
                            <option value="NPK">NPK</option>
                        </select>
                        <!--                        :key="itemMaster.tableValue"-->
                        <div v-for="itemMaster in Column" v-if="header === itemMaster.tableName"
                             style="background-color:#89ff9e">
                            <select v-model="item[header]" @change="tableSearch($event)">
                                <option value disabled selected>--請選擇--</option>
                                <option v-for="itemdetail in itemMaster.tableValue"
                                        :value="itemdetail.columnName"
                                        :key="itemdetail.columnId"
                                >{{itemdetail.columnName}}
                                </option>
                            </select>
                            <!--                            <button @click="addLogic(itemMaster.columnId)">+</button>-->
                        </div>
                    </td>
                </tr>
            </draggable>
        </table>
    </div>
</template>
<script>
    import draggable from "vuedraggable";
    import {
        apiQueryDataBaseByprojectId,
        apiQueryColumnMasterByTableId,
        apiQueryTableMasterByProjectId,
        apiQueryTableMasterByDatasourceId
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
                list: [],
                dragging: false,
                SourceTableMaster: "",
                ReadOnly: true,
                OptionValue: "",
                pkDataSourceId: ""
            };
        },
        created: function () {
            apiQueryDataBaseByprojectId({
                projectId: this.projectId
            })
                .then(res => {
                    this.DataSource = res.data;
                })
                .catch(err => {

                });
            apiQueryTableMasterByProjectId({
                projectId: this.projectId
            })
                .then(res => {

                })
                .catch(err => {

                });
            this.$store.dispatch("loadingOneTableMaster", this.$route.query.tableId);
            // let objtemp = this.$store.state.FunctionTable_module.tableMaster;
        },
        mounted: function () {

        },
        watch: {

        },
        computed: {},
        methods: {
            goback() {
                this.$router.history.go(-1);
            },
            removeCol: function (index) {
                this.ColTable.splice(index, 1);
            },
            /*
             * 增加&移除欄位
             */
            addRow: function () {
                const uuidv4 = require("uuid/v4");
                var column_id_UUID = uuidv4();
                var obj = {
                    column_id: column_id_UUID,
                    tableId:this.tableId
                };
                this.headers.forEach(function (element) {
                    obj[element] = "";
                });
                this.list.push(obj);
            },
            removeRow: function (index) {
                this.RowTable.splice(index, 1);
            },
            /*
             *小J新加 超幹酷炫屌炸天(使用下拉選單增加表單)
             */
            /*
             * 選擇資料源
             */
            async onSelectDataSource(event) {
                let DataSourceId = event.target.value;
                await apiQueryTableMasterByDatasourceId(DataSourceId).then(res => {
                    let tId = this.tableId;
                    let SourceTableMaster = new Array();
                    let OptionValue = new Array();
                    res.data.forEach(function (element) {
                        if (element.tableId != tId) {
                            OptionValue.push(element);
                        } else {
                            SourceTableMaster.push(element);
                        }
                    });
                    this.SourceTableMaster = SourceTableMaster;
                    this.OptionValue = OptionValue;
                })
            },


            /*
             * 選擇表單
             */
           onSelectTable(event) {
                let DataSourceId = event.target.value;
                this.pkDataSourceId = DataSourceId;
            },

            /*
             * 選擇串接鍵
             */
            async onSelectString(event) {
                let pkString = event.target.value;
                let checkpoint = true
                let strArr =  this.pkDataSourceId.split(".");


                this.headers.forEach(function (element) {
                    if (element.match(strArr[1])) {
                        checkpoint = false
                    }
                })
                if (checkpoint) {
                    this.headers.push(strArr[1]);
                    this.list.forEach(function (element) {
                        element["" + strArr[1] + ""] = "";
                    });
                    await apiQueryColumnMasterByTableId(this.pkDataSourceId)
                        .then(res => {
                            let obj = {
                                tableName: strArr[1],
                                tableValue: res.data
                            }
                            this.Column.push(obj);
                        })
                        .catch(err => {
                        });

                } else {
                    alert("此表單已存在");
                }
            },
            tableSearch: function (event) {

            },
            pushInColumnMaster:function(){
                let temparr = this.tableMaster.tableMaster;
                temparr.headerSeq = this.headers;
                temparr.t_column_master = this.list;
                console.log(temparr)
                // temparr.map(val=>{
                //     console.log(val);
                // })

            },


            /*
             * 鍵盤事件 Ctrl選取欄位
             */
            dosomething: function (index) {
                alert("click:" + index)
            },
            /*
             *畫面控制選項
             */

            /*
             * 加入邏輯
             */
            addLogic: function (index) {
                alert("logic:" + index)
            },
            fix: function (header) {

                alert("hearder:" + header);
            }
        }
    };
</script>

<style>
</style>
