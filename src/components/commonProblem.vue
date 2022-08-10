<template>
    <div class="comProblemPage">
        <!-- <div class="title">
           <img src="@/assets/img/page2/question1.png" alt="">
        </div> -->
        <div class="list">
           <!-- <img src="@/assets/img/page2/flowChart.png" alt=""> -->
            <img class="productCt1" :src="imgSrc" alt="" srcset="">
        </div>
    </div>
</template>
<script>
export default {
    name:'comProblemPage',
    data(){
        return{
            imgSrc:''
        }
    },
    mounted(){
        this.getProductDetailList('productD3','pc');//h5常见问题
    },
    methods:{
        getProductDetailList(pagename,browsertype){
            let that = this;
            that.axios.get('photolist',{
            params: {
                pagename: pagename,
                browsertype:browsertype
            }
            })
            .then(function (res) {
                console.log(res.data);
                if(res.status == 200 ){
                    if(res.data.data && res.data.data.length>0){
                        that.imgSrc = res.data.data.pop().photourl;
                    };
                }
            }) 
        },
    }
}
</script>
<style scoped>
.comProblemPage{
    width: 60%;
    margin: 0 auto;
}
.comProblemPage .title .productCt1{
    width:60%;
}
.comProblemPage .title img{
    width: 100%;
    margin-top: 157px;

}
.comProblemPage .list img{
    width: 100%;
    margin-top: 82px;
}
</style>