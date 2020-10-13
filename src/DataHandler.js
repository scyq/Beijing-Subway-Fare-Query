class Station {
    constructor(name) {
        this.name = name;
    }
}


class DataHandler{

    /* 
        lineNumbers 数字，线路数量
        lineInfoArr 数组，每条线路的信息
    */

    constructor(lineNumbers, lineInfoArr) {
        this.lineNumbers = lineNumbers;
        this.lineInfoArr = lineInfoArr;
    }
};

export default DataHandler;