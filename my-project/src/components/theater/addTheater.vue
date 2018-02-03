<template>
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
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: "addTheater",
  data() {
    return {
      labelPosition: "right",
      name:"万达1",
      rowNo:5,
      colNo:6,
      studioId:"5a755d3053540218f44331b0"
    };
  },
  methods:{
      submitForm() {//保存
        this.$store.dispatch({
            type:"theaterStore/addTheater",
            name:this.$refs.name.value,
            rowNo:this.$refs.rowNo.value,
            colNo:this.$refs.colNo.value,
            studioId:this.studioId
        }
        )
      },
      resetForm() {//重置
        this.name=""
        this.rowNo=""
        this.colNo=""
      }
  }
};
</script>
