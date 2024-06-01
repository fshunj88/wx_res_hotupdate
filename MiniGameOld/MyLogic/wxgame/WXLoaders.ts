// TypeScript file
namespace WXGame {

    export class WXFileSystem {
        private static _inst: WXFileSystem = null;
        private _fs: FileSystemManager;
        private _dirCache: Collection.Dictionary<string, boolean>;
        private _fsRoot: string;
        private _fsCacheFile: string;
        private _fsCachePathInfo: any;
        private _NO_VERSION: string = "n";
        private _dirty: boolean;
        private _saving: boolean;
        private _mkdirPromise: Collection.Dictionary<string, Promise<any>>;
        private _isNewDownloader: boolean;

        private _downloadFailRetryCnt: number = 30;

        public static get inst(): WXFileSystem {
            if (!WXFileSystem._inst) {
                WXFileSystem._inst = new WXFileSystem();
            }
            return WXFileSystem._inst;
        }

        public constructor() {
            if (Core.DeviceUtils.isQQPlay()) {
                this._fs = qq.getFileSystemManager();
            } else {
                this._fs = wx.getFileSystemManager();
            }

            console.log("WXLoaders !!!!!!!", this._fs);
            this._dirCache = new Collection.Dictionary<string, boolean>();
            this._fsRoot = (<any>wx).env.USER_DATA_PATH + "/";
            this._fsCacheFile = "cached_file_path_v1.info";
            this._fsCachePathInfo = {};
            this._dirty = false;
            this._saving = false;
            this._mkdirPromise = new Collection.Dictionary<string, Promise<any>>();
            this._isNewDownloader = false;
        }

        public startSaveFileHeartbeat() {
            //fgui.GTimers.inst.remove(this._savePathFile, this);
            //fgui.GTimers.inst.add(60 * 1000, -1, this._savePathFile, this);
        }

        private async _savePathFile() {
            if (this._dirty && !this._saving) {
                this._dirty = false;
                this._saving = true;
                let str = JSON.stringify(this._fsCachePathInfo);
                await this.writeFile(this._fsCacheFile, str);
                console.log("saving version file, size = ", str.length);
                console.log(this._fsCachePathInfo);
                this._saving = false;
            }
        }

        public async deleteAllCache() {
            if (await this.access(this._fsCacheFile)) {
                await this.unlink(this._fsCacheFile);
                if (await this.dirExists("res")) {
                    await this.deleteCache("res").catch((error) => {
                        console.error(error);
                    }).then((res) => {
                        console.log("[deleteAllCache] res = ", res);
                        this.exitGame();
                    });
                }
            }
        }

        public exitGame() {
            wx.exitMiniProgram({
                success: () => { },
                fail: () => {
                    //Core.TipsUtils.showTipsFromCenter("退出游戏失败，请重启微信并进入游戏~");
                    console.log("退出游戏失败，请重启微信并进入游戏~")
                },
                complete: () => { }
            })
        }

        public restartGame() {
            if (wx.restartMiniProgram)
                wx.restartMiniProgram()
            else
                this.exitGame();
        }

