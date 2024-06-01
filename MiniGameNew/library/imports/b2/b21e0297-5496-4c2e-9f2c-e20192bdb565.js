"use strict";
cc._RF.push(module, 'b21e0KXVJZMLp8s4gGSvbVl', 'Entry');
// Script/Entry.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    openDebug: function openDebug() {
        RichDebug.showDebug();
    },

    closeDebug: function closeDebug() {
        RichDebug.hideDebug();
    },

    onLoad: function onLoad() {
        if (!window["GameLogic"]) {
            window["GameLogic"] = {};
        }
        //加载分包
        var loadSubpackage = function loadSubpackage(pkgName, callback) {
            if (cc.sys.platform == cc.sys.WECHAT_GAME && wx && wx.loadSubpackage) {
                console.log("微信小游戏加载分包并执行GameLogic.js");
                var loadTask = wx.loadSubpackage({
                    name: pkgName,
                    success: function success(res) {
                        if (callback) {
                            callback();
                        }
                    },
                    fail: function fail(res) {
                        console.error(res);
                    }
                });
                loadTask.onProgressUpdate(function (res) {
                    console.log('下载进度', pkgName, res.progress);
                    console.log('已经下载的数据长度', pkgName, res.totalBytesWritten);
                    console.log('预期需要下载的数据总长度', pkgName, res.totalBytesExpectedToWrite);
                });
            } else if ((cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) && cc.sys.platform != cc.sys.isBrowser) {
                //原生平台,进入ts层执行
                window.require('subpackages/' + pkgName + "/index.js");
                if (callback) {
                    callback();
                }
            } else {
                //H5平台不用管，自动执行ts层代码
                if (callback) {
                    callback();
                }
            }
        };

        loadSubpackage("GameLogic", function () {
            console.log("载入完成");
            window["GameLogic"]["entry"]();
        });
    },
    start: function start() {
        if (window["GameLogic"] && window["GameLogic"]["start"]) {
            window["GameLogic"]["start"]();
        }
    },
    update: function update(dt) {
        if (window["GameLogic"] && window["GameLogic"]["update"]) {
            window["GameLogic"]["update"](dt);
        }
    },
    onDestroy: function onDestroy() {
        if (window["GameLogic"] && window["GameLogic"]["destroy"]) {
            window["GameLogic"]["destroy"]();
        }
    }
});

cc._RF.pop();