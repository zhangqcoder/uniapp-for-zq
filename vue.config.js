const TransformPages = require('uni-read-pages')
//下方可自定义配置路由所需要的属性
const tfPages = new TransformPages({
    includes:['path','name','meta','aliasPath']
})
module.exports = {
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}