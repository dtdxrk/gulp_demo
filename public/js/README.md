github地址：
https://github.com/dtdxrk/gulp_demo.git
git@github.com:dtdxrk/gulp_demo.git

gulp+requirejs+md5 构建web前端静态资源

使用说明

* main.js里的paths配置如果修改，需要同步修改gulpfile.js里requirejsOptimize的paths配置

* rev_path可以替换静态资源的相对路径为绝对路径

* gulp之后会生成dist文件夹 (包含css img js view)

* 页面里引用的require模块gulp之后会打包为一个js大文件(公共多次引用的模块需要配置paths)

* 测试和上线部署前执行gulp即可
