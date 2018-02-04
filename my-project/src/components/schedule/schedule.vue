<template>
   <div>
       <label>电影</label>
        <el-select v-model="movieValue" placeholder="选择电影">
           <el-option 
           v-for="item in rows"
           :key="item._id"
           :label ="item.cName"
           :value ="item.eName"
            ></el-option>
        </el-select>
   </div>
</template> 
<script>
import { mapState, mapMutations, mapGetters } from"vuex"
export default {
     data() {
      return {
        movieValue:"",
        studioValue:"",
        theaterValue:"",
        dataValue:"",
        priceValue:"",
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    },
    methods:{
        getMovie() {
            this.$store.dispatch({
                type:"movies/getMovie"
            })
        }
    },
    computed:{
        ...mapState("scheduleStore",["rows","studio","theater"])
    },
    created(){
        this.$store.dispatch({
                type:"scheduleStore/getMovie"
            })
    }
};
</script>
<style>
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
  
  .data-div {
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
  }
  
  .confirmBtn {
    margin-left: 23px;
  }
  
 
  
  .seatDiv {
    display: flex;
  }
  
  .row {
    height: 42px;
    background: #E8E8E8;
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