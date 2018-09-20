import { resolve } from 'path';
export default {
  // history: 'hash',

  // base: '/api/v1',
  exportStatic: {
    
  },
  es5ImcompatibleVersions: true,
  plugins: [
    ['umi-plugin-react', {
      dva: true,
      antd: true,  // antd 默认不开启，如有使用需自行配置
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
          /chart\/Container\.js$/,
        ],
      },
      dll: {
        exclude: [],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },
      // hardSource:/*isMac */process.platform ==='darwin'
    }],


  ],
  theme: "./theme.config.js",
  // 接口代理示例
  proxy: {

    "/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
    "/api/v1": {
      "target": "http://api.runscity.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1": "/microapi" },
      "secure": false
    },

  },

  theme: "./theme.config.js",
  alias: {
    themes: resolve(__dirname, './src/themes'),
    components: resolve(__dirname,"./src/components"),
    utils: resolve(__dirname,"./src/utils"),
    config: resolve(__dirname,"./src/utils/config"),
    enums: resolve(__dirname,"./src/utils/enums"),
    services: resolve(__dirname,"./src/services"),
    models: resolve(__dirname,"./src/models"),
    routes: resolve(__dirname,"./src/routes"),  
    public: resolve(__dirname,"./public"),  
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ],
  ignoreMomentLocale:true,

  chainWebpack(config){
    config.module.rule('svg')
    .test(/\.svg$/i)
    .use('svg-sprite-loader')
    .loader(require.resolve('svg-sprite-loader'))
  }
}
