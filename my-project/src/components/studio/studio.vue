<template>
    <el-form ref="form" :model="studio" label-width="100px">
        <el-form-item label="影院名称：">
            <el-input v-model="studio.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="影院地址：">
            <el-input v-model="studio.address" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save" icon="el-icon-success">保存</el-button>
            <el-button type="danger" @click="reset" icon="el-icon-error">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "studio",
  data() {
    return {
      studio: {
        name: "万达影城",
        address: "文化宫"
      }
    };
  },
  methods: {
    ...mapActions("studioStore", ["addStudio"]),
    save() {
      this.$store.dispatch({
        type: "studioStore/addStudio",
        name: this.studio.name,
        address: this.studio.address
      });
      this.$message({
        type: "success",
        showClose: true,
        message: "添加成功!"
      });
    },
    reset() {
      this.studio.name = "";
      this.studio.address = "";
    }
  }
};
</script>