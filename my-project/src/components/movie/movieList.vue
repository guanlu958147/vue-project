<template>
    <div>
        <h2>电影列表</h2>
        <el-table
            :data="rows"
            stripe
            style="width: 100%">
            <el-table-column
            prop="cName"
            label="中文名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="eName"
            label="英文名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="type"
            width="120"
            label="影片类型">
            </el-table-column>
            <el-table-column
            prop="country"
            label="制片国家"
            width="120"
            >
            </el-table-column>
            <el-table-column
            prop="duration"
            label="片长"
            width="120"
            >
            </el-table-column>
            <el-table-column
            prop="release"
            label="上映时间"
            width="100"
            >
            </el-table-column>
            <el-table-column
            prop="synopsis"
            label="剧情简介"
            width="120"
            height="200"
            style="overflow:hidden;height:200px"
            >
            </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
            <el-popover
                ref="update"
                placement="right"
                width="400"
                trigger="click">
               <el-form label-width="80px">
                    <el-form-item label="中文名称">
                        <el-input v-model="cName" ref="cName"></el-input>
                    </el-form-item>
                    <el-form-item label="英文名称">
                        <el-input v-model="eName" ref="eName"></el-input>
                    </el-form-item>
                    <el-form-item label="影片类型">
                        <el-input v-model="type" ref="type"></el-input>
                    </el-form-item>
                    <el-form-item label="制片国家">
                        <el-input v-model="country" ref="country"></el-input>
                    </el-form-item>
                    <el-form-item label="片长">
                        <el-input v-model="duration" ref="duration"></el-input>
                    </el-form-item>
                    <el-form-item label="上映时间">
                        <el-input v-model="release" ref="release"></el-input>
                    </el-form-item>
                    <el-form-item label="剧情简介">
                        <el-input v-model="synopsis" ref="synopsis"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="creUpdata(scope.$index,scope.row)"  plain icon="el-icon-success">保存</el-button>
                        <el-button type="danger" @click="resetBtn(scope.$index,scope.row)" plain icon="el-icon-error">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-popover>
                <el-button type="primary" @click="updateBtn(scope.$index,scope.row)" v-popover:update plain icon="el-icon-edit">更新</el-button>
                <el-button type="danger" plain  @click="dele(scope.$index,scope.row)" icon="el-icon-delete">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="marginTop:30px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="eachPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import { mapState,mapMutations,mapActions } from "vuex"
    export default {
        name:"movie",
         data() {
            return {
                cName: "",
                eName: "",
                type: "",
                country: "",
                duration: "",
                release: "",
                synopsis:""
            };
    },
        computed:{
            ...mapState("movieStore",["eachPage","curPage","rows","total"])
        },
        watch:{
            curPage(value){
                this.$store.dispatch({
                    type:"movieStore/getMoviesByPageAsync"
                })
            },
            eachPage(value){
                this.$store.dispatch({
                    type:"movieStore/getMoviesByPageAsync"
                })
            }
        },
      created(){
          this.$store.dispatch({
              type:"movieStore/getMoviesByPageAsync"
          })
      },
      methods:{
           ...mapMutations("movieStore",["setCurPage","setEachPage"]),
           ...mapActions("movieStore",["deleMoviesAsync","getMoviesByPageAsync","updateMoviesAsync"]),
           //分页
           handleSizeChange(val) {
                this.setEachPage({
                    eachPage:val
                })
            },
            handleCurrentChange(val) {
                 this.setCurPage({
                    curPage:val
                })
            },
            //删除电影
            dele(index,{_id}){
                console.log(index)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$store.dispatch({
                    type:"movieStore/deleMoviesAsync",
                    _id,
                    index
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });          
                });
                
            },
            //更新按钮
            updateBtn(index,row){
                this.cName = row.cName
                this.eName= row.eName,
                this.type= row.type,
                this.country= row.country,
                this.duration= row.duration,
                this.release= row.release,
                this.synopsis = row.synopsis
            },
            //更新里的保存按钮
            creUpdata(index,{_id,cName,eName,type,duration,release,synopsis}){
                // console.log(row)
                this.$store.dispatch(
               "movieStore/updateMoviesAsync",
                {
                    _id:_id,
                    cName:this.$refs.cName.value,
                    eName:this.$refs.eName.value,
                    type:this.$refs.type.value,
                    duration:this.$refs.duration.value,
                    release:this.$refs.release.value,
                    synopsis:this.$refs.synopsis.value,
                    country:this.$refs.country.value
                }
            )
        },
        //更新里的重置按钮
        resetBtn(row){
             this.cName="",
            this.eName="",
            this.type="",
            this.country=""
            this.duration="",
            this.release="",
            this.synopsis=""
        }
      }
    }
</script>