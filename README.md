# wx_res_hotupdate
全网都没有一个像样的Creator2.4.x版本以下的小游戏-资源热更框架（包括cocos论坛，Github上也没有类似的），因此开源一个。。
GitHub地址：[https://github.com/fshunj88/wx_res_hotupdate[自行梯子]](https://github.com/fshunj88/wx_res_hotupdate)
Gitee地址：[https://gitee.com/feng-shunjie/wx_res_hotupdate](https://gitee.com/feng-shunjie/wx_res_hotupdate)
基于Creator2.2.x的微信小游戏的资源热更框架，本人项目的使用的，现在本人搞了简化版本，去除一些版本管理，还原最核心的原理
附带一个PDF，里面有具体针对这个框架的分析和操作流程

//这里是基于BroadMix的链接(直接打开即可)，里面由关于这个项目的细节的底层分析和操作流程（链接永久有效）
[https://boardmix.cn/app/share/CAE.CLfz5Q0gASoQ_RKMzIU12PVIbOqrvLLLcTAGQAE/9AzkJn,](https://boardmix.cn/app/share/CAE.CLfz5Q0gASoQ_RKMzIU12PVIbOqrvLLLcTAGQAE/9AzkJn,)
点击链接加入boardmix中的文件「Creator2.2.2小游戏资源底层分析」

原理简述：
务必买一个阿里云对象存储服务（就几块钱），或者自己搞一个以及注册和备案了域名的资源服；
用OSS浏览器打开你自己的slot；
[https://help.aliyun.com/zh/oss/developer-reference/install-and-log-on-to-ossbrowser](https://help.aliyun.com/zh/oss/developer-reference/install-and-log-on-to-ossbrowser)

把Github上项目的资源服务器文件夹的cur和LatestVer放到服务器，同时打包小游戏要写上你自己的资源服务器地址；
cur表示旧项目(版本号0.2.58)微信打包后的res文件夹；
LatestVer表示新项目(版本号0.2.60)微信打包后的res文件夹并且还有一些定制的内容，看链接具体分析
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/0197a03368a743dfa2899b408b1b563c.png#pic_center)
同时代码中也要进行相应的修改地址（因为CocosWXDownloader要从对应服务器下载）
里面有两个项目，一个是MiniGameOld，0.2.58版本的旧版本的项目,一个是MiniGameNew，0.2.60版本的新版本的项目,两个项目完全相同，只有一个card_m/204图片的差异，
本次要热更的就是这个图片资源
这个热更框架可以做到
1：重启热更，一般项目也就这种需求
2：无感知热更，也就是在游戏过程中东西去更新一个图片或者什么资源等等，这个需要开发者手动去除旧资源，这个属于资源管理部分不说了；

务必对creator2.2.2的资源系统(cc.loader.loadres在小游戏上的经过的各个pipe)比较熟悉再看本人的讲解，不然会十分看不懂；

先说微信打包有一个fs-utils.js的功能，fs-utils.js获取一个文件时候是从代码包里获取，没有的话下载到gameCaches缓存目录，下一次获取相同文件如果已经下载了，就从gameCaches里面获取，
本人定制的WXFileSystem是从缓存根目录的res文件夹中获取所有的json和raw资源，下载资源也是下载到缓存根目录的res中；

定制的CocosWXDownloader将会替代RemoteDownloader这个pipe，这样下载任何东西都会由CocosWXDownloader代理，CocosWXDownloader会利用WXFileSystem来在缓存根目录的res文件中存取资源；

游戏开始处理最开始的系统几个内建资源是由RemoteDownloader主导的，一旦CocosWXDownloader植入完成，下载和存取流程就由CocosWXDownloader完成，和RemoteDownloader和fs-utils都没有任何关系了

热更时候，需要把新版本的settnig.js变成settings_XX.txt，然后放在远程服务器，微信客户端读取最新的settings_XX.txt，并且重新初始化AssetLibrary，
然后再重新加载同一个资源,cc.loader.loadres,由于资源库改变了，对应(cc.SpriteFrame类型)uuid也改变了，包cc.SpriteFrame类型的uuid所依赖的所有uuid也全部更新，
所以此时的cc.loader.loadres将会加载一个全新的资源，替代旧的资源；这就是资源热更原理；更加具体的操作细节看链接和pdf

里面还有一些针对引擎的修改，务必注意下，cc.loader.removePipe增加了这个removePipe

tools文件夹下有一个compile.py，用于编译ts层的所有ts文件，全部编译到assets/Script/src/GameLogic.js下；

针对cocoscreator2.4.x新的资源管理系统热更，也多说两句，这个项目不是基于2.4.x的，2.4.x用了AssetBundle,所以流程会不同，不过会更加简单，
AssetBundle有config.json,和2.2.x的setting.js功能是一样的，因此资源服务器更新整个AssetBundle包即可，config.json也同步修改了即可，同时微信客户端清空所有缓存，
重启即可达到资源热更。


本次项目仅仅用于展示资源热更的原理，还没有适配其他小游戏平台，另外，开发者可以自己去定制各种版本管理相关的东西等等；这方面东西不宜在这里展示了，比如python自动递增版本号之类的东西

