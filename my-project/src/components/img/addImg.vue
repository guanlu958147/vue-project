<template>
<div>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-upload
    style="margin-top:20px"
    class="upload-demo"
    action="/api/imgs/getImgsByMovieId"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList2"
    list-type="picture-card">
    <el-button size="small" type="primary">上传</el-button>
  </el-upload>
  </div>
</template>
<script>
export default {
  name:"addImg",
   data() {
      return {
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        options: [{
          value: '选项1',
          label: '主页图片'
        }, {
          value: '选项2',
          label: '剧情图片'
        }],
        value: ''
      }
    },
     methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>

