
<template>
    <el-container>
        <el-header style="background:rgb(67,74,80);color:white;line-height:100px;font-size:36px;height:100px;letter-spacing:5px;font-weight:1000">
            <div>
                <img src="../../images/avatar.png" class="logo" style="width:50px;height:50px;position:relative;top:12px">
                <span style="color:red">猫眼</span>电影
            </div>
        </el-header>
        <el-container >
            <el-aside width="200px" mode="horizontal" style="background:#545c64;height:900px" >
                <el-menu
                    :default-active="activeIndex"
                    :router="isRouter"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    >
                    <el-menu-item index="1" route="/info/user">
                        <i class="el-icon-service"></i>
                        <span slot="title" >用户管理</span>
                    </el-menu-item>
                    <el-submenu index="2" >
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>电影管理</span>
                        </template>
                        <el-menu-item index="2-1" route="/info/addMovie">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span slot="title">新增电影</span>
                        </el-menu-item>
                        <el-menu-item index="2-2" route="/info/movieList">
                            <i class="el-icon-document"></i>
                            <span slot="title">电影列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-star-off"></i>
                                <span>影院管理</span>
                            </template>
                            <el-menu-item index="3-1" route="/info/studio">
                                <i class="el-icon-circle-plus-outline"></i>
                                <span slot="title">新增影院</span>
                            </el-menu-item>
                            <el-menu-item index="3-2" route="/info/studioList">
                                <i class="el-icon-document"></i>
                                <span slot="title">影院列表</span>
                            </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <span>放映厅管理</span>
                        </template>
                        <el-menu-item index="4-1" route="/info/addTheater">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span slot="title">新增放映厅</span>
                        </el-menu-item>
                        <el-menu-item index="4-2" route="/info/theater">
                            <i class="el-icon-document"></i>
                            <span slot="title">放映厅列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-news"></i>
                            <span>排片管理</span>
                        </template>
                        <el-menu-item index="5-1" route="/info/schedule">
                            <i class="el-icon-document"></i>
                            <span slot="title">增加排片</span>
                        </el-menu-item>
                        
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      isRouter: true,
      activeIndex: "1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
    body {
        margin: 0;
    }
    .el-submenu{
        width: 200px;
    }
    .el-menu-item{
        width: 200px;
        border-bottom: rgba(0, 0, 0, 0.05) solid;
    }
    .el-main{
        background: #E9EEF3;
    }
    .el-submenu__title{
        border-bottom: rgba(0, 0, 0, 0.2) solid;
    }
    .logo{
        width:"40px";
        height:"40px";
        
    }
</style>
