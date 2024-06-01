///<reference path="Utils.ts"/>
namespace HotUpdate {

    class DownloadSettingRet extends DownloadPatchRet {
        public settingStr: string;
    }

    export class MiniGameHotUpdateMgr {
        private static _inst: MiniGameHotUpdateMgr;
        public static get inst(): MiniGameHotUpdateMgr {
            if (!this._inst) {
                this._inst = new MiniGameHotUpdateMgr();
            }
            return this._inst;
        }

        private _localVersion: string = "";
        private _observer: HotUpdateObserver = null;
        private _buildType: string = "";
        private _subType: string = "";
        private _cachedVerCompareToPackVerRet: number;
        private _fs: WXGame.WXFileSystem;
        public REMOTE_SERVER_ROOT: string = "";
        private _serverlist: any = null;

        public constructor() {
            // 维护的时候改subType
            if (Core.DeviceUtils.isWXGame()) {
                this._buildType = "wxgame";
                this._subType = "wx1";
                this._fs = WXGame.WXFileSystem.inst;
            } else if (Core.DeviceUtils.isQQPlay()) {
                this._buildType = "qqgame";
                this._subType = "qq1";
                this._fs = WXGame.WXFileSystem.inst;
            } else if (Core.DeviceUtils.isTTGame()) {
                this._buildType = "ttgame";
                this._subType = "tt2";
                this._fs = WXGame.WXFileSystem.inst;
            } else {
                // TODO
                throw Error("其他类型的小游戏请在DeviceUtils中支持判定接口！")
            }
            //this.REMOTE_SERVER_ROOT = `${MINIGAME_RES_URL_ROOT}${this._buildType}/${this._subType}`;
            this.REMOTE_SERVER_ROOT = `${MINIGAME_RES_URL_ROOT}`;
            // 读取本地版本号0.2.58
            this._localVersion = miniGameVersionInfo[this._buildType][this._subType];
            let cachedVersion = this._getVersionFromCache();
            if (cachedVersion) {
                this._cachedVerCompareToPackVerRet = compareVersion(cachedVersion, this._localVersion);
                if (this._cachedVerCompareToPackVerRet > 0) {
                    // 缓存的版本号比包里的大
                    this._localVersion = cachedVersion;
                }
            }
        }

        public get version(): string {
            return this._localVersion;
        }

        public get buildType(): string {
            return this._buildType;
        }

        public get subType(): string {
            return this._subType;
        }

        public get hotUpdateFs(): WXGame.WXFileSystem {
            return this._fs;
        }

        public get serverlist(): any {
            return this._serverlist;
        }

        private _saveVersionToCache(v: string) {
            this._localVersion = v;
            //Home.GlobalConfig.inst.version = this._localVersion;
            let localVersionStr = cc.sys.localStorage.getItem("__mini_versions__");
            let localVersion = {};
            if (localVersionStr && localVersionStr != "") {
                localVersion = JSON.parse(localVersionStr);
            }
            if (!localVersion[this._buildType]) {
                localVersion[this._buildType] = {};
            }
            localVersion[this._buildType][this._subType] = v;
            cc.sys.localStorage.setItem("__mini_versions__", JSON.stringify(localVersion));
        }

        private _getVersionFromCache() {
            let cachedVersion = null;
            let localVersionStr = cc.sys.localStorage.getItem("__mini_versions__");
            if (localVersionStr && localVersionStr != "") {
                let localVersion = JSON.parse(localVersionStr);
                if (localVersion[this._buildType] && localVersion[this._buildType][this._subType]) {
                    cachedVersion = localVersion[this._buildType][this._subType];
                }
            }
            return cachedVersion;
        }

