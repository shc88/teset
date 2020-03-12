1这是我们要做的第一个功能

初始化git仓库

命令 git init 


2自报家门 存储一下自己的用户名和邮箱

-git config --global user.name "你的名字"
-git config --global user.email "你的邮箱"

3把代码存储到.git仓储中
（1）把git放在大门口
git add ./demo.md
(2)把代码放到房间里
git commit 这是把代码放到仓库里了
git commit -m "这是什么"  -m是给个提示，“”里面的内容就是提示
仓储的房间就是版本库
project就是工作区


第三个功能
4.git status 代表我们要查看当前文件到哪里了
这是第六个功能