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
                  <th data-hide="phone,tablet">建立日期</th>
                  <th data-hide="phone,tablet">建立人員</th>
                  <th data-hide="phone,tablet">最後修改日期</th>
                  <th>最後修改人員</th>
                  <th>保固日期</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr class="gradeX" v-for="(item,index) in projectData">
                  <td v-if="!(item.is_close)">{{item.project_name}}</td>
                  <td v-if="!(item.is_close)">{{item.customer_name}}</td>
                  <td v-if="!(item.is_close)">{{item.project_create_date}}</td>
                  <td class="center" v-if="!(item.is_close)">{{item.project_creater_id}}</td>
                  <td class="center" v-if="!(item.is_close)">{{item.project_last_modify_date}}</td>
                  <td class="center" v-if="!(item.is_close)">{{item.project_last_modify_id}}</td>
                  <td class="center" v-if="!(item.is_close)">{{item.warr_date}}</td>
                  <td
                    class="center fas fa-trash-alt"
                    @click="remove(item.sn)"
                    v-if="!(item.is_close)"
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

export default {
  name: "indexPage",
  data() {
    return {
      projectData: "",
      sn: ""
    };
  },
  created: function() {
    apiQueryAllproject().then(res => {
      this.projectData = res.data;
    });
  },
  methods: {
    remove: function(index) {
      console.log(index);
      apiCloseProject({
        sn: index
      });
      apiQueryAllproject().then(res => {
        this.projectData = res.data;
      });
    }
  }
};
</script>

<style>
</style>