        public async hotUpdate(): Promise<{ success: boolean, reason?: string }> {
            // 检测版本号
            let ret = await this._checkVersion();
            if (ret.isSuccess()) {
                console.log("new Ver come");
                this._serverlist = ret.serverlist;
                //远程版本大于本地版本，返回1;本地版本大于远程版本，返回-1;版本相同返回0
                let remoteVerCompareToLocalVerRet = compareVersion(ret.remoteVersion, this._localVersion);
                if (remoteVerCompareToLocalVerRet > 0) {
                    // 有更新，下载json包
                    // 一旦更新，所有json文件都重新下载，不到1M的zip文件
                    console.log("about to download jsonZip");
                    let ret1 = await this._downloadJsonZip(ret.remoteVersion);
                    if (ret1.isSuccess()) {
                        console.log("jsonZip downloaded ,about to download settingFile");
                        // 下载settings.txt文件
                        let ret2 = await this._downloadSettingFile(ret.remoteVersion);
                        if (ret2.isSuccess()) {
                            if (this._observer && this._observer.onDownloadDone) {
                                this._observer.onDownloadDone(ret.errcode, ret2.errorMessage());
                            }
                            let settingStr = ret2.settingStr;
                            if (settingStr && settingStr != "") {
                                // 初始化资源库
                                console.log("settingFile downloaded and init AssetLibrary.");
                                let settings = JSON.parse(settingStr);
                                if (settings) {
                                    this._initAssetLibrary(settings);
                                    // 最后保存版本号
                                    this._saveVersionToCache(ret.remoteVersion);
                                    return { success: true };
                                } else {
                                    return { success: false, reason: "加载载资源库配置出错，请清理资源后再试！" };
                                }
                            } else {
                                return { success: false, reason: "下载资源库配置出错！" };
                            }
                        } else {
                            return { success: false, reason: ret2.errorMessage() };
                        }
                    } else {
                        return { success: false, reason: ret1.errorMessage() };
                    }
                } else {
                    if (this._cachedVerCompareToPackVerRet > 0) {
                        // 没更新，但缓存的版本号比包里的大，从缓存加载settings
                        if (this._loadSettingsFromCached()) {
                            return { success: true };
                        } else {
                            return { success: false, reason: "资源错误，请点击清理按钮清理资源！" };
                        }
                    } else {
                        // 包里的版本号比本地缓存要大
                        if (remoteVerCompareToLocalVerRet == 0) {
                            // 且跟最新版本号一样，应该删掉本地缓存吗？
                            // 不用删。资源是md5后缀。此时settings已经从包里加载过了。
                        }
                        return { success: true };
                    }
                }
            } else {
                return { success: false, reason: ret.errorMessage() };
            }
        }

        public registerObserver(ob: HotUpdateObserver) {
            this._observer = ob;
        }

        private async _checkVersion(): Promise<MiniGameCheckVersionRet> {
            if (this._observer && this._observer.onCheckVersion) {
                this._observer.onCheckVersion();
            }
            let ret = await new Promise<MiniGameCheckVersionRet>(resolve => {
                //let url = MINIGAME_VERSION_API_URL + "build=" + this._buildType + "&os=" + this._subType;
                let url = MINIGAME_VERSION_API_URL;
                let xmlReq = cc.loader.getXMLHttpRequest();
                xmlReq.open("GET", url);
                xmlReq.responseType = "text";
                xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlReq.onreadystatechange = function () {
                    if (xmlReq.readyState == 4) {
                        let ret = new MiniGameCheckVersionRet();
                        if (xmlReq.status >= 200 && xmlReq.status <= 304) {
                            var response = JSON.parse(xmlReq.responseText);
                            let code = response["code"];
                            ret.errcode = code
                            if (code == 0) {
                                ret.remoteVersion = response["version"];
                                ret.serverlist = response["serverlist"];
                            }
                        } else {
                            ret.errcode = 9000;
                        }
                        console.log("_checkVersion request error status: ", xmlReq.status);
                        resolve(ret);
                    }
                }
                xmlReq.onload = function () {
                }
                xmlReq.ontimeout = function () {
                    let ret = new MiniGameCheckVersionRet();
                    ret.errcode = 9001;
                    resolve(ret);
                }
                xmlReq.onerror = function () {
                    let ret = new MiniGameCheckVersionRet();
                    ret.errcode = 9002;
                    resolve(ret);
                }
                xmlReq.send();
            });
            if (this._observer && this._observer.onCheckVersionDone) {
                this._observer.onCheckVersionDone(ret.errcode, ret.errorMessage());
            }
            return ret;
        }

        private async _downloadSettingFile(remoteVersion: string): Promise<DownloadSettingRet> {
            let ret = new DownloadSettingRet();
            let url = this.REMOTE_SERVER_ROOT + `settings_${remoteVersion}.txt`;
            let settingsStr: string = await this._fs.xhrLoad(url, null, null, true).catch(error => {
                console.error("[MiniGameHotUpdate] download setting file exception: ", error);
                return "";
            });
            if (settingsStr && settingsStr != "") {
                // 保存到缓存文件中
                if (await this._fs.writeFile("settings.txt", settingsStr)) {
                    ret.errcode = 0;
                    ret.settingStr = settingsStr;
                } else {
                    ret.errcode = 3001;
                }
            } else {
                ret.errcode = 3000;
            }
            return ret;
        }

        private async _downloadJsonZip(remoteVersion: string): Promise<DownloadPatchRet> {
            let fileName = `json_${remoteVersion}.zip`;
            let self = this;
            let ret = await this._fs.loadRemoteImportZipFile(fileName, (res) => {
                if (self._observer && self._observer.onDownloadProgress) {
                    self._observer.onDownloadProgress(res.totalBytesWritten, res.totalBytesExpectedToWrite);
                }
            });
            let downloadRet = new DownloadPatchRet();
            if (ret) {
                downloadRet.errcode = 0;
            } else {
                downloadRet.errcode = 3002;
            }
            return downloadRet;
        }

