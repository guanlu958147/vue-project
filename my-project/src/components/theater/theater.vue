<template>
  <div>
      <h2>放映厅列表</h2>
      <el-table
        :data="rows"
        stripe
        style="width: 50%">
        <el-table-column
        prop="name"
        label="放映厅名称"
        width="180">
        </el-table-column>
        <el-table-column
        prop="studioName"
        label="所属影院"
        width="180">
        </el-table-column>
        <el-table-column
        prop="seats.length"
        label="座位总数">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-popover
                    ref="popover4"
                    placement="right"
                    width="400"
                    trigger="click"
                    >
                    <el-form :label-position="labelPosition" label-width="100px">
                        <el-form-item label="放映厅名称">
                            <el-input v-model="name" ref="formName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(scope.$index, scope.row)" icon="el-icon-success">保存</el-button>
                            <el-button @click="resetForm" icon="el-icon-error" type="danger">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-popover>
                <el-button
                size="mini"
                type="primary" 
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)" v-popover:popover4>编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:20px">
    </el-pagination>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "theater",
  data() {
    return {
      name: "",
      visible: false,
      labelPosition: "right"
    };
  },
  computed: {
    ...mapState("theaterStore", ["rows", "curPage", "eachPage", "total"])
  },
  created() {
    // 初始化数据
    this.$store.dispatch({
      type: "theaterStore/getTheatersByPage"
    });
  },
  watch: {
    //监听当前页和每页显示条数的变化
    curPage(value) {
      this.$store.dispatch({
        type: "theaterStore/getTheatersByPage"
      });
    },
    eachPage(value) {
      this.$store.dispatch({
        type: "theaterStore/getTheatersByPage"
      });
    }
  },
  methods: {
    ...mapActions("theaterStore", [
      "getTheatersByPage",
      "removeTheater",
      "modifyTheater"
    ]),
    ...mapMutations("theaterStore", ["setCurPage", "setEachPage"]),
    submitForm(index, { _id, name }) {
      //保存修改
      if (name != this.$refs.formName.value) {
        //判断值有修改时才触发请求
        this.$store.dispatch({
          type: "theaterStore/modifyTheater",
          _id: _id,
          index,
          name: this.$refs.formName.value
        });
      }
    },
    resetForm(formName) {
      //重置
      this.name = "";
    },
    handleEdit(index, { name, _id }) {
      //编辑
      this.name = name;
    },
    handleDelete(index, { _id }) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除
          this.$store.dispatch({
            type: "theaterStore/removeTheater",
            theaterId: _id,
            index: index
          });
          this.$store.dispatch({
            type: "theaterStore/getTheatersByPage"
          });
          this.$message({
            type: "success",
            showClose: true,
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            showClose: true,
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      //eachPage
      this.setEachPage({
        eachPage: val
      });
    },
    handleCurrentChange(val) {
      //curPage
      this.setCurPage({
        curPage: val
      });
    }
  }
};
</script>