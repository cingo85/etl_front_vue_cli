<template>
  <div class="wrapper wrapper-content">
    <div class="row">
      <div class="col-lg-12">
        <div class="ibox">
          <div class="ibox-title">
            <h2>專案清單</h2>
            <a data-toggle="modal" class="btn btn-primary" href="#modal-form">新增</a>
          </div>
          <div class="ibox-content">
            <input
              type="text"
              class="form-control form-control-sm m-b-xs"
              id="filter"
              placeholder="Search in table"
            />

            <table class="footable table table-stripped" data-page-size="8" data-filter="#filter">
              <thead>
                <tr>
                  <th>專案名稱</th>
                  <th>客戶名稱</th>
                  <th>建立日期</th>
                  <th>建立人員</th>
                  <th>最後修改日期</th>
                  <th>最後修改人員</th>
                  <th>保固日期</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item of this.$store.state.IndexPage_module.projectData">
                  <td v-if="!(item.isClose)" @click="query(item.projectId)">{{item.projectName}}</td>
                  <td v-if="!(item.isClose)">{{item.customerName}}</td>
                  <td v-if="!(item.isClose)">{{item.projectCreateDate}}</td>
                  <td class="center" v-if="!(item.isClose)">{{item.projectCreaterId}}</td>
                  <td class="center" v-if="!(item.isClose)">{{item.projectLastModifyDate}}</td>
                  <td class="center" v-if="!(item.isClose)">{{item.projectLastModifyId}}</td>
                  <td class="center" v-if="!(item.isClose)">{{item.warrDate}}</td>
                  <td
                    class="center fas fa-trash-alt"
                    @click="remove(item.sn)"
                    v-if="!(item.isClose)"
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiQueryAllproject, apiCloseProject } from "../../api";
import VuexStore from "../../store";
export default {
  name: "indexPage",
  data() {
    return {
      projectId: this.$store.state.projectId,
      changeType: "Insert"
    };
  },
  created: function() {
    //單純axios方法
    //apiQueryAllproject().then(res => {
    //  this.projectData = res.data;
    // });

    //呼叫store內部方法
    this.$store.dispatch("initStore");
  },
  methods: {
    remove: function(sn) {
      apiCloseProject({
        sn: sn
      });
    },
    query(projectId) {
      this.$router.push({
        name: "projectPage",
        query: { projectId: projectId }
      });
    }
  }
};
</script>

<style>
</style>
