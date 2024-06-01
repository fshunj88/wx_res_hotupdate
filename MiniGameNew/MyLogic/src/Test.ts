class Test {

    private static _inst: Test = null;

    public static get inst(): Test {
        if (this._inst == null) {
            this._inst = new Test();
        }
        return this._inst;
    }

    public async run() {
        console.log("run start");
        TestHotUpdate.inst.run();
    }
}