window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Entry: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b21e0KXVJZMLp8s4gGSvbVl", "Entry");
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
        window["GameLogic"] || (window["GameLogic"] = {});
        var loadSubpackage = function loadSubpackage(pkgName, callback) {
          if (cc.sys.platform == cc.sys.WECHAT_GAME && wx && wx.loadSubpackage) {
            console.log("\u5fae\u4fe1\u5c0f\u6e38\u620f\u52a0\u8f7d\u5206\u5305\u5e76\u6267\u884cGameLogic.js");
            var loadTask = wx.loadSubpackage({
              name: pkgName,
              success: function success(res) {
                callback && callback();
              },
              fail: function fail(res) {
                console.error(res);
              }
            });
            loadTask.onProgressUpdate(function(res) {
              console.log("\u4e0b\u8f7d\u8fdb\u5ea6", pkgName, res.progress);
              console.log("\u5df2\u7ecf\u4e0b\u8f7d\u7684\u6570\u636e\u957f\u5ea6", pkgName, res.totalBytesWritten);
              console.log("\u9884\u671f\u9700\u8981\u4e0b\u8f7d\u7684\u6570\u636e\u603b\u957f\u5ea6", pkgName, res.totalBytesExpectedToWrite);
            });
          } else if (cc.sys.os != cc.sys.OS_ANDROID && cc.sys.os != cc.sys.OS_IOS || cc.sys.platform == cc.sys.isBrowser) callback && callback(); else {
            window.require("subpackages/" + pkgName + "/index.js");
            callback && callback();
          }
        };
        loadSubpackage("GameLogic", function() {
          console.log("\u8f7d\u5165\u5b8c\u6210");
          window["GameLogic"]["entry"]();
        });
      },
      start: function start() {
        window["GameLogic"] && window["GameLogic"]["start"] && window["GameLogic"]["start"]();
      },
      update: function update(dt) {
        window["GameLogic"] && window["GameLogic"]["update"] && window["GameLogic"]["update"](dt);
      },
      onDestroy: function onDestroy() {
        window["GameLogic"] && window["GameLogic"]["destroy"] && window["GameLogic"]["destroy"]();
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Entry" ]);
//# sourceMappingURL=project.dev.js.map
