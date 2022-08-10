<template>
    <div class="resultPage">
        <div class="resultPage-box">
            <header>
                <p style="color:#fff">发现肺结节，担心是肺癌？</p>   
            </header>
            <div class="result-type">
                测试结果：
            </div>
            <div class="title" v-for="item in resultArr" :key="item.index">
                <button>{{item.leixing}}</button>
            </div>
            <div class="content-list" v-for="item in resultArr" :key="item.index">
                <div class="title" v-html="item.q1"></div>
                <p v-html="item.q2"></p>
                <p v-html="item.result"></p>
            </div>

            <div class="reference-box">
                <div class="reference-title">参考文献：</div>
                <p>1、根据中国肺结节专家共识指南，建议将我国肺癌高危人群定义为年龄≥40岁且具有以下任一危险因素者：（1）吸烟≥ 20包年（或400年支），或曾经吸烟≥20包年（或400 年支），戒烟时间 &lt;15 年；（2）有环境或高危职业暴露史（如石棉、铍、铀、氡等接触者（3）合并慢阻 肺、弥漫性肺纤维化或既往有肺结核病史者；（4）既往罹患恶性肿瘤或有肺癌家族史者。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            resultArr:[],
        }
    },
    mounted(){
        this.getzicelist();
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        //获取自测结果
        getzicelist(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            that.axios.post('zicelist?mobile='+mobile)
            .then(function (res) {
                console.log(res);
                if(res.status == 200 ){
                    if(res.data && res.data.data.length>0){
                        that.resultArr.push(res.data.data.pop());
                        return;
                    }
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        },
    }
}
</script>
<style scoped>
.resultPage{
    width: 100%;
    height: 100%;
    padding: 18px;
    overflow: hidden;
    box-sizing: border-box;
}
.resultPage header{
    width: 100%;
    height: 115px;
    background: #4eb7ba;
    line-height: 115px;
    color: #fff;
    text-align: center;
    
}
.resultPage header p{
    font-size: 47px;
    text-align: center;
    box-sizing: border-box;
}
.resultPage header span{
    float: left;
    font-size: 42px;
    margin-top: 18px;
    font-weight: 900;
    margin-left: 30px;
}
.resultPage-box{
    min-height: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-color: #e4f2f2;
    padding-bottom: 20px;
}
.resultPage .result-type{
    font-size: 36px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #ffffff;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(to right, #49b0b2 , #fff);
    padding-left: 26px;
    box-sizing: border-box;
    margin-top: 47px;
}
.resultPage  .title button{
    min-width: 563px;
    height: 107px;
    padding: 0 20px;
    box-sizing: border-box;
    line-height: 107px;
    text-align: center;
    font-size: 45px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 0.1rem solid #ffffff;
    border-radius: 90px;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    margin-top: 56px;
}
.resultPage .content-list{
    font-weight: 400;
    text-align: left;
    line-height: 54px;
    letter-spacing: -1px;
    padding: 0 27px;
    box-sizing: border-box;
    margin-top: 90px;
}
.resultPage .content-list .title{
    color: #221e1f;
    font-size: 30px;
    font-weight: 700;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
}
.resultPage .content-list p{
    color: #221e1f;
    text-indent: 48px;
    font-size: 30px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
}
.resultPage .reference-box{
    text-align: left;
    padding: 0 26px;
    box-sizing: border-box;
    margin-top: 100px;
}
.resultPage .reference-box p, .resultPage .reference-box div{
    font-size: 20px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    font-weight: 400;
    color: #282828;
}
</style>
