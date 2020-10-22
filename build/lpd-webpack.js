'use strict'
require('./check-versions')()
process.env.NODE_ENV = 'production'
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')


const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
/**
 * my - utils.js
 */

const assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

const cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const px2remLoader = {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75
        }
    }
    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            // return ExtractTextPlugin.extract({
            //     use: loaders,
            //     fallback: 'vue-style-loader',
            //     publicPath: "../../"
            // })
            return ['vue-style-loader'].concat(loaders)
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
const styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}
const createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}
const getAlias = function () {
    const alias = {};
    const dirs = glob.sync(PAGE_PATH + '/*')
    dirs.forEach((dirPath) => {
        const dirname = dirPath.substring(dirPath.lastIndexOf('/') + 1);
        alias["@" + dirname] = path.join(__dirname, '..', "src/pages/" + dirname)
    })
    return alias;
}

//多入口配置
const entries = function () {
    const entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    const map = {}
    entryFiles.forEach((filePath) => {
        const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}
const htmlPluginPath = function (currBuildPackName) {
    const entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    const reg = new RegExp(`/${currBuildPackName}/`);
    let resPath = "";
    entryHtml.forEach((filePath) => {
        if (reg.test(filePath)) resPath = filePath;
    })
    return resPath;
}
//多页面输出配置
const htmlPlugin = function (currDevPackNames) {
    const entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    const arr = []

    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {};


        // 开发环境
        conf = {
            template: filePath,
            filename: filename + '.html',
            chunks: [filename],
            inject: true
        }

        // 测试环境和生产环境
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest') {
            conf = merge(conf, {
                chunks: ['manifest', 'vendor', filename],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        if (currDevPackNames.includes(filename)) {
            arr.push(new HtmlWebpackPlugin(conf))
        }
    })
    return arr
}

/**
 * 获取当前打包时间
 */
const getBuildTime = function () {
    let buildTime = new Date().Format("yyyy-MM-dd hh:mm");
    let str = `<script>`;
    str += `console.warn("当前H5包 Build Time： ${buildTime}");`;
    str += `console.warn("当前H5包 NODE_ENV：${process.env.NODE_ENV}");`;
    str += `</script>`;
    return str;
}

/**
 * 日期格式化函数
 */
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



/**
 * my - webpack.common.conf.js
 */

const v = "1.2"

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        common: "./src/common/finsuit-components/Toast/index.js"
    },
    output: {
        path: config.build.assetsRoot,
        // filename: v + "/[name].min.js",
        filename: "test.js",
        libraryExport: "default",
        library: "finsuit",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@common': resolve('src/common')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}





/**
 *  my - build.js
 */
const currBuildPackName = JSON.parse(process.env.npm_config_argv).remain[0];
const spinner = ora(`正在进行【${currBuildPackName}】项目,【${process.env.NODE_ENV}】环境打包进行中`)
spinner.start()
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})
