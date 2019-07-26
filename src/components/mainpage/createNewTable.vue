<template>
  <div id="modal-table-form" class="modal fade" aria-hidden="true" tabindex="-1" role="dialog">
    <div class="modal-dialog" style="text-align: center;margin-left: 650px;margin-top: 150px">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="m-t-none m-b">建立新表單</h3>
        </div>

        <div class="modal-body">
          <form xclass="form-inline">
            <div style="margin: 5px" class="form-inline">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="staticEmail2">表單英文名稱</label>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword2" class="sr-only"></label>
                  <input size="23" type="text" class="form-control" id="inputPassword2" />
                </div>
              </div>
            </div>
            <div style="margin: 5px" class="form-inline">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="staticEmail2">表單中文名稱</label>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword2" class="sr-only"></label>
                  <input size="23" type="text" class="form-control" id="inputPassword2" />
                </div>
              </div>
            </div>
            <div style="margin: 5px" class="form-inline">
              <div class="form-group col-md-2">
                <label for="staticEmail2">備註</label>
              </div>
              <div class="form-group col-md-10">
                <label for="inputPassword2" class="sr-only">Password</label>
                <textarea
                  class="form-control rounded-0"
                  style="margin-left: 100px"
                  id="exampleFormControlTextarea2"
                  rows="2"
                  cols="100"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">確定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "createNewTable"
};
</script>

<style>
</style>
