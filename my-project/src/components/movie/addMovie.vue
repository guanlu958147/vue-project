<template>
   <div>
       <h2>添加电影</h2>
        <el-form label-width="80px" size="small" >
            <el-form-item label="中文名称"  name="cName"  style="width:700px">
                <el-input  v-model="cName" ref="cName"></el-input>
            </el-form-item>
            <el-form-item label="英文名称" name="eName" style="width:700px">
                <el-input v-model="eName"  ref="eName"></el-input>
            </el-form-item>
            <el-form-item label="影片类型"  name="type" style="width:700px">
                <el-input v-model="type"  ref="type"></el-input>
            </el-form-item>
            <el-form-item label="制片国家"  name="country" style="width:700px">
                <el-input v-model="country"  ref="country"></el-input>
            </el-form-item>
            <el-form-item label="片长" name="duration" style="width:700px">
                <el-input v-model="duration"  ref="duration"></el-input>
            </el-form-item>
            <el-form-item label="上映时间" name="release" style="width:700px">
                <el-input v-model="release" ref="release"></el-input>
            </el-form-item>
            <el-form-item label="评分" name="average" style="width:700px">
                <el-input v-model="average" ref="average"></el-input>
            </el-form-item>
            <el-form-item label="星星" name="stars" style="width:700px">
                <el-input v-model="stars" ref="stars"></el-input>
            </el-form-item>
            <el-form-item label="电影状态" name="state" style="width:700px">
                <el-input v-model="state" ref="state"></el-input>
            </el-form-item>
            <el-form-item label="剧情简介" name="synopsis" style="width:700px">
                <el-input
                    ref="synopsis"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="synopsis">
                </el-input>
            </el-form-item>
            <el-form-item>
                <template slot-scope="scope">
                    <el-button type="primary"  @click="create"  plain icon="el-icon-success">保存</el-button>
                    <el-button type="danger" @click="resetBtn" plain icon="el-icon-error">重置</el-button>
                    <el-button  :disabled="isDisabled" @click="handelUpload" plain>上传</el-button>
                </template>
            </el-form-item>
        </el-form>
   </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "addMovie",
  data() {
    return {
      activeIndex: "1",
      isRouter: true,
      isDisabled: true,
      cName: "正义联盟",
      eName: "Justice League",
      type: "动作,冒险,科幻",
      country: "美国",
      duration: "120分钟",
      release: "2017-11-17大陆上映",
      average:8.5,
      stars:50,
      state:"hot",
      synopsis:
        "本片讲述的是受到超人（亨利·卡维尔 饰）无私奉献的影响，蝙蝠侠（本·阿弗莱克 饰）重燃了对人类的信心，接受了新盟友神奇女侠（盖尔·加朵 饰）的帮助，去对抗更加强大的敌人。蝙蝠侠和神奇女侠一同寻找并招募了一支超人类联盟来抵挡新觉醒的威胁。但尽管这支队伍集结了超人、蝙蝠侠、神奇女侠、闪电侠（埃兹拉·米勒 饰）、海王（杰森·莫玛 饰）和钢骨（雷·费舍 饰）等人，他们似乎无法阻止敌人对地球的进攻……"
    };
  },
  computed:{
      ...mapState("movieStore",["_id"])
  },
  methods: {
    ...mapActions("movieStore", ["createMoviesAsync","getMoviesByPageAsync"]),
    create() {
      this.$store.dispatch("movieStore/createMoviesAsync", {
        cName: this.$refs.cName.value,
        eName: this.$refs.eName.value,
        type: this.$refs.type.value,
        country: this.$refs.country.value,
        duration: this.$refs.duration.value,
        release: this.$refs.release.value,
        synopsis: this.$refs.synopsis.value,
        average:this.$refs.average.value,
        stars:this.$refs.stars.value,
        state:this.$refs.state.value
      });
      this.isDisabled = false;
    },
    //重置
    resetBtn() {
      (this.cName = ""),
        (this.eName = ""),
        (this.type = ""),
        (this.country = ""),
        (this.duration = ""),
        (this.release = ""),
        (this.synopsis = "");
        (this.average = "");
        (this.stars = "");
        this.state = ""
    },
    //跳转到addImg
    handelUpload() {
      this.$router.push({
      path:`/info/addImg/${this._id}`
      })
    }
  }
};
</script>