## 内容
- 搭建本地web服务器
- 编译Sass
- 每当保存更改，自动刷新浏览器
- 优化&压缩资源
- 添加文件hash


## 命令
```
$ npm init -y
$ npm i --D gulp
$ npm install gulp-sass --save-dev

$ npm install browser-sync --save-dev

$ npm i -D del
$ npm i -D gulp-if
$ npm i -D gulp-useref
$ npm i -D gulp-uglify gulp-clean-css
$ npm install --save-dev autoprefixer
$ npm install -D gulp-rename gulp-inject-string
```

## 打包

本地调试
```
gulp dev
```
产品打包
```
gulp build
```

##参考
[browser-sync github](https://github.com/BrowserSync/browser-sync)  
[browser-sync 官网](https://browsersync.io/docs/gulp)  
[gulp的使用以及Gulp新手入门教程](https://www.cnblogs.com/sxz2008/p/6370221.html)