<template>
   <div> 
      <label><h1>排片时间</h1></label>
            <el-table
                  :data="scheduleTimeList.data"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="show_time"
                    label="时间"
                    >
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                         <el-button 
                         size="mini"
                        type="danger"
                        @click="scheduleClick(scope.$index, scope.row)"
                         >下线排片</el-button>
                      </template>
                  </el-table-column>
            </el-table > 
   </div>
</template> 
<script>
  import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
  export default {
  
  name:"scheduleList",
  //刷新视图
  computed: {
    //展开初始化的数据
    ...mapState("scheduleStore", [
       "scheduleTimeList"
     ])
  },



  created() {
console.log(this.$route.params.theaterId)
    //获取排片所有信息的方法
    this.$store.dispatch({
       type:"scheduleStore/showTime",
       theaterId:this.$route.params.theaterId
    })
   
  },
  methods: {
      ...mapActions("scheduleStore", [
        "showTime"
      ]),
  }

}

</script>
