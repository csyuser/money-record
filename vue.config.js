const path =require ('path') //引入一个path模块，是nodejs的一个模块，可以用来做path

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/money-record-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config =>{
    const dir = path.resolve(__dirname, 'src/assets/icons') //确定icon所在的目录，__dirname当前目录的意思

    config.module
      .rule('svg-sprite')  //规则名称
      .test(/\.svg$/)  //匹配此正则的文件（以.svg结尾的文件）
      .include.add(dir).end() // 包含 icons 目录
      //匹配loader,extract:false不要解析出文件
      .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract:false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
    //匹配插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)// 其他 svg loader 排除 icons 目录
  }
}
