<<<<<<< HEAD
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
=======
// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 14
});
module.exports = {
  // 基本路径
  publicPath:"./",
  // 输出文件目录
  outputDir: 'dist',
  lintOnSave: false,
  devServer: {
    proxy:{
      "/api": {
          target: "https://cac.sanmedgene.com/forhoo/", //目标地址
          ws: true, 
          changeOrigin: true,
          pathRewrite: {
              "^/api": ''
          }
      },
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '丽菲清®检测 '
        return args
      })
  }
}
>>>>>>> 6c013275232954aeb12be48a31132da511375b21
