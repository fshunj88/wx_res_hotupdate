class Entry {

    private static _inst: Entry = null;

    public static get inst(): Entry {
        if (this._inst == null) {
            this._inst = new Entry();
        }
        return this._inst;
    }

    public async enterMain() {
        //往资源加载管线中插入自己定义的wxDownloader来替代小游戏下默认的RemoteDownloader
        await WXGame.CocosWXDownloader.initLoaders();
        Test.inst.run();
    }
}


function main() {
    Entry.inst.enterMain();
}

function start() {

}

function update() {

}

function destroy() {

}

if (!window["GameLogic"]) {
    window["GameLogic"] = {};
}
window["GameLogic"]["entry"] = main;
window["GameLogic"]["start"] = start;
window["GameLogic"]["update"] = update;
window["GameLogic"]["destroy"] = destroy;
