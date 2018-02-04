<template>
    <el-form ref="form" :model="studio" label-width="100px">
        <el-form-item label="影院名称：">
            <el-input v-model="studio.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="影院地址：">
            <el-input v-model="studio.address" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button v-if="this.studio.name || this.studio.address" @click="toTheater">添加放映厅</el-button>
            <el-button v-else disabled>添加放映厅</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import{mapActions} from "vuex";
    export default {
        name: "studio",
        data() {
            return {
                studio: {
                    name: "万达影城",
                    address: "文化宫",
                }
            };
        },
        methods: {
            ...mapActions("studioStore",["addStudio"]),
            save(){
                this.$store.dispatch({
                    type:"studioStore/addStudio",
                    name:this.studio.name,
                    address:this.studio.address
                })
                this.$notify({
                    title: '成功',
                    message: '添加影院成功',
                    type: 'success'
                });
                this.studio.name="";
                this.studio.address="";
                // const { _id } = await this.studio.addStudio();
            },
            reset() {
                this.studio.name = "";
                this.studio.address = "";
            },
            toTheater() {
                this.$router.push({path:`/info/addTheater${studioId}=${_id}`})
            }
        }
    };
</script>