<template>
    <div class="manualPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p>健康讲堂</p>   
        </header>
        <div class="list" v-for="item in tableData" :key="item.id">
            <div class="left"  @click="lookPDF(item)">
                <img :src="item.poster"  v-if="!item.type" alt="" srcset="">
                <h4 v-if="item.type">{{item.title}}</h4>
                <video class="video-show" :src="item.poster" v-if="!item.type"></video>
                <div class="arr"  v-if="!item.type"><span></span></div>
            </div>
            <div class="right">
                <button v-if="item.type" @click="lookPDF(item)">查看资料</button>
                <h4 v-if="!item.type">{{item.title}}</h4>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'manual',
    data(){
        return{
            tableData:[]
        }
    },
    mounted(){
        this.getInitList();
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },

        getInitList(){
            let that = this;
            that.axios.get('/huanjiaolist')
            .then(function (res) {
                console.log(res);
                if(res.status == 200){
                    if(res.data && res.data.data){
                        res.data.data.forEach(element => {
                            if(element.url.indexOf('.pdf') !=-1){
                                element.type = true;
                            }else{
                                element.type = false;
                            }
                        });
                        that.tableData = res.data.data;
                    }else{
                    that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message({
                        message: '服务异常请稍后重试！',
                        type: 'warning'
                    });
                }
            })
        },
        
        //查看患教手册
        lookPDF(row){
            console.log(row);
            //window.location.href = url;
            let that = this;
            let promise = {
                id:row.id,
                mobile:'13516287185'
            };
            that.axios.post('/huanjiaoview',promise)
            .then(function (res) {
                console.log(res);
                if(res.status == 200){
                    if(res.data && res.data.s){
                        window.location.href = row.url;
                    }else{
                    that.$message.error(res.data.msg);
                    }
                }else{
                    that.$message({
                        message: '服务异常请稍后重试！',
                        type: 'warning'
                    });
                }
            })
        },
    }
}
</script>
<style scoped>
.manualPage{
    width: 100%;
    min-height: 100%;
    background-size: 100% 100%;
    background-color: #e4f2f2;
    padding-bottom: 6vw;
}
.manualPage header{
    width: 100%;
    height: 108px;
    background: #4eb7ba;
    line-height: 108px;
    color: #fff;
    text-align: center;
    margin-bottom: 60px;
    margin-top: -40px;
}
.manualPage header p{
    font-size: 32px;
    padding-right: 60px;
    box-sizing: border-box;
}
.manualPage header span{
    float: left;
    font-size: 42px;
    margin-top: 35px;
    font-weight: 900;
    margin-left: 30px;
    cursor: pointer;
}

.manualPage .list h4{
    font-size: 30px;
    line-height: 1.5;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    color: #6e6e6e;
    -webkit-box-orient: vertical;
    margin-top: 20px;
    text-align: left;
}
.manualPage .list p{
    font-size: 26px;
    color: #4eb7ba;
    margin-top: 40px;
}
.manualPage .list{
    display: grid;
    grid-template-columns: 40% 60%;
    width: 60%;
    margin: 0 auto;
    padding: 0px 30px;
    box-sizing: border-box;
    margin-top: 100px;
}
.manualPage .list .left img{
    width: 100px;
}
.manualPage .list div{
    flex: 1;
    text-align: center;
}
.manualPage .list .left{
    vertical-align: middle;
    text-align: left;
    position: relative;
}
.manualPage .list .right button{
    width: 207px;
    height: 60px;
    line-height: 50px;
    text-align: center;
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 2px;
    background: #4eb7ba;
    border: 5px solid #f6fffe;
    border: 5px solid #ffffff;
    border-radius: 20px;
    box-shadow: 5px 5px 9px 1px #012e1b; 
    margin-top: 40px;
}
.manualPage .list .left .arr{
    width: 90px;
    height: 90px;
    border-radius: 100%;
    position: absolute;
    top: 5px;
    left: 65px;
    border: 3px solid #fff;
    cursor: pointer;
}
.manualPage .list .left .arr span{
    position: absolute;
    top: 30px;
    left: 18px;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid #fff;
    transform: rotate(90deg);
}
.video-show{
    width: 8vw;
    height: 8vw;
    margin-top: -2vw;
}
</style>