        public async deleteImportJsonCache(): Promise<boolean> {
            if (await this.dirExists("res")) {
                console.log("res 文件夹存在")
                if (await this.dirExists("res/import")) {
                    console.log("res/import文件夹存在")
                    let ret: boolean = await this.rmdir("res/import").catch((error) => {
                        console.error(error);
                        return false;
                    }).then((res) => {
                        console.log("delete res/import res = ", res);
                        return true;
                    });
                    if (ret) {
                        this._fsCachePathInfo[".json"] = {};
                        this._dirty = true;
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        }

        public async initFilePathInfos() {
            if (!await this.access(this._fsCacheFile)) {
                // await this.deleteCache("res").catch((error) => {
                //     console.error(error);
                // });
                this._isNewDownloader = true;
                if (!await this.writeFile(this._fsCacheFile, "{}")) {
                    console.error("can't init file version info");
                }
            }
            let infoStr = await this.readFile(this._fsCacheFile, "utf8");
            if (!infoStr) {
                console.error("can't read file version info");
            } else {
                this._fsCachePathInfo = JSON.parse(<string>infoStr);
            }
        }

        public get isNewDownloader(): boolean {
            //return true;
            return this._isNewDownloader;
        }

        public async setFileLocalPath(item: any, path: string) {
            let uuid = this.getItemUuid(item);
            if (!uuid) {
                console.error("setFileLocalPath can't get uuid for item", item);
                return;
            }
            this._dirty = true;
            let rawUrl = item.rawUrl;
            let extName = cc.path.extname(rawUrl);
            if (!this._fsCachePathInfo[extName]) {
                this._fsCachePathInfo[extName] = {};
            }
            let oldPath: string = this._fsCachePathInfo[extName][uuid];
            this._fsCachePathInfo[extName][uuid] = path;
            if (oldPath && oldPath != path) {
                console.log("unlink old asset: ", oldPath, "new path: ", path);
                await this.unlink(oldPath, false);
            }
        }

        public get fsRoot(): string {
            return this._fsRoot;
        }

        public get wxFs(): FileSystemManager {
            return this._fs;
        }

        public isRemotePath(p: string) {
            return p.indexOf("http://") == 0 || p.indexOf("https://") == 0;
        }

        public getLocalFilePath(p: string) {
            return p.split("?")[0];
        }

        public getWXFilePath(p: string) {
            return this._fsRoot + p;
        }

        public getFileVersion(p: string) {
            let arr = p.split("?");
            if (arr.length >= 2) {
                return arr[1];
            } else {
                return null;
            }
        }

        public getItemUuid(item: any): string {
            let rawUrl = item.rawUrl;
            if (!rawUrl) {
                return null;
            }
            let fileNames = cc.path.mainFileName(rawUrl).split("/");
            let uuid = fileNames[fileNames.length - 1];
            return uuid;
        }

        public itemExistsInCache(item: any, localPath: string) {
            let uuid = this.getItemUuid(item);
            if (!uuid) {
                return false;
            }
            let rawUrl = item.rawUrl;
            let extName = cc.path.extname(rawUrl);
            if (!this._fsCachePathInfo[extName]) {
                return false;
            }
            return this._fsCachePathInfo[extName][uuid] == localPath;
        }

        public async dirExists(dir: string) {
            if (this._dirCache.getValue(dir)) {
                // console.log("dirExists in cache", dir);
                return true;
            } else {
                // try {
                //     this._fs.accessSync(dir);
                //     return true;
                // } catch (e) {
                //     return false;
                // }
                return await this.access(dir);
            }
        }

        public async readFile(p: string, encoding?: string, withRootDir: boolean = true) {
            let path = p;
            if (withRootDir) {
                path = this._fsRoot + p;
            }
            return await new Promise((resolve) => {
                this._fs.readFile({
                    filePath: path,
                    encoding: encoding,
                    success: (res) => {
                        resolve(res.data);
                    },
                    fail: (res) => {
                        console.error(res);
                        resolve(null);
                    },
                    complete: (res) => {

                    }
                });
            })
        }

        public async writeFile(p: string, data: any, encoding: string = "utf8", withRootDir: boolean = true) {
            let path = p;
            if (withRootDir) {
                path = this._fsRoot + p;
            }
            return await new Promise((resolve) => {
                this._fs.writeFile({
                    filePath: path,
                    data: data,
                    encoding: encoding,
                    success: (res) => {
                        resolve(true);
                    },
                    fail: (res) => {
                        console.error(res);
                        resolve(false);
                    },
                    complete: (res) => {

                    }
                })
            });
        }

        public async access(p: string, withRootDir: boolean = true): Promise<boolean> {
            let path = p;
            if (withRootDir) {
                path = this._fsRoot + p;
            }
            return await new Promise<boolean>((resolve) => {
                this._fs.access({
                    path: path,
                    success: (res) => {
                        resolve(true);
                    },
                    fail: (res) => {
                        // console.error(res);
                        resolve(false);
                    },
                    complete: (res) => {

                    }
                })
            });
        }

        public async unlink(p: string, withRootDir: boolean = true) {
            let path = p;
            if (withRootDir) {
                path = this._fsRoot + p;
                console.log("unlink:--->path:", path);
            }
            return await new Promise((resolve) => {
                this._fs.unlink({
                    filePath: path,
                    success: (res) => {
                        console.log("====== unlink success: ", res);
                        resolve(true);
                    },
                    fail: (res) => {
                        console.log("====== unlink fail: ", res);
                        console.error(res);
                        resolve(false);
                    },
                    complete: (res) => {

                    }
                })
            });
        }

        public async rmdir(dir: string): Promise<boolean> {
            return await new Promise<boolean>(resolve => {
                this._fs.rmdir({
                    dirPath: this._fsRoot + dir,
                    recursive: true,
                    success: function () {
                        resolve(true);
                    },
                    fail: function (res) {
                        console.error(res.errMsg);
                        resolve(false);
                    },
                    complete: function () {

                    }
                })
            });
        }

        public async deleteCache(dir: string) {
            if (await this.rmdir(dir)) {
                this._fsCachePathInfo = {};
                this._dirCache.clear();
                this._dirty = true;
            }
        }

        public async unzip(p: string, t: string): Promise<boolean> {
            console.log("zipFilePath:", this._fsRoot + p, "---targetPath:", this._fsRoot + t);
            return await new Promise<boolean>((resolve) => {
                this._fs.unzip({
                    zipFilePath: this._fsRoot + p,
                    targetPath: this._fsRoot + t,
                    success: (res) => {
                        resolve(true);
                    },
                    fail: (res) => {
                        console.error(res);
                        resolve(false);
                    },
                    complete: (res) => {

                    }
                })
            });
        }

        public dirname(dir: string): string {
            let arr = dir.split("/");
            arr.pop();
            return arr.join("/");
        }

        public async mkdir(p: string, withRootDir: boolean = true) {
            let promise = this._mkdirPromise.getValue(p);
            if (promise) {
                return await promise;
            }

            let path = p;
            if (withRootDir) {
                path = this._fsRoot + p;
            }
            let ret = new Promise((resolve) => {
                this._fs.mkdir({
                    dirPath: path,
                    success: (res) => {
                        // console.log("mkdir: ", this._fsRoot + p);
                        this._mkdirPromise.remove(p);
                        resolve(true);
                    },
                    fail: (res) => {
                        console.error(res);
                        this._mkdirPromise.remove(p);
                        resolve(false);
                    },
                    complete: (res) => {

                    }
                })
            });

            this._mkdirPromise.setValue(p, ret);
            return await ret;
        }

        public async mkdirs(p: string, withRootDir: boolean = true) {
            if (p == "") {
                return;
            }
            if (!await this.dirExists(p)) {
                let dirs = p.split("/");
                // console.log("mkdirs: ", JSON.stringify(dirs));
                let current = "";
                for (let i = 0; i < dirs.length; ++i) {
                    let dir = dirs[i];
                    current += dir + "/";
                    if (!await this.dirExists(current)) {
                        await this.mkdir(current, withRootDir);
                        this._dirCache.setValue(current, true);
                    }
                }
            } else {
                // console.log(`dir ${p} exists already`);
                return;
            }
        }

        private async _downloadFile(url: string, retryCnt: number, target?: string, progressCb?: (res) => void): Promise<any> {
            let p = new Promise((resolve, reject) => {
                let options = {
                    url: url,
                    success: (v) => {
                        if (v.statusCode >= 400) {
                            if (retryCnt <= 0) {
                                reject(`加载失败：${url}[${v.statusCode}]`);
                            } else {
                                resolve(null);
                            }
                        } else {
                            resolve(v);
                        }
                    },
                    fail: (e) => {
                        console.log("_downloadFile fail: ", url, e);
                        if (retryCnt <= 0) {
                            let error = new Error(url);
                            reject(error);
                        } else {
                            resolve(null);
                        }
                    },
                    complete: (res) => {

                    }
                };
                if (target && target != "") {
                    options["filePath"] = this._fsRoot + target;
                }
                if (Core.DeviceUtils.isQQPlay()) {
                    let task = qq.downloadFile(options);
                    if (progressCb) {
                        task.onProgressUpdate((res) => {
                            progressCb(res);
                        });
                    }
                } else {
                    let task = wx.downloadFile(options);
                    if (progressCb) {
                        task.onProgressUpdate((res) => {
                            progressCb(res);
                        });
                    }
                }
            });
            if (retryCnt <= 0) {
                throw new Error(url);
            } else {
                let ret = await p;
                if (ret) {
                    return ret;
                } else {
                    console.debug("download", url, "fail, retry cnt", retryCnt);
                    return await this._downloadFile(url, retryCnt - 1, target, progressCb);
                }
            }
        }

        public async download(srcUrl: string, target?: string, progressCb?: (res) => void) {
            // console.log("======== ", dirname);
            return await new Promise((resolve, reject) => {
                this._downloadFile(srcUrl, this._downloadFailRetryCnt, target, progressCb).catch(error => {
                    reject(error);
                }).then((res) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
            });
        }

        private async _xhrLoad(xhrURL: string, type?: string, isText?: boolean) {
            let content = await new Promise<string>((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                if (type) {
                    (<any>xhr).responseType = type;
                }
                xhr.onload = () => {
                    if (xhr.status >= 400) {
                        let message = `加载失败：${xhrURL}`;
                        console.error(message);
                        // reject(message);
                        resolve("");
                    } else {
                        if (isText) {
                            resolve(xhr.responseText);
                        } else {
                            resolve(xhr.response);
                        }
                    }
                }
                xhr.onerror = () => {
                    let error = new Error(xhrURL);
                    console.error("xhrLoad error: ", error);
                    // reject(error);
                    resolve("");
                }
                xhr.open("get", xhrURL);
                xhr.send();
            });

            return content;
        }

        public async xhrLoad(xhrURL: string, target?: string, type?: string, isText?: boolean) {
            let retryCnt = this._downloadFailRetryCnt;
            while (retryCnt-- > 0) {
                let content = await this._xhrLoad(xhrURL, type, isText);
                if (content && content != "") {
                    if (target && target != "") {
                        let dirname = this.dirname(target);
                        await this.mkdirs(dirname);
                        await this.writeFile(target, content);
                    }
                    return content;
                }
                console.error("xhrLoad ", xhrURL, "fail, retry ", retryCnt);
            }
            throw new Error(xhrURL);
            // return await this._xhrLoad(xhrURL, target, type, isText);
        }

        public async loadRemoteImportZipFile(fileName: string, progressCb?: (res) => void): Promise<boolean> {
            let url = HotUpdate.MiniGameHotUpdateMgr.inst.REMOTE_SERVER_ROOT + fileName;
            let res: boolean = await this.download(url, fileName, progressCb).then((res) => {
                return true;
            },
                (error) => {
                    console.log("loadRemoteImportZipFile download error: ", error);
                    return false;
                }).catch(error => {
                    console.log("loadRemoteImportZipFile download exception: ", error);
                    return false;
                });
            if (res) {
                let finalRet = false;
                let res2 = await this.deleteImportJsonCache();
                if (res2) {
                    if (!await this.unzip(fileName, "")) {
                        console.error("loadRemoteImportZipFile unzip ", fileName, "fail");
                    } else {
                        finalRet = await this.dirExists("res/import");
                        console.log("[loadRemoteImportZipFile:]finalRet:", finalRet);
                    }
                }
                this.unlink(fileName);
                return finalRet;
            } else {
                return false;
            }
        }

        public async loadRemoteRawAssetsZipFile(fileName: string, progressCb?: (res) => void) {
            if (!this.isNewDownloader) {
                console.log("WXLoader loadRemoteZipFile not a new loader, skip...");
                return true;
            }
            //let url = HotUpdate.MiniGameHotUpdateMgr.inst.REMOTE_SERVER_ROOT + "/" + fileName;
            let url = ""
            let res: boolean = await this.download(url, fileName, progressCb).then((res) => {
                return true;
            },
                (error) => {
                    console.log("loadRemoteRawAssetsZipFile download error: ", error);
                    return false;
                }).catch(error => {
                    console.log("loadRemoteRawAssetsZipFile download exception: ", error);
                    return false;
                });
            if (res) {
                let finalRet = false;
                if (!await this.unzip(fileName, "")) {
                    console.error("loadRemoteRawAssetsZipFile unzip ", fileName, "fail");
                } else {
                    finalRet = await this.dirExists("res/raw-assets");
                    console.log("[loadRemoteRawAssetsZipFile:]finalRet:", finalRet);
                }
                this.unlink(fileName);
                return finalRet;
            } else {
                return false;
            }
        }
    }

    /**********************************************CocosWXDownloader Deifne****************************** */

    let non_text_format = [
        'js', 'png', 'jpg', 'bmp', 'jpeg', 'gif', 'ico', 'tiff', 'webp', 'image', 'pvr', 'etc', 'mp3', 'ogg', 'wav', 'm4a', 'font', 'eot', 'ttf', 'woff', 'svg', 'ttc'
    ];

    let binary_format = [
        'bin'
    ];

    const REGEX = /^\w+:\/\/.*/;

    export class CocosWXDownloader {
        private static _inst: CocosWXDownloader = null;
        public static get inst(): CocosWXDownloader {
            if (CocosWXDownloader._inst == null) {
                CocosWXDownloader._inst = new CocosWXDownloader();
            }
            return CocosWXDownloader._inst;
        }
        public static get REMOTE_SERVER_ROOT(): string {
            return HotUpdate.MiniGameHotUpdateMgr.inst.REMOTE_SERVER_ROOT;
            //比如https://fshunj.oss-cn-guangzhou.aliyuncs.com/MiniGameRes/LatestVer/
        }

        public id: string = "CocosWXDownloader";
        public async: boolean = true;
        public pipeline: any = null;
        public SUBCONTEXT_ROOT: string = "";

        public constructor() {
            console.log("server root: ", CocosWXDownloader.REMOTE_SERVER_ROOT);
        }

        public async initHandlers() {
            // var pipeBeforeDownloader = cc.loader.assetLoader;
            var pipeBeforeDownloader = (<any>window).wxDownloader;
            (<any>cc).loader.insertPipeAfter(pipeBeforeDownloader, this);
            (<any>cc).loader.removePipe(pipeBeforeDownloader);
        }

        private nextPipe(item: any, callback: Function) {
            console.log("CocosWXDownloader nextPipe", item);
            var queue = cc.LoadingItems.getQueue(item);
            queue.addListener(item.id, async (item) => {
                if (item.error) {
                    await WXFileSystem.inst.unlink(item.url, false);
                }
            }, null);
            callback(null, null);
        }

        public handle(item: any, callback: Function) {
            console.log("CocosWXDownloader handle ", item);
            if (item.type === "js") {
                callback(null, null);
                return;
            }

            if (item.type === 'uuid') {
                var result = (<any>cc).Pipeline.Downloader.PackDownloader.load(item, callback);
                // handled by PackDownloader
                if (result !== undefined) {
                    // null result
                    if (!!result) {
                        return result;
                    }
                    else {
                        return;
                    }
                }
            }
            let filePath = item.url;
            let self = this;
            WXFileSystem.inst.wxFs.access({
                path: filePath,
                success: function () {
                    if (item.type && non_text_format.indexOf(item.type) !== -1) {
                        self.nextPipe(item, callback);
                    }
                    else {
                        self.readTextFile(item, callback);
                    }
                },
                fail: function (res) {
                    self.readFileFromLocal(item, callback);
                },
                complete: function (res) { }
            });
        }

        private readFileFromLocal(item: any, callback: Function) {
            // console.log("CocosWXDownloader readFileFromLocal", item.url);
            let localPath = WXFileSystem.inst.fsRoot + item.url;
            let fs = WXFileSystem.inst.wxFs;
            let self = this;
            function handleItem(item) {
                item.url = localPath;
                if (item.type && non_text_format.indexOf(item.type) !== -1) {
                    self.nextPipe(item, callback);
                }
                else {
                    self.readTextFile(item, callback);
                }
            }
            fs.access({
                path: localPath,
                success: function () {
                    // 加入缓存映射表中
                    WXFileSystem.inst.setFileLocalPath(item, localPath);
                    handleItem(item);
                },
                fail: function (res) {
                    // No remote server indicated, then continue to downloader
                    if (!CocosWXDownloader.REMOTE_SERVER_ROOT) {
                        callback(null, null);
                        return;
                    }
                    console.log("CocosWXDownloader try to downloadRemoteFile")
                    self.downloadRemoteFile(item, callback);
                },
                complete: function (res) { }
            });
            // }
        }

        private ensureDirFor(path: string, callback: Function) {
            // console.log("CocosWXDownloader ensureDirFor", path);
            var ensureDir = cc.path.dirname(path);
            if (ensureDir === "wxfile://usr" || ensureDir === "http://usr") {
                callback();
                return;
            }
            let self = this;
            WXFileSystem.inst.wxFs.access({
                path: ensureDir,
                success: function (res) {
                    callback(res);
                },
                fail: function (res) {
                    self.ensureDirFor(ensureDir, function () {
                        WXFileSystem.inst.wxFs.mkdir({
                            dirPath: ensureDir,
                            complete: function (res) {
                                callback(res);
                            },
                        });
                    });
                },
                complete: function (res) { }
            });
        }

        private async _downloadFile(url: string, callback: Function) {
            await WXFileSystem.inst.download(url).then(
                (res) => {
                    callback(true, res);
                },
                (error) => {
                    callback(false, error);
                }
            );
        }

        private downloadRemoteFile(item: any, callback: Function) {
            // console.log("CocosWXDownloader downloadRemoteFile", item);
            var relatUrl = item.url;

            // filter protocol url (E.g: https:// or http:// or ftp://)
            if (REGEX.test(relatUrl)) {
                // console.log("CocosWXDownloader downloadRemoteFile skip ", relatUrl);
                callback(null, null);
                return;
            }

            var remoteUrl = CocosWXDownloader.REMOTE_SERVER_ROOT + relatUrl;
            item.url = remoteUrl;
            let self = this;
            let fs = WXFileSystem.inst.wxFs;
            this._downloadFile(remoteUrl, (success: boolean, res: any) => {
                if (success) {
                    var temp = res.tempFilePath;
                    var localPath = WXFileSystem.inst.fsRoot + relatUrl;
                    // check and mkdir remote folder has exists
                    let uuid = WXFileSystem.inst.getItemUuid(item);
                    if (uncachedFileUuids.indexOf(uuid) < 0) {
                        self.ensureDirFor(localPath, function () {
                            // Save to local path
                            console.log("CocosWXDownloader saving file to ", localPath);
                            fs.saveFile({
                                tempFilePath: res.tempFilePath,
                                filePath: localPath,
                                success: function (res) {
                                    cc.log('save:' + localPath);
                                    WXFileSystem.inst.setFileLocalPath(item, localPath);
                                    console.log("CocosWXDownloader save file ", res.savedFilePath, "success, uuid = ", uuid);
                                    item.url = res.savedFilePath;
                                    if (item.type && non_text_format.indexOf(item.type) !== -1) {
                                        self.nextPipe(item, callback);
                                    }
                                    else {
                                        self.readTextFile(item, callback);
                                    }
                                },
                                fail: function (res) {
                                    // Failed to save file, then just use temp
                                    console.log(res && res.errMsg ? res.errMsg : `save file failed: ${remoteUrl}`);
                                    console.log('It might be due to out of storage spaces, you can clean your storage spaces manually.');
                                    item.url = temp;
                                    if (item.type && non_text_format.indexOf(item.type) !== -1) {
                                        self.nextPipe(item, callback);
                                    }
                                    else {
                                        self.readTextFile(item, callback);
                                    }
                                },
                                complete: function (res) { }
                            });
                        });
                    } else {
                        // console.log("file in uncached list, skip saving it to local ", item.rawUrl);
                        item.url = temp;
                        if (item.type && non_text_format.indexOf(item.type) !== -1) {
                            self.nextPipe(item, callback);
                        }
                        else {
                            self.readTextFile(item, callback);
                        }
                    }
                } else {
                    console.error("download file failed: ", remoteUrl, res);
                    // Continue to try download with downloader, most probably will also fail
                    callback({
                        status: 0,
                        errorMessage: res && res.errMsg ? res.errMsg : "Download file failed: " + remoteUrl
                    }, null);
                }
            });
        }

        private readTextFile(item: any, callback: Function) {
            // console.log("CocosWXDownloader readFile", item);
            let url = item.url;
            var encodingFormat = 'utf8';
            for (var i = 0; i < binary_format.length; i++) {
                if (url.endsWith(binary_format[i])) {
                    // read as ArrayBuffer
                    encodingFormat = '';
                    break;
                }
            }
            let fs = WXFileSystem.inst.wxFs;
            fs.readFile({
                filePath: url,
                encoding: encodingFormat,
                success: function (res) {
                    // console.log("CocosWXDownloader read file success: ", url);
                    var queue = cc.LoadingItems.getQueue(item);
                    queue.addListener(item.id, function (item) {
                        if (item.error) {
                            fs.unlink({
                                filePath: url,
                                success: function () {
                                    cc.log(`Load failed, removed local file ${url} successfully!`);
                                }
                            });
                        }
                    }, null);

                    if (res.data) {
                        item.states[cc.loader.downloader.id] = (<any>cc).Pipeline.ItemState.COMPLETE;
                        // console.log("CocosWXDownloader got file ", item);
                        callback(null, res.data);
                    }
                    else {
                        callback({
                            status: 0,
                            errorMessage: `Empty file: ${url}`
                        });
                    }
                },
                fail: function (res) {
                    console.error("CocosWXDownloader read file failed: ", url);
                    fs.unlink({
                        filePath: url,
                        success: function () {
                            cc.log(`Read file failed, removed local file ${url} successfully!`);
                        }
                    });
                    callback({
                        status: 0,
                        errorMessage: res && res.errMsg ? res.errMsg : `Read text file failed: ${url}`
                    });
                },
                complete: function (res) {

                }
            });
        }

        public static async initLoaders() {
            if (Core.DeviceUtils.isMiniGame()) {
                console.log("init wxloaders")
                await WXFileSystem.inst.initFilePathInfos();
                await CocosWXDownloader.inst.initHandlers();
                let re = await HotUpdate.MiniGameHotUpdateMgr.inst.hotUpdate();
                if (re.success) {
                    console.log("游戏启动，热更完毕");
                }
                else {
                    console.log("游戏启动，热更失败", re.reason);
                }
            }
        }

    }
}