        private async _loadSettingsFromCached() {
            console.log("WXHotUpdate already up to date, load cached settings.json");
            // 从本地缓存读settings.json
            let settingsStr: string = <string>(await this._fs.readFile("settings.txt", "utf-8"));
            if (settingsStr && settingsStr != "") {
                // 解析settings.json，修改AssetLibrary配置
                let settings = JSON.parse(settingsStr);
                this._initAssetLibrary(settings);
                return true;
            } else {
                return false;
            }
        }

        private _initAssetLibrary(settings: any) {
            if (!settings.debug) {
                var uuids = settings.uuids;
                var rawAssets = settings.rawAssets;
                var assetTypes = settings.assetTypes;
                var realRawAssets = settings.rawAssets = {};
                let rawAssetKeys = Object.keys(rawAssets);
                for (var mount of rawAssetKeys) {
                    var entries = rawAssets[mount];
                    var realEntries = realRawAssets[mount] = {};
                    for (var id of Object.keys(entries)) {
                        var entry = entries[id];
                        var type = entry[1];
                        if (typeof type == 'number') {
                            entry[1] = assetTypes[type];
                        }
                        var _id = parseInt(id);
                        realEntries[uuids[_id] || id] = entry;
                    }
                }

                var packedAssets = settings.packedAssets;
                let packedAssetsKeys = Object.keys(packedAssets);
                for (var packId of packedAssetsKeys) {
                    var packedIds = packedAssets[packId];
                    var j = 0;
                    var length = packedIds.length;
                    for (; j < length; ++j) {
                        if (typeof packedIds[j] == 'number') {
                            packedIds[j] = uuids[packedIds[j]];
                        }
                    }
                }

                var scenes = settings.scenes;
                for (var i = 0; i < scenes.length; ++i) {
                    var scene = scenes[i];
                    if (typeof scene.uuid === 'number') {
                        scene.uuid = uuids[scene.uuid];
                    }
                }

                //把release-setting.js里面的md5Assets里面数字变成真正的uuid
                var t = settings.uuids, r = settings.md5AssetsMap;
                for (var s in r)
                    for (var obj = r[s], n = 0; n < obj.length; n += 2)
                        "number" == typeof i[n] && (i[n] = t[i[n]])

                var subpackages = settings.subpackages;
                for (var subId in subpackages) {
                    var uuidArray = subpackages[subId].uuids;
                    if (uuidArray) {
                        for (var k = 0, l = uuidArray.length; k < l; k++) {
                            if (typeof uuidArray[k] === 'number') {
                                uuidArray[k] = uuids[uuidArray[k]];
                            }
                        }
                    }
                }
            }

            var options = {
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            };

            // 先要删掉md5pipe,因为AssetLibrary.init里面会new一个md5 pipe;
            var md5Pipe = cc.loader.md5Pipe;
            if (md5Pipe) {
                (<any>cc).loader.removePipe(md5Pipe);
            }

            (<any>cc).AssetLibrary.init(options);

            console.log("------ initAssetLibrary with options: ", options);
        }
    }



    export async function MiniGameHotUpdate(ob: HotUpdateObserver) {
        MiniGameHotUpdateMgr.inst.registerObserver(ob);
        return await MiniGameHotUpdateMgr.inst.hotUpdate();
    }

    function updateLoadingHint(hint: string) {
        window["GameLogic"]["updateLoadingHint"](hint);
    }

    export async function checkMiniGamePackageUpdate() {
        let namespace: any = wx;
        if (Core.DeviceUtils.isTTGame()) {
            namespace = tt;
        }
        if (namespace.getUpdateManager == undefined) {
            return;
        }

        let r: (value: void | PromiseLike<void>) => void = null;
        await new Promise<void>(resolve => {
            r = resolve;
            const updateManager = namespace.getUpdateManager();
            let resolveCheck = function () {
                if (r) {
                    r();
                    r = null;
                }
            }
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log("MiniGameHotUpdate has new app package: ", res.hasUpdate);
                if (res.hasUpdate) {
                    updateLoadingHint("检测到新的版本，正在下载，请稍候...");
                } else {
                    updateLoadingHint("");
                    resolveCheck();
                }
            });

            updateManager.onUpdateReady(function () {
                updateLoadingHint("");
                namespace.showModal({
                    title: '更新提示',
                    content: '新版本已下载，请重启游戏',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        } else {
                            resolveCheck();
                        }
                    },
                    fail(res) {
                        resolveCheck();
                    }
                });
            });

            updateManager.onUpdateFailed(function () {
                updateLoadingHint("");
                // 新版本下载失败
                resolveCheck();
            });

            if (Core.DeviceUtils.isTTGame()) {
                // fgui.GTimers.inst.add(2000, 1, () => {
                resolveCheck();
                // }, null);
            }
        });
    }
}
