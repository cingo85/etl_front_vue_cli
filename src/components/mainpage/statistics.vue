<template>
  <div class="wrapper wrapper-content">
    <div class="row">
      <div class="col-lg-12">
        <div class="ibox">
          <div class="ibox-title">
            <div class="row">
              <div class="col-lg-6">
                <h2>嘉義大學第三期統計表(專案名變數)</h2>
              </div>
              <div class="col-lg-6">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin-left: 850px"
                  onclick="location.href='./projectPage'"
                >回專案清單</button>
              </div>
            </div>
          </div>

          <div class="ibox-content">
            <div class="row">
              <h2>資料統計表</h2>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <button type="button" class="btn btn-primary">匯入CSV</button>
                <button type="button" class="btn btn-primary">匯出</button>
              </div>
            </div>
            <div style="margin: 5px"></div>
            <table class="footable table" data-filter="#filter">
              <thead>
                <tr>
                  <th>資料原</th>
                  <th>資料庫</th>
                  <th>表單</th>
                  <th>資料筆數</th>
                  <th>欄位數量</th>
                  <th>是否串接</th>
                  <th>資料描述</th>
                  <th>未串接原因</th>
                  <th>備註</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>嘉義大學-第三期</td>
                  <td>嘉義大學</td>
                </tr>
                <tr>
                  <td>台灣首府大學</td>
                  <td>台灣首府大學</td>
                </tr>
                <tr>
                  <td>國立高雄大學</td>
                  <td>國立高雄大學</td>
                </tr>
                <tr>
                  <td>交通大學</td>
                  <td>交通大學</td>
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
import Vue from "vue";
import $ from "jquery";

export default {
  name: "statistics"
};
</script>

<style>
</style>
