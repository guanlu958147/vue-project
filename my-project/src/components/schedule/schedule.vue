<template>
   <div class="filmScheduleInformation-container"> 
      <el-row>
        <div class="grid-content select-row">



          <!--*********************** 选择影院 ***********************-->
          <div>
            <label>电影:</label>
                <el-select v-model="movieValue" @change="editMoviesState" placeholder="选择电影">
                  <el-option 
                  v-for="item in movies.rows"
                  :label ="item.cName"
                  :value ="item._id"
                  :key="item._id">{{item.cName}}</el-option>
                </el-select>
              </div>



          <!--************************** 选择影院 *****************************-->
              <div>
                <label>影院:</label>
                    <el-select v-model="studioValue" placeholder="选择影院">
                       <el-option 
                        v-for="item in studio.rows"
                        :label="item.name"
                        :value="item._id"
                        :key ="item._id"
                       >
                      <span @click="handleClick(item._id)">{{item.name}}</span>     
                  </el-option>    
                   </el-select>
              </div>



          <!--***************************** 选择影厅 ********************************** -->
              <div>
                <label>影厅:</label>
                    <el-select v-model="theaterValue" placeholder="选择影厅">
                       <el-option 
                         v-for="item in theaters.data"
                         :label ="item.name"
                         :value="item._id"
                         :key="item._id"
                         > {{item.name}} </el-option>    
                   </el-select>
              </div>
          
          </div>
          </el-row>
          <el-row>
              <div class="grid-content data-row">



                 <!-- ********************************选择日期时间 **************************************** -->
                 <div class="block">
                    <label>时间:</label>
                    <el-date-picker v-model="dataValue"
                     type="datetime"
                   
                      placeholder="选择日期时间"></el-date-picker>
                 </div>



                 <!--**********************************填写价格****************************************  -->
            
                  <label class="price-label">票价:</label>
                    <div style="margin-right:0px"> 
                      <el-input class="price-div" placeholder="请填写价格" v-model="priceValue" ></el-input>
                  </div>




                 <!--***************************************确认排片  *************************************** -->
                 <div>
                    <el-button class="confirmBtn" @click="clickConfirmBtn" type="primary">确认排片<i class="el-icon-upload2 el-icon--right"></i></el-button>
                    <el-button class="inquireBtn" @click="clickInquireBtn" type="primary" >查询<i class="el-icon-search el-icon-right"></i></el-button>
                 </div>
              </div>
          </el-row>
           


            <!-- ******************************************* 排片列表*********************************** -->

          <el-row>
              <label><h1>影院</h1></label>
              <el-table
                  :data="theatersList.rows"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="影院名称"
                    width="360">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    width="360">
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                         <el-button 
                         size="mini"
                        type="danger"
                        @click="studioClick(scope.$index, scope.row)"
                         >查看放映厅</el-button>
                      </template>
                  </el-table-column>
                </el-table>
          </el-row>
         <el-row>
            <label><h1>影厅</h1></label>
            <el-table
                  :data= "theaters.data"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="影厅名称"
                    width="360">
                  </el-table-column>
                  <el-table-column
                    prop="seats.length"
                    label="总座位数"
                    >
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                         <el-button 
                         size="mini"
                        type="danger"
                        @click="scheduleClick(scope.row)"
                         >查看时间</el-button>
                      </template>
                  </el-table-column>
            </el-table>
          </el-row>   
   </div>
</template> 
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  //初始化数据
  data() {
    return {
      movieValue: "",
      studioValue: "",
      theaterValue: "",
      dataValue: "",
      priceValue: "",
      movieId:"",
      // pickerOptions0: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 8.64e7;
      //   }
      // }
      
      

    };
  },
  //刷新视图
  computed: {
    //展开初始化的数据
    ...mapState("scheduleStore", [
      "movies",
      "studio",
      "theaters",
       "curPage",
       "eachPae",
       "total",
       "rows",
       "theatersList",
       "studiosList"
     
     ])
  },



  created() {
    //获取电影的方法
    this.$store.dispatch({
      type: "scheduleStore/getMoviesByPage"
    });


    //获取影院的方法
    this.$store.dispatch({
      type:"scheduleStore/getStudiosByPage"
    })
  },



  //获取后面异步方法
  methods: {
    ...mapActions("scheduleStore", [
      "getMoviesByPage",//获取所有电影
      "getStudiosByPage",//获取所有影院
      "getTheatersByStudioId",//获取所有影厅
      "addSchedule", // 存储排片信息
      "getStudiosByMovieId"//查询按钮，排片的所有信息
  
      ]),
     //获取movieID
     editMoviesState(value){
          this.movieId = value 
     },


     //获取影厅的方法
   handleClick(_id){
    //  console.log(_id)
      this.$store.dispatch({
        type:"scheduleStore/getTheatersByStudioId",
        studioId:_id
      })
    },

//  
    //确认排片按钮
    clickConfirmBtn(){
         this.$store.dispatch({
            type:"scheduleStore/addSchedule",
            movieId : this.movieValue,
            studioId : this.studioValue,
            theateriD : this.theaterValue,
            showId :moment(new Date(this.dataValue)).format("YYYY-MM-DD HH:mm"),
            price : this.priceValue
       })
       this.$message({
         message: '排片成功',
         type: 'success',
         duration:1000,
         showClose:"true"
       })  
    },


    //查询按钮
    clickInquireBtn() {
       this.$store.dispatch({
         //获取排了片影院的列表      
         type:"scheduleStore/getStudiosByMovieId" ,
         movieId:this.movieValue
       })
        this.$message({
         message:"正在查询",
         duration:1000,
         showClose:"true"
       })
    },


   //查看放映厅
     studioClick(index,{_id}) {
       this.$store.dispatch({
          type:"scheduleStore/getTheatersByStudioIdList",
          studioId:_id
       })
     },



     //查看时间
     scheduleClick(row){
      console.log(row)
        this.$router.push({
          path:`/info/scheduleList/${row._id}`
        })
     }
  }
};
</script>
<style>
.price-div {
  width: 215px;
  height: 32px;
  margin-left: 5px;
}
.filmScheduleInformation-container {
  padding: 15px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.select-row {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.select-row > div {
  flex-grow: 1;
}

.data-row {
  display: flex;
  margin-bottom: 15px;
}

.block {
  margin-right: 71px;
}

.pagination-div {
  width: 600px;
  margin: auto;
  text-align: center;
}

.el-pagination {
  margin: 15px 0;
}

.price-label {
  margin-top: 5px;
  margin-left: 24px;
}

.confirmBtn {
  margin-left: 23px;
}

.seatDiv {
  display: flex;
}

.row {
  height: 42px;
  background: #e8e8e8;
  width: 30px;
  line-height: 42px;
  text-align: center;
}

.row-div {
  margin-right: 15px;
}

.returnMovieListBtn {
  float: right;
  margin-top: 15px;
}
</style>