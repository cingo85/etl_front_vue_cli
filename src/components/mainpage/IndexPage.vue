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
                <tr class="gradeX">
                  <td>嘉義大學-第三期</td>
                  <td>嘉義大學</td>
                  <td>2019/3/5</td>
                  <td class="center">Kate</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">Kate</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">垃圾桶</td>
                </tr>
                <tr class="gradeC">
                  <td>台灣首府大學</td>
                  <td>台灣首府大學</td>
                  <td>2019/3/5</td>
                  <td class="center">Kate</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">Kate</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">垃圾桶</td>
                </tr>
                <tr class="gradeA">
                  <td>國立高雄大學</td>
                  <td>國立高雄大學</td>
                  <td>2019/3/5</td>
                  <td class="center">Winni</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">Winni</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">垃圾桶</td>
                </tr>
                <tr>
                  <td>交通大學</td>
                  <td>交通大學</td>
                  <td>2019/3/5</td>
                  <td class="center">Kate</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">Kate</td>
                  <td class="center">2019/3/11</td>
                  <td class="center">垃圾桶</td>
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
import { apiQueryAllproject } from "../../api";

export default {
  name: "indexPage",
  data: {
    projectForm: "Insert"
  },
  created: {},
  methods: {},
  mounted: function() {
    apiQueryAllproject().then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
</style>
