class TestHotUpdate {
    private static _inst: TestHotUpdate = null;

    public static get inst(): TestHotUpdate {
        if (this._inst == null) {
            this._inst = new TestHotUpdate();
        }
        return this._inst;
    }

    public async run() {
        console.log("TestHotUpdate start");
        let btn = cc.find("Canvas/hotUpdate");
        if (btn) {
            btn.on(cc.Node.EventType.TOUCH_END, async () => {
                await this.testHotUpdate();
                await this.test2_new();
            })
        }
        //第一次加载，从旧服务器中取出204.png;
        await this.test2();
        setTimeout(() => {
            console.log("cc.loader._cache:", cc.loader["_cache"]);
        }, 10);
    }

    public async testHotUpdate() {
        let ob = new HotUpdate.HotUpdateObserver();
        ob.onCheckVersion = () => {
            console.log("onCheckVersion");
        };
        ob.onCheckVersionDone = (errcode: number, message: string) => {
            console.log("onCheckVersionDone--", errcode, message);
        };
        ob.onFetchPatchUri = () => {
            console.log("onFetchPatchUri");
        };
        ob.onFetchPatchUriDone = (errcode: number, message: string) => {
            console.log("onFetchPatchUriDone");
        };
        ob.onDownload = () => {
            console.log("onDownload");
        };
        ob.onDownloadProgress = (current: number, total: number) => {
            console.log("onDownloadProgress--", "current:", current, "--", "total:", total);
        };
        ob.onUnzipProgress = (current: number, total: number) => {
            console.log("onUnzipProgress--");
        };
        ob.onDownloadDone = (errcode: number, message: string) => {
            console.log("onDownloadDone");
        };
        HotUpdate.MiniGameHotUpdateMgr.inst.registerObserver(ob);
        await HotUpdate.MiniGameHotUpdateMgr.inst.hotUpdate();
        console.log("热更完毕");
    }

    public test1() {
        console.log("热更后，就有了206这张图片了，这时候加载这个图片");
        cc.loader.loadRes('card_m/206', cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            let spriteNode = cc.find("Canvas/sprite");
            const sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
        });

    }

    public async test2() {
        return new Promise<boolean>((resolve, reject) => {
            cc.loader.loadRes('card_m/204', cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    cc.error(err.message || err);
                    reject(false);
                }
                let spriteNode = cc.find("Canvas/sprite");
                const sprite = spriteNode.addComponent(cc.Sprite);
                sprite.spriteFrame = spriteFrame;
                resolve(true);
            });
        });
    }

    public async test2_new() {
        //此时cdn资源服务器更新了;
        let spriteNode = cc.find("Canvas/sprite");
        let sprite = spriteNode.getComponent(cc.Sprite);
        let sf = sprite.spriteFrame;
        let t2d = sf.getTexture();
        console.log("原spriteFrame信息：", sf);
        //无感知热更必须把原来的spriteFrame和t2d都从内存缓存_cache数组卸载掉,这部分融合到具体项目需要自己进行手动释放
        cc.loader.release(sf);
        cc.loader.release(t2d);
        spriteNode.removeComponent(sprite);
        //重新加载204.png
        return new Promise<boolean>((resolve, reject) => {
            cc.loader.loadRes('card_m/204', cc.SpriteFrame, function (err, spriteFrame) {
                console.log("新spriteFrame信息：", spriteFrame);
                if (err) {
                    cc.error(err.message || err);
                    reject(false);
                }
                let spriteNode = cc.find("Canvas/sprite");
                const sprite = spriteNode.addComponent(cc.Sprite);
                sprite.spriteFrame = spriteFrame;
                setTimeout(() => {
                    console.log("cc.loader._cache:", cc.loader["_cache"]);
                    resolve(true);
                }, 10);

            });
        });
    }

}