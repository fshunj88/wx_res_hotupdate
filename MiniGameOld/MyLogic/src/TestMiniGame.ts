class TestMiniGame {

    private static _inst: TestMiniGame = null;

    public static get inst(): TestMiniGame {
        if (this._inst == null) {
            this._inst = new TestMiniGame();
        }
        return this._inst;
    }

    private _tempFilePath: string;

    public async run() {
        console.log("TestMiniGame..");
        //await this.test1();
        await this.test2();
    }

    public async test1() {
        //清空所有缓存
        let rootDir = `${(<any>wx).env.USER_DATA_PATH}`;
        console.log("当前本地用户目录根目录如下：");
        //检测目录aaa是否在代码包中,
        //if (await this.isDirOrFileExist(`aaa`)) {
        //    console.log("aaa 目录 exist");
        //}
        //else{
        //    console.log("aaa 目录 不存在");
        //}
        await this.testCreateDir("aaa");//创建目录aaa在用户本地目录
        await this.testListDir(`${rootDir}`);
        if (await this.isDirOrFileExist(`aaa`)) {
            console.log("aaa 目录 存在于本地用户目录");
        }
        else {
            console.log("aaa 目录 不存在");
        }

        if (await this.isDirOrFileExist(`${rootDir}/kk`)) {
            console.log("dir-kk exist");
            await this.testRmDirRecursive(`${rootDir}/kk`);
        }
        if (await this.isDirOrFileExist(`${rootDir}/myZip.zip`)) {
            console.log("myZip.zip exist");
            await this.testUnlinkFile(`${rootDir}/myZip.zip`);
        }
        if (await this.isDirOrFileExist(`${rootDir}/json_1.1.txt`)) {
            console.log("json_1.1.txt exist");
            await this.testUnlinkFile(`${rootDir}/json_1.1.txt`);
        }
        console.log("清空缓存后--");
        await this.testListDir(`${rootDir}`);
        await this.testListDir(`${rootDir}/gamecaches`);
        //await WXGame.CocosWXDownloader.initLoaders();
        //this.testMiniGame();
        //this.test1();
        await this.testCreateDir("kk");//创建目录kk
        await this.testWriteFile();//创建文件kk/tmp.txt,并且写入数据
        await this.testListDir(`${rootDir}`);
        await this.testListDir(`${rootDir}/kk`);
        await this.testAccessDirAndRead();//进入kk/tmp.txt读取文件并且输出
        await this.testUnlinkFile(`${(<any>wx).env.USER_DATA_PATH}` + `/kk/tmp.txt`);
        //删除后再展示kk目录
        await this.testListDir(`${rootDir}/kk`);
        //从服务器下载zip文件到临时目录;
        await this.testDownloadFile();

        //保存到本地用户目录USER_DATA_PATH/myZip.zip下,这个保存是移动；
        //await this.testSaveFile();
        //列出USER_DATA_PATH的压缩文件名字
        //await this.testListDir(`${rootDir}`);

        //把临时目录的压缩文件http://tmp/mirTQti8tDOf832e79c10dc4f9cda9872f4da0c16db1.zip
        //解压到本地用户目录的根目录,解压后json_1.1.txt就在根目录上了
        await this.unzipFile(`${rootDir}`);
        //列出根目录当前所有文件夹和文件,可以看到json_1.1.txt
        await this.testListDir(`${rootDir}`);
        //读取压缩文件json_1.1.txt
        await this.testFileExistAndRead(`${rootDir}/json_1.1.txt`);
    }

    public async testWriteFile() {
        const FileSystemManager = wx.getFileSystemManager()
        return new Promise<void>(
            (resolve, reject) => {
                //writeFile(object: {filePath:string,data:string|ArrayBuffer,encoding:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
                FileSystemManager.writeFile({
                    filePath: (<any>wx).env.USER_DATA_PATH + '/kk/tmp.txt',
                    data: '1111',
                    encoding: 'utf8',
                    success: res => {
                        console.info("write success:" + res);
                        resolve();
                    },
                    fail: err => {
                        console.info("write failed:", err.error, ":", err.errMsg);
                        reject();
                    },
                    complete: null
                })
            })
    }



    public async testListDir(path: string) {
        const fs = wx.getFileSystemManager()
        return new Promise<void>(
            (resolve, reject) => {
                //readdir(object: {dirPath:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
                fs.readdir({
                    dirPath: `${path}`,
                    success(res) {
                        console.log(`success to list dir:${path}--->`, res.files);
                        resolve();
                    },
                    fail(err) {
                        console.error("list dir err", err.errMsg)
                        reject();
                    },
                    complete: null
                });
            });

        //(function(){ 
        //            let rootDir = `${wx.env.USER_DATA_PATH}`;
        //            const fs = wx.getFileSystemManager()
        //            fs.readdir({
        //                dirPath: `${rootDir}/zip`,
        //                success(res) {
        //                    console.log(`success to list dir:`, res.files);
        //                },
        //                fail(err) {
        //                    console.error("list dir err", err.errMsg)
        //                },
        //                complete: null
        //            });
        //})();


    }

    public async testFileExistAndRead(filePath: string) {
        const FileSystemManager = wx.getFileSystemManager();
        return new Promise<void>(
            (resolve, reject) => {
                let path = `${filePath}`;
                let success = (res) => {
                    console.log(`${filePath} 存在:`, res)
                    //readFile(object: {filePath:string,encoding:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
                    FileSystemManager.readFile({
                        filePath: filePath,
                        encoding: 'utf8',
                        success: function (res) {
                            console.log(`${filePath} 内容是-->`, res.data)
                            resolve();
                        },
                        fail: (err) => { console.log(`read ${filePath} failed;`); },
                        complete: null
                    });
                }

                let fail = (err) => {
                    console.log("fail to access dir ", filePath, err);
                    reject();
                };

                let complete = () => {
                    console.log("complete");
                };
                FileSystemManager.access({ path: path, success: success, fail: fail, complete: complete });
            });


    }

    public async isDirOrFileExist(dirOrFile: string) {
        const FileSystemManager = wx.getFileSystemManager();
        return new Promise<boolean>(
            (resolve, reject) => {
                let path = dirOrFile;
                let success = (res) => {
                    console.log(`${dirOrFile}-存在`, res)
                    resolve(true);
                }
                let fail = (err) => {
                    console.log(`${dirOrFile} does not exit`, err);
                    resolve(false);
                };
                let complete = () => {
                };
                FileSystemManager.access({ path: path, success: success, fail: fail, complete: complete });
            });
    }

    public async testAccessDirAndRead() {
        const FileSystemManager = wx.getFileSystemManager();
        return new Promise<void>(
            (resolve, reject) => {
                let path = `${(<any>wx).env.USER_DATA_PATH}/kk`;
                let success = (res) => {
                    console.log('kk目录存在', res)
                    //readFile(object: {filePath:string,encoding:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
                    FileSystemManager.readFile({
                        filePath: (<any>wx).env.USER_DATA_PATH + '/kk/tmp.txt',
                        encoding: 'utf8',
                        success: function (res) {
                            console.log("kk/tmp.txt is:-->", res.data)
                            resolve();
                        },
                        fail: (err) => { console.log("read file kk/tmp.txt failed;"); },
                        complete: () => { console.log("read file kk/tmp.txt completed;"); }
                    });
                }

                let fail = (err) => {
                    console.log("fail to access dir kk", err);
                    reject();
                };

                let complete = () => {
                    console.log("complete");
                };
                FileSystemManager.access({ path: path, success: success, fail: fail, complete: complete });
            });

    }

    public async testCreateDir(dirName: string) {
        const FileSystemManager = wx.getFileSystemManager();
        return new Promise<void>(
            (resolve, reject) => {
                FileSystemManager.mkdir({
                    dirPath: `${(<any>wx).env.USER_DATA_PATH}/${dirName}`,
                    success(res) {
                        console.log('success make dir', res);
                        resolve();
                    },
                    fail(err) {
                        console.log('fail to make dir', err);;
                        reject();
                    },
                    complete(err) {
                        console.log('complete', err);;
                    }
                })
            });
    }

    public async testUnlinkFile(path: string) {
        //只能删除本地用户目录的文件，其他目录没权限写入或者删除;
        const fs = wx.getFileSystemManager()
        return new Promise<void>(
            (resolve, reject) => {
                fs.unlink({
                    filePath: path,
                    success(res) {
                        console.log(`success to delete file:${path}`, res);
                        resolve();
                    },
                    fail(err) {
                        console.error(`fail to delete file:${path}`, err.errMsg);
                        reject();
                    }
                })
            });
    }

    public async testRmDirRecursive(path: string) {
        const fs = wx.getFileSystemManager()
        return new Promise<void>(
            (resolve, reject) => {
                let option = {
                    dirPath: path,
                    recursive: true,
                    success: (v) => {
                        console.log(`delete dir:${path}`);
                        resolve(v);
                    },
                    fail: (e) => {
                        console.error("delete dir error:", e.errMsg);
                        reject(null);
                    },
                    complete: (res) => {

                    }
                }
                fs.rmdir(option);
            });
    }

    public async testDownloadFile() {
        const fs = wx.getFileSystemManager()
        return new Promise<void>(
            (resolve, reject) => {
                let url = "https://fshunj.oss-cn-guangzhou.aliyuncs.com/zip/json_1.1.zip"
                let option = {
                    url: url,
                    success: (v) => {
                        //v.statusCode是开发者服务器返回的HTTP状态码；
                        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                        if (v.statusCode >= 400) {
                            reject(null);
                        }
                        else {
                            console.log("download success:", v);
                            this._tempFilePath = v.tempFilePath;
                            resolve(v);
                        }
                    },
                    fail: (e) => {
                        console.error("download error:", e.errMsg);
                    },
                    complete: (res) => {

                    }
                }
                //downloadFile(object: {url:string,header?:Object,filePath?:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): DownloadTask;
                wx.downloadFile(option);
            })
    }

    public async testSaveFile() {
        const FileSystemManager = wx.getFileSystemManager();
        return new Promise<void>(
            (resolve, reject) => {
                //空字符串""被判定为false
                //注意wx.env.USER_DATA_PATH}/myZip.zip这个文件必须目前是不存在的，否则会发生错误
                if (this._tempFilePath) {
                    let option = {
                        tempFilePath: this._tempFilePath,
                        filePath: `${(<any>wx).env.USER_DATA_PATH}/myZip.zip`,
                        success: (res) => {
                            console.log("save file success:保存后的文件路径是 ", res);
                            resolve(res);
                        },
                        fail: (e) => {
                            console.error("save file failed:", e.errMsg);
                            reject();
                        },
                        complete: () => {

                        }
                    }
                    console.log("options is ", option);
                    FileSystemManager.saveFile(option);
                }
                else {
                    reject();
                }
            });
    }

    public async unzipFile(path: string) {
        const FileSystemManager = wx.getFileSystemManager();
        return new Promise<void>(
            (resolve, reject) => {
                const fs = wx.getFileSystemManager();
                fs.unzip({
                    zipFilePath: `${this._tempFilePath}`,
                    targetPath: `${path}`,
                    success(res) {
                        console.log("unzip success!", res);
                        resolve(res);
                    },
                    fail(err) {
                        console.log('fail', err.errMsg, "errCode:", err.errCode);
                        reject();
                    },
                    complete() {

                    }
                })

            });

    }

    public async testMiniGame() {
        //WXGame.WXFileSystem.inst.loadRemoteImportZipFile("json_1.1.zip", (res) => {
        //console.log("res.totalBytesWritten", res.totalBytesWritten, "---res.totalBytesExpectedToWrite:", res.totalBytesExpectedToWrite)
        //})
    }

    public async load204Card() {
        return new Promise<void>(
            (resolve, reject) => {
                cc.loader.loadRes('card_m/204', cc.Texture2D, function (err, tex2d) {
                    resolve();
                });
            });
    }

    public async test2() {
        await this.load204Card();
        //释放资源
        cc.loader.release("card_m/204");
        //此时本地用户目录仍然存在204这张图片，以及res/import/0b/0b37b3363.8e95d.json这个pack资源；
        //console.log("remoteDownloader:" + (<any>cc).RemoteDownloader.inst);

    }


    public async test3() {
        setTimeout(async () => {
            console.log("1");
            await this.test2();
            setTimeout(async () => {
                console.log("2");
                //释放资源
                cc.loader.release("card_m/205");
                //让RemoteDownloader彻底卸载
                //再次加载
                await this.test2();
                console.log("3");
            }, 5000);
        }, 5000);
    }

}
