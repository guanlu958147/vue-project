<template>
    <div>
        <h2>影院列表</h2>
        <el-table
        :data="rows"
        border
        style="width: 60%">
            <el-table-column
                prop="name"
                label="影院名称"
                width="150px">
            </el-table-column>
            <el-table-column
                prop="address"
                label="影院地址">
            </el-table-column>
            <el-table-column
                label="操作"
                width="300px">
                <template slot-scope="scope">
                    <el-popover
                    ref="popover4"
                    placement="right"
                    width="400"
                    trigger="click">
                        <el-form :label-position="labelPosition" label-width="100px">
                            <el-form-item label="影院名称：">
                                <el-input v-model="name" ref="formName"></el-input>
                            </el-form-item>
                            <el-form-item label="影院地址：">
                                <el-input v-model="address" ref="formAddress"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(scope.$index, scope.row)" icon="el-icon-success">保存</el-button>
                                <el-button @click="resetForm" icon="el-icon-error" type="danger">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-popover>
                    <el-button size="small" @click="update(scope.$index, scope.row)" v-popover:popover4 type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(scope.$index,scope.row)" icon="el-icon-delete">删除</el-button>
                    <el-button @click="toTheater(scope.$index,scope.row)">添加放映厅</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="curPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="eachPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "studioList",
  data() {
    return {
      name: "",
      address: "",
      visible: false,
      labelPosition: "right"
    };
  },
  computed: {
    ...mapState("studioStore", ["curPage", "eachPage", "rows", "total"]),
    maxPage() {
      return Math.ceil(this.total / this.eachPage);
    }
  },
  //监听页面
  watch: {
    curPage(value) {
      this.$store.dispatch({
        type: "studioStore/getStudiosByPage"
      });
    },
    eachPage(value) {
      this.$store.dispatch({
        type: "studioStore/getStudiosByPage"
      });
    }
  },
  //初始化数据
  created() {
    this.$store.dispatch({
      type: "studioStore/getStudiosByPage"
    });
  },
  methods: {
    ...mapActions("studioStore", [
      "getStudiosByPage",
      "delStudio",
      "changeStudio"
    ]),
    ...mapMutations("studioStore", ["setCurPage", "setEachPage"]),

    handleCurrentChange(value) {
      this.setCurPage({
        curPage: value
      });
    },
    handleSizeChange(value) {
      this.setEachPage({
        eachPage: value
      });
    },
    del(index, { _id }) {
      //删除
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "studioStore/delStudio",
            studioId: _id,
            index: index
          });
          this.$store.dispatch({
            type: "studioStore/getStudiosByPage"
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
    update(index, { name, _id, address }) {
      //编辑
      this.name = name;
      this.address = address;
    },
    submitForm(index, { _id, name, address }) {
      //保存修改
      if (
        name != this.$refs.formName.value ||
        address != this.$refs.formName.value
      ) {
        //判断值被修改时才触发请求
        this.$store.dispatch({
          type: "studioStore/changeStudio",
          _id: _id,
          index,
          name: this.$refs.formName.value,
          address: this.$refs.formAddress.value
        });
      }
    },
    resetForm(formName, formAddress) {
      //重置
      this.name = "";
      this.address = "";
    },
    toTheater(index, { _id }) {
      //增加影厅
      this._id = _id;
      this.$router.push({
        path: `/info/addTheater/${_id}`
      });
    }
  }
};
</script>