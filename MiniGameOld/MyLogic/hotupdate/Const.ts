namespace HotUpdate {
    //没有热更新的时候，从原目录CUR_RES_URL_ROOT中读取,热更后，从HOT_UPDATE_URL_ROOT读取
    export let CUR_RES_URL_ROOT = "https://fshunj.oss-cn-guangzhou.aliyuncs.com/MiniGameRes/cur/";
    export let HOT_UPDATE_URL_ROOT = "https://fshunj.oss-cn-guangzhou.aliyuncs.com/MiniGameRes/LatestVer/";
    //export let NATIVE_VERSION_API_URL = HOT_UPDATE_URL_ROOT + "version?";
    //export let NATIVE_PATCH_API_URL = HOT_UPDATE_URL_ROOT + "fetch_patch?";
    //export let NATIVE_APK_URL_ROOT = HOT_UPDATE_URL_ROOT + "static/apks/";
    //export let NATIVE_LOCAL_CACHED_DIR = "tcg-remote-assets";
    export let MINIGAME_VERSION_API_URL = HOT_UPDATE_URL_ROOT + "mini_version.txt";
    export let MINIGAME_RES_URL_ROOT = HOT_UPDATE_URL_ROOT;
}

