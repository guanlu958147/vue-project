<template>
    <div>
      <h2>增加放映厅</h2>
      <el-form style="width:400px" :label-position="labelPosition" label-width="100px">
        <el-form-item label="放映厅名称">
            <el-input v-model="name" ref="name"></el-input>
        </el-form-item>
        <el-form-item label="行">
            <el-input v-model="rowNo" ref="rowNo"></el-input>
        </el-form-item>
        <el-form-item label="列">
            <el-input v-model="colNo" ref="colNo"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm" icon="el-icon-success">保存</el-button>
            <el-button type="danger" @click="resetForm" icon="el-icon-error">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
  name: "addTheater",
  data() {
    return {
      labelPosition: "center",
      name: "万达1",
      rowNo: 5,
      colNo: 6,
      studioId: ""
    };
  },
  methods: {
    submitForm() {
      //保存
      this.$store.dispatch({
        type: "theaterStore/addTheater",
        name: this.$refs.name.value,
        rowNo: this.$refs.rowNo.value,
        colNo: this.$refs.colNo.value,
        studioId: this.$route.params.studioId || "5a781f237d089e108073d9e8"
      });
      this.$message({
        type: "success",
        showClose: true,
        message: "添加成功!"
      });
    },
    resetForm() {
      //重置
      this.name = "";
      this.rowNo = "";
      this.colNo = "";
    }
  }
};
</script>
