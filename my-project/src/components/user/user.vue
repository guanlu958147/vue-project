<template>
    <div>
        <h2>用户列表</h2>
        <el-table
            :data="rows"
            border
            style="width: 620px">
            <el-table-column
                type="index"
                :index="indexMethod"
                label="序号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="password"
                label="密码"
                width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input v-model="form.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input v-model="form.password" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelUpdate()">取 消</el-button>
                            <el-button type="primary" @click="confirmUpdate()">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
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
<style>
    .block{
        margin-top:20px;
    }
</style>
<script>
    import { mapState, mapMutations, mapActions } from "vuex";
    import _ from "lodash";
    export default {
        name:"user",
        computed: {
            ...mapState("userStore",["curPage", "eachPage", "rows", "total"]),
        },
        watch: {
            curPage(value) {
                this.getUsersByPageAsync();
            },
            eachPage(value) {
                this.getUsersByPageAsync();
            }
        },
        created() {
            this.$store.dispatch({
            type: "userStore/getUsersByPageAsync"
            })
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    _id: '',
                    username: '',
                    password: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            indexMethod(index) {
                return index + 1;
             },
            getUsersByPageAsync: _.debounce(function(){
                this.$store.dispatch({
                    type:"userStore/getUsersByPageAsync"
                });
            },1000),
            ...mapMutations("userStore",["setCurPage","setEachPage"]),
            handleEdit(index, row) {
                this.dialogFormVisible = true
                this.form._id = row._id;
                this.form.username = row.username;
                this.form.password = row.password;         
            },
            handleDelete(index,row) {
                this.form._id = row._id;
                this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteUser();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$store.dispatch({
                        type:"userStore/getUsersByPageAsync"
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            },
            async DeleteUser(){
                    const data = await fetch(
                        "/api/users/delet",
                        {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "_id=" + this.form._id,
                            credentials: "include"
                        }
                    ).then(function(response){
                        return response.json();
                    })
                },
            cancelUpdate(){
                console.log("cancelUpdate")
                this.dialogFormVisible = false
            },
            confirmUpdate(){
                this.dialogFormVisible = false;
                console.log("confirmUpdate");
                this.UpdateUser();
                this.$store.dispatch({
                    type:"userStore/getUsersByPageAsync"
                });
            },
            async UpdateUser(){
                    const data = await fetch(
                        "/api/users/update",
                        {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "_id=" + this.form._id + "&username=" + this.form.username + "&password=" + this.form.password,
                            credentials: "include"
                        }
                    ).then(function(response){
                        return response.json();
                    })
                },
            handleSizeChange(val) {
                this.setEachPage({
                    eachPage: val
                })
            },
            handleCurrentChange(val) {
                this.setCurPage({
                    curPage: val
                })
            }
        }
    }
</script>