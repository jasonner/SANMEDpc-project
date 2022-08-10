<template>
    <div class="QuestionPage">
        <div class="QuestionPage-box">
            <header>
                <!-- <span class="el-icon-arrow-left" @click="goBack()"></span> -->
                <h4>发现肺结节,担心是肺癌?</h4>   
            </header>
            <div class="title">自测了解结节恶性风险</div>
            <div class="Question-list" v-for="item in QuestionArr" :key="item.index">
                <div class="Question-num"><button>{{item.QuestionNum}}</button></div>
                <div class="content-list"> 
                    <p class="Question-title">{{item.QuestionTitle}}</p>
                    <el-radio-group v-model="radio" class="Question-select-list" v-if="item.step != '8'">
                        <div class="select-list" v-if="item.step != '7' ">
                            <div class="select-list-left">
                                <img v-if="item.urlY" :src="item.urlY"/>
                                <!-- <span :class="{step6:item.step=='6'}">{{item.QuestionText1}}</span>  -->
                            </div>
                            <div class="select-list-left">
                                <img v-if="item.urlN" :src="item.urlN"/>
                                <!-- <span :class="{step6:item.step=='6'}">{{item.QuestionText2}}</span>  -->
                            </div>
                        </div> 
                         <div class="select-list" v-if="item.step != '7' ">
                            <el-radio :label="1">{{item.QuestionText1}}</el-radio>
                            <el-radio :label="2" shape="square">{{item.QuestionText2}}</el-radio>
                        </div>
                        <div class="select-list" v-if="item.step == '7'">
                            <div class="select-list-left">
                                <img  :src="item.urlY"/>
                                <!-- <span class="">{{item.QuestionText1}}</span> -->
                            </div>
                            <div class="select-list-left">
                                <img :src="item.urlN"/>
                                <!-- <span>{{item.QuestionText2}}</span>  -->
                            </div>
                        </div>
                        <div class="select-list" v-if="item.step == '7'">
                            <el-radio :label="1" shape="square">{{item.QuestionText1}}</el-radio>
                           <el-radio :label="2" shape="square">{{item.QuestionText2}}</el-radio>
                        </div>
                    </el-radio-group>
                    <el-radio-group v-model="radio" class="Question-select-list step8" v-if="item.step == '8'">
                        <div class="select-list">
                            <div class="select-list-left">
                                <img v-if="!userMan" src="@/assets/img/question/W40.png"/>
                                <img v-if="userMan" src="https://oss.sxyweb.com.cn/2021/wj/SANMED/zice/man40.png"/>
                                <span class="">{{item.QuestionText1}}</span>
                            </div>
                            <el-radio :label="1"  shape="square" >{{item.tip}}</el-radio>
                        </div>
                         <div class="select-list">
                            <div class="select-list-left">
                                <img v-if="!userMan" src="@/assets/img/question/W50.png"/>
                                <img v-if="userMan" src="https://oss.sxyweb.com.cn/2021/wj/SANMED/zice/man50.png"/>
                                <span>{{item.QuestionText2}}</span> 
                            </div>
                            <el-radio :label="2" shape="square" >{{item.tip}}</el-radio>
                        </div>
                        <div class="select-list">
                            <div class="select-list-left">
                                <img v-if="!userMan" src="@/assets/img/question/W60.png"/>
                                <img v-if="userMan" src="https://oss.sxyweb.com.cn/2021/wj/SANMED/zice/man60.png"/>
                                <span>{{item.QuestionText3}}</span> 
                            </div>
                            <el-radio :label="3" shape="square" >{{item.tip}}</el-radio>
                        </div>
                    </el-radio-group>
                </div>
                <div class="next-step">
                    <button @click="nextChange(item.step)">下一步</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            radio:'',
            userMan:true,
            QuestionArr:[],
            QuestionArr1:[{
                step:1,
                urlY: require("@/assets/img/question/Q1-Y.png"),
                urlN: require("@/assets/img/question/Q1-N.png"),
                QuestionNum:'问题一',
                QuestionTitle:'肺结节尺寸是否在5-30mm之间？',
                QuestionText1:'是',
                QuestionText2:'否'
            }],
            QuestionArr2:[{
                step:2,
                urlY: require("@/assets/img/question/Q2-Y.png"),
                urlN: require("@/assets/img/question/Q2-N.png"),
                QuestionNum:'问题二',
                QuestionTitle:'您的结节是否位于肺部上叶？',
                QuestionText1:'是',
                QuestionText2:'否'
            }],
            QuestionArr3:[{
                step:3,
                urlY: require("@/assets/img/question/Q3-N.png"),
                urlN: require("@/assets/img/question/Q3-Y.png"),
                QuestionNum:'问题三',
                QuestionTitle:'是否是亚实性的结节？',
                QuestionText1:'是',
                QuestionText2:'否'
            }],
            QuestionArr4:[{
                step:4,
                urlY: require("@/assets/img/question/Q4-Y.png"),
                urlN: require("@/assets/img/question/Q4-N.png"),
                QuestionNum:'问题四',
                QuestionTitle:'是否吸烟或者被动吸二手烟？',
                QuestionText1:'是',
                QuestionText2:'否'
            }],
            QuestionArr5:[{
                step:5,
                urlY: '',
                urlN: '',
                QuestionNum:'问题五',
                QuestionTitle:'是否既往罹患恶性肿瘤或有肺癌家族史者——直系亲属有肿瘤确诊？',
                QuestionText1:'是',
                QuestionText2:'否'
            }],
            QuestionArr6:[{
                step:6,
                urlY: require("@/assets/img/question/Q6-Y.png"),
                urlN: require("@/assets/img/question/Q6-N.png"),
                QuestionNum:'问题六',
                QuestionTitle:'您是否有慢阻肺（COPD）病史或肺结核病史？',
                QuestionText1:'是',
                QuestionText2:'否'
            }],
            QuestionArr7:[{
                step:7,
                urlY: require("@/assets/img/question/Q7-X.png"),
                urlN: require("@/assets/img/question/Q7-Y.png"),
                QuestionNum:'问题七',
                QuestionTitle:'您的性别是？',
                QuestionText1:'男',
                QuestionText2:'女'
            }],
            QuestionArr8:[{
                step:8,
                QuestionNum:'问题八',
                QuestionTitle:'您的年龄？',
                QuestionText1:'40岁以下',
                QuestionText2:'40-60岁',
                QuestionText3:'60岁以上',
                tip:''
            }],
            floagObj:{
                floag1:false,
                floag2:false,
                floag3:false,
                floag4:false,
                floag5:false,
                floag6:false
            }
        }
    },
    mounted(){
        this.QuestionArr = this.QuestionArr1;
    },
    methods:{
        nextChange(step){
            let that = this;
            console.log(that.radio);
            if(that.radio == ''){
                alert('请选择选项');
                return;
            };
            switch (step) {
                case 1:
                    if(that.radio == '1'){//下一步  (that.radio:1是，2否);
                        that.QuestionArr = that.QuestionArr2;
                        that.radio = '';
                    }else{//第一种类型 亚型一
                        that.$router.push({path:'/result',query: {id:'1'}});
                    }
                    break;
                case 2:
                    if(that.radio == '1'){//根据年龄跳转到对应第二种类型压型 
                          that.QuestionArr = that.QuestionArr7;
                          that.radio = '';
                    }else if(that.radio == '2'){
                        that.QuestionArr = that.QuestionArr3;
                        that.floagObj.floag1 = true;
                        that.radio = '';
                    }
                    break;
                case 3:
                    if(that.radio == '1'){//根据年龄跳转到对应第二种类型压型 
                        that.QuestionArr = that.QuestionArr7;
                        that.radio = '';
                    }else{
                        that.QuestionArr = that.QuestionArr4;
                        that.radio = '';
                        that.floagObj.floag2 = true;
                    }
                    break;
                case 4:
                    if(that.radio == '1'){//根据年龄跳转到对应第二种类型压型 
                        that.QuestionArr = that.QuestionArr7;
                        that.radio = '';
                    }else{
                        that.QuestionArr = that.QuestionArr5;
                        that.radio = '';
                        that.floagObj.floag3 = true;
                    }
                    break;
                case 5:
                    if(that.radio == '1'){//根据年龄跳转到对应第二种类型压型 
                    //TODO年龄判断
                        that.QuestionArr = that.QuestionArr7;
                        that.radio = '';
                    }else{
                        that.QuestionArr = that.QuestionArr6;
                        that.radio = '';
                        that.floagObj.floag4 = true;
                    }
                    break;
                case 6:
                    if(that.radio == '1'){//根据年龄跳转到对应第二种类型压型 
                    //TODO年龄判断
                        that.QuestionArr = that.QuestionArr8;
                        that.radio = '';
                    }else{
                        that.QuestionArr = that.QuestionArr7;
                        that.radio = '';
                        that.floagObj.floag5 = true;
                    }
                    break;
                case 7:
                    if(that.radio == '1'){
                        that.userMan= true;
                    }else{
                        that.userMan= false;
                    }
                    that.QuestionArr = that.QuestionArr8;
                    that.radio = '';
                    break; 
                case 8:
                    if(that.radio == '1'){//(that.radio 1为40岁以下，2为40-60岁；3为60岁以上)
                        if(that.floagObj.floag1 && that.floagObj.floag2 && that.floagObj.floag3 && that.floagObj.floag4 && that.floagObj.floag5){
                            that.$router.push({path:'/result',query: {id:'2'}});
                        }else{
                            that.$router.push({path:'/result',query: {id:'3'}});
                        }
                    }else if(that.radio == '2'){
                        that.$router.push({path:'/result',query: {id:'4'}});
                    }else{
                        that.$router.push({path:'/result',query: {id:'5'}});
                    }
                    break;          
                default:
                    console.log(step)
                    break;
            }
        },
        goBack(){
            this.$router.go(-1);
        },
    }
}
</script>
<style>
.QuestionPage{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.QuestionPage header{
    width: 100%;
    height: 114px;
    background: #4eb7ba;
    line-height: 114px;
    color: #fff;
    text-align: center;
    
}
.QuestionPage header h4{
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-size: 46px;
    box-sizing: border-box;
    color: #fff;
}
.QuestionPage header span{
    float: left;
    font-size: 42px;
    margin-top: 18px;
    font-weight: 900;
    margin-left: 30px;
}
.QuestionPage-box{
    min-height: 100%;
    padding-bottom: 60px;
    background: #e4f2f2;
    border-radius: 5px;
}
.QuestionPage .title{
    font-size: 38px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #ffffff;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(to right, #4eb7ba , #fff);
    margin-top: 47px;
    padding-left: 23px;
    box-sizing: border-box;
}
.QuestionPage .Question-num button{
    width: 388px;
    height: 90px;
    text-align: center;
    font-size: 0.373333rem;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #4eb7ba;
    letter-spacing: 0.026667rem;
    background: transparent;
    border: none;
    /* border: 0.08rem solid #ffffff; */
    /* border-radius: 90px; */
    /* box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999; */
    font-size: 64px;
    margin-top: 118px;
}
.QuestionPage  .Question-list{
    padding: 0 54px;
    box-sizing: border-box;
    background: url('../assets/img/page3/QS-bg.png') center no-repeat;
    background-size: 100% 100%;
    
}
.QuestionPage  .content-list{
    border-top: 1px solid #6e6e6e;
    border-bottom: 1px solid #6e6e6e;
    margin-top: 90px;
    padding-bottom: 38px;
    box-sizing: border-box;
}
.QuestionPage  .Question-title{
    font-size: 40px;
    color: #221e1f;
    margin-top:28px;
}
.QuestionPage  .next-step button{
    width: 388px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 0.5rem solid #ffffff;
    border-radius: 90px;
    box-shadow: 10px 10px 10px #999;
    font-size: 36px;
    margin-top: 70px;
}
.QuestionPage .Question-select-list{
    min-height: 320px;
    width: 45%;
}
.QuestionPage .Question-select-list .select-list{
    margin-top: 43px;
    text-align: center;
    font-size: 20px;
    color: #6e6e6e;
    width: 100%;
    display:grid;
    grid-template-columns: 50% 50%;
}
.QuestionPage .Question-select-list .select-list .el-radio{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    margin: 0 auto;
}

.QuestionPage .select-list-left div:nth-of-type(2){
    padding-bottom: 0.2rem;
}
.QuestionPage .select-list-left span{
    font-size: 24px;
    float: right;
}
.QuestionPage .select-list-left .step6{
    line-height: 60px;
    display: block;
}

.QuestionPage .van-radio__label{
    font-size: 38px;
    margin-top: 10px;
}
.QuestionPage .el-radio{
    padding-bottom: 0.2rem;
}
.QuestionPage .Question-select-list img{  
    width: 100px;
    height: 100px;
    text-align: center;
}
.QuestionPage .step8 img{
    margin-top: -20px;
}
.QuestionPage .Question-select-list input{
    margin: 0  16px 0 40px ;
    display: inline-block;
}
.QuestionPage .age-select{
    position: absolute;
    
}   
.QuestionPage .Question-select-list .select-list  .el-radio__label{
    font-size: 28px;
}
.QuestionPage .Question-select-list .select-list  .el-radio__inner{
    border: 0.071429rem solid #DCDFE6;
    border-radius: 0;
    width: 2rem;
    height: 2rem;
    background-color: #FFF;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
    margin-top: -10px;
}
.QuestionPage .Question-select-list .select-list  .el-radio__input.is-checked .el-radio__inner{
    background-color:#409EFF;
}

.QuestionPage .Question-select-list .select-list  .el-radio__input.is-checked .el-radio__inner::after{
    content: '\2714';
    color: #fff;
    background-color:#409EFF;
    width: 40px;
    width: 100%;
    height: 100%;
    border-radius: 0;
    text-align: center;
    line-height: 25px;
} 
</style>
