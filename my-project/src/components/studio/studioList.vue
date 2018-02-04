<template>
    <div>
        <el-table
        :data="rows"
        border
        style="width: 50%">
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
                width="150px">
                <template slot-scope="scope">
                    <el-button size="small" @click="update">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=this.curPage
                :page-sizes="[10, 20, 30, 40]"
                :page-size=this.eachPage
                layout="total, sizes, prev, pager, next, jumper"
                :total=this.total>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from "vuex";
    export default {
        name: "studioList",
        computed: {
            ...mapState("studioStore",["curPage", "eachPage", "rows", "total"]),
            maxPage() {
                return Math.ceil(this.total / this.eachPage)
            }
        },
        watch: {
            curPage(val) {
                this.$store.dispatch({
                    type: "studioStore/getStudiosByPageAsync"
                })
            },
            eachPage(val) {
                this.$store.dispatch({
                    type: "studioStore/getStudiosByPageAsync"
                })
            }
        },
        created() {
            this.$store.dispatch({
                type: "studioStore/getStudiosByPageAsync"
            })
        },
        methods: {
            getEmpsByPageAsync: function(){     //获取数据
                this.$store.dispatch({
                        type:"studioStore/getStudiosByPageAsync"
                });
            },
            ...mapMutations("studioStore",["setCurPage","setEachPage"]),
            
            handleCurrentChange(val) {
               this.setCurPage({
                   curPage:val
               });
            },
            handleSizeChange(val) {
                this.setEachPage({
                    eachPage:val
                });
            },
            update(){
                console.log("update")
            },
            del(a,b){
                
            }
        }
    };
</script>