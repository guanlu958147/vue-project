<template>
  <div>
    <el-select
      v-model="value" 
      filterable
      allow-create
      default-first-option
      placeholder="请选择图片类型"
      @change="showImg"
    >
      <el-option
        v-for="item in options"
        :key="item.type"
        :label="item.label"
        :value="item.type">
      </el-option>
    </el-select>
    <el-upload
      class="upload-demo"
      action="/api/files/upload"
      :data="movieImg"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="handleUpload"
      :file-list="rows"
      list-type="picture">
      <el-button size="small" type="primary">上传</el-button>
    </el-upload>
    <div class="block">
       <el-pagination
            style="marginTop:30px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState,mapActions,mapMutations } from "vuex"
export default {
  name:"addImg",
   data() {
      return {
        movieImg:{ movieId:"", type:1},
        value:'',
        options: [{
          label: '主页图片',
          type:1
        }, {
          label: '剧情图片',
          type:0
        }],
      }
    },
    computed:{
      ...mapState("movieStore",["rows","_id","total","curPage","eachPage"]),
    },
    created(){
    },
     methods: {
       ...mapMutations("movieStore",["setCurPage","setEachPage"]),
       ...mapActions("movieStore",["getImgsByAsync"]),
       showImg(e){
        this.$store.dispatch(
        "movieStore/getImgsByAsync",
        {
          movieId:this.$route.params._id,
          type:this.value
        }
      )
      this.movieImg.movieId = this.$route.params._id;
      this.movieImg.type = this.value
        switch(this.value){
          case "1":
            // this.movieImg.type = 1;
            this.$route.dispatch(
              "movieStore/getImgsByAsync",
              {
                movieId:this.$route.params._id,
                type:1
              }
            )
            break;
          case "0":
            // this.movieImg.type = 0;
            this.$route.dispatch(
              "movieStore/getImgsByAsync",
              {
                movieId:this.$route.params._id,
                type:0
              }
            )
         }
       },
      handleRemove(file, fileList) {
        console.log(file.imgId);
        this.$store.dispatch(
          "movieStore/delImgsByAsync",
            {
              _id:file.imgId
            }
        )
        if(this.value == 1 ){
          this.$store.dispatch(
          "movieStore/getImgsByAsync",
            {
              movieId:this.$route.params._id,
              type:1
            }
          )
        }else{
           this.$store.dispatch(
          "movieStore/getImgsByAsync",
            {
              movieId:this.$route.params._id,
              type:0
            }
          )
        }
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSizeChange(val) {
        this.setEachPage({
            eachPage:val
        })
      },
      handleUpload(event, file, fileList){
        // console.log( event,file, fileList);
        file.type = this.value
      },
      handleCurrentChange(val) {
          this.setCurPage({
            curPage:val
        })
      },
    }
}
</script>

