
<template>
  <el-row class="reg-conter">
    <el-col :span="8"><div style="height: 1px;"></div></el-col>
    <el-col :span="8">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

     <el-form-item label="">
          <h1 class="regtitle">注册页面</h1>
        </el-form-item>
    <el-form-item label="用户名" prop="username">
        <el-input  v-model.number="ruleForm2.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="agree" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button  class="reset" @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
        </el-col>
        <el-col :span="8"><div style="height: 1px;"></div></el-col>
      </el-row>
</template>

<style>
.regtitle {
  font-size: 60px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.el-form {
  margin-top: 40%;
}
.reg-conter {
  margin: 0;
  width: 100%;
  height: 750px;
  background: url("../../images/23a1ec647e2fdbc0935c2fdcf3018860.jpg") no-repeat
    center;
}
.el-form-item__label {
  color: white;
}
.el-input__inner {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border-color: aqua;
}
.agree {
  display: inline-block;
  margin-top: 15px;
  width: 410px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  border-color: aqua;
  border-radius: 20px;
}
.reset {
  display: inline-block;
  margin-top: 15px;
  width: 410px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  border-color: aqua;
  border-radius: 20px;
  color: white;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>


<script>
export default {
  name: "reg",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { username, pass } = this.$data.ruleForm2;
          this.getCreat();
          this.$router.push({
            path: `/login/${username}`
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getCreat() {
      const { username, pass } = this.$data.ruleForm2;
      const data = await fetch("/api/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=" + username + "&password=" + pass,
        credentials: "include"
      }).then(function(response) {
        return response;
      });
    }
  }
};
</script>
