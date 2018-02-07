<template>
    <el-row class="login-conter">
        <el-col :span="8"><div style="height: 1px;"></div></el-col>
        <el-col :span="8">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item>
            <h1 class="login_titile">登录</h1>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
            <el-input class="inout" v-model="ruleForm2.username" suffix-icon="el-icon-mobile-phone" ></el-input>
            </el-form-item>
            <el-form-item  label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" suffix-icon="el-icon-edit" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item class="button" id="lhello">
            <el-button class="loginbtn" @click="login" type="primary">登录</el-button>
            <el-button class="regbtn" @click="reg" type="primary">注册</el-button>
            </el-form-item>
        </el-form>
        </el-col>
        <el-col :span="8"><div style="height: 1px;"></div></el-col>
    </el-row>
</template>


<style>
.login-conter {
  margin: 0;
  width: 100%;
  height: 950px;
  background: url("../../images/20f9bd8887517cbcacf91b0a7e7dcbb7.jpg") no-repeat
    center;
}
.login_titile {
  display: flex;
  justify-content: center;
  font-size: 60px;
  height: 80px;
  color: rgba(255, 255, 255, 0.6);
}
.button {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.loginbtn {
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-color: aqua;
  border-radius: 20px;
}
.regbtn {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  border-color: aqua;
  border-radius: 20px;
}
.el-form {
  margin-top: 40%;
}
.el-form-item__label {
  color: white;
}
.el-input__inner {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border-color: aqua;
}
.el-button + .el-button {
  margin-left: 0;
}
#lhello > div {
  width: 85%;
}
</style>
<script>
export default {
  name: "Login",
  data() {
    return {
      // username:"",
      ruleForm2: {
        password: "",
        username: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.ruleForm2.username = this.$route.params.username || "";
  },
  methods: {
    reg() {
      this.$router.push({
        name: "Reg"
      });
    },

    async login() {
      const { username, password } = this.ruleForm2;
      console.log(this.ruleForm2.username, password);
      if (username == "" || password == "") {
        alert("用户名或密码不能为空");
      } else {
        const arr = await this.getCreat();
        if (arr.length === 1) {
          this.$router.push({
            path: "/info/user"
          });
        } else {
          alert("用户名或者密码错误");
        }
      }
    },
    async getCreat() {
      const { username, password } = this.ruleForm2;
      const data = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=" + username + "&password=" + password,
        credentials: "include"
      }).then(function(response) {
        return response.json();
      });
      return data;
    }
  }
};
</script>
