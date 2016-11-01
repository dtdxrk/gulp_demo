https://github.com/dtdxrk/gulp_demo.git
git@github.com:dtdxrk/gulp_demo.git

@author LM 
@weixin dtdxrk
@qq 24119739

gulp+requirejs web前端构建

构建说明
* gulp之后会生成dist文件夹 (包含css img js view)
* md5指纹解决静态资源缓存问题
* 压缩合并css 单个页面打包为一个css文件
* 压缩img
* 压缩合并js 单个页面打包为一个js文件
* 测试和上线部署前执行gulp即可

注意事项
* public/js/main.js 里的paths配置如果修改，需要同步修改gulpfile.js里requirejsOptimize的paths配置
* gulpfile.js里rev_path可以替换静态资源的相对路径为绝对路径