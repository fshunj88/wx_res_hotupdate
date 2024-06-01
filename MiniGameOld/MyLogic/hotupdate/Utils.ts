namespace HotUpdate {
    /*
     * 1: v1 > v2   0: v1 == v2   -1: v1 < v2
    */
    export function compareVersion(v1: string, v2: string): number {
        console.log("版本号:",v1, v2);
        let version1 = v1.split(".");
        let version2 = v2.split(".");
        //version1_remote = 1.4.3
        //version2_local = 1.2.3
        //则需要更新
        //版本完全相等，则返回0
        if (version1.length != version2.length) {
            return 1;
        } else {
            let len = version1.length;
            let i = 0;
            for (; i < len; ++ i) {
                let _v1 = parseInt(version1[i]);
                let _v2 = parseInt(version2[i]);
                if (_v1 > _v2) {
                    return 1;
                } else if (_v1 < _v2) {
                    return -1;
                }
            }
            return 0;
        }
    }

    export class OpRet {
        public errcode: number;
        protected _errcode2Msg = {
            // web服务器返回码
            1000: "参数错误",
            1001: "找不到对应版本号",
            1002: "请下载安装最新的版本",
            1003: "版本号错误",
            // native下载逻辑返回码
            2000: "文件失效", // 404
            2001: "请求超时",
            2002: "下载失败",
            2003: "正在下载",
            2004: "文件名非法",
            2005: "无法创建下载文件",
            2006: "无法移除旧的文件",
            2007: "解压资源失败",
            // 小游戏下载返回码
            3000: "下载资源库配置文件失败",
            3001: "保存资源库配置文件失败",
            3002: "下载配置文件失败",
            // native安装逻辑返回码
            4000: "无法获取安装权限",
            4001: "无法调起安装器",
            // http客户端返回码
            9000: "服务器错误",
            9001: "请求超时",
            9002: "请检查网络",
        }

        public isSuccess(): boolean {
            return this.errcode == 0;
        }
    }

    export class CheckVersionRet extends OpRet {
        public remoteVersion: string;
        public remoteApkVersion: number = -1;

        public errorMessage(): string {
            return "[检测版本]" + this._errcode2Msg[this.errcode] || "未知错误";
        }
    }

    export class MiniGameCheckVersionRet extends CheckVersionRet {
        public serverlist: any;
    }

    export class FetchPatchRet extends OpRet {
        public patchUri: string;

        public errorMessage(): string {
            return "[获取信息]" + this._errcode2Msg[this.errcode] || "未知错误";
        }
    }

    export class DownloadPatchRet extends OpRet {
        public errorMessage(): string {
            return "[下载]" + this._errcode2Msg[this.errcode] || "未知错误";
        }
    }

    export class ApkUpdateRet extends OpRet {
        public errorMessage(): string {
            return "[版本更新]" + this._errcode2Msg[this.errcode] || "未知错误";
        }
    }

    export class HotUpdateObserver {
        public onCheckVersion: () => void;
        public onCheckVersionDone: (errcode: number, message: string) => void;
        public onFetchPatchUri: () => void;
        public onFetchPatchUriDone: (errcode: number, message: string) => void;
        public onDownload: () => void;
        public onDownloadProgress: (current: number, total: number) => void;
        public onUnzipProgress: (current: number, total: number) => void;
        public onDownloadDone: (errcode: number, message: string) => void; 
    }

    export class ApkUpdateObserver {
        public onDownload: () => void;
        public onDownloadProgress: (current: number, total: number) => void;
        public onDownloadDone: (errcode: number, message: string) => void;
    }
}