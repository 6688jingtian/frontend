# 前端环境准备工作

## 区分开发机和local机器

### 开发机

sh installPkgDev.sh (编译安装8分钟左右)

### local机:
* 1. 安装或升级node (版本要求v6+)  
    a) node下载地址: https://nodejs.org/en/    
    b) 查看版本: node -v  确保v6+, 小于v6升级命令如下:  
       npm cache clean -f  
       npm install -g n  
       n stable  

* 2. 安装package  
    npm run installPkgs 
        

# 启动项目
* npm run start;
* 项目脚手架demo: http://localhost:8888/index.html; 
* UI组件库demo: http://localhost:8888/dist/index.html; 


# 开发热部署模式(修改源码, 浏览器自动刷新,无需手动F5)
* 脚手架项目开发: http://localhost:8886 (源码路径 app/)
* UI组件库开发: http://localhost:8887 (组件源码路径: UIComponents/src/)


# 任何疑问,请咨询  zhangyou04@baidu.com






