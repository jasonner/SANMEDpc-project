module.exports = {
	lintOnSave: false,
	assetsDir: './',
	publicPath: './',	
    devServer: {
        proxy:{
          "/api": {
                target: "https://live.lehuitech.com/", //目标地址
                ws: true, 
                changeOrigin: true,
                pathRewrite: {
                  "^/api": ''
                }
            }    
        }
    },      
	css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    // require('postcss-px2rem')({
                    //     remUnit: 37.5 //按照屏幕宽度375px去书写页面(它可以适配vant,mintui的样式)
                    // })
                ]
            }
        }
    },
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].title= '乐会直播'
            return args
          })
    },
};
