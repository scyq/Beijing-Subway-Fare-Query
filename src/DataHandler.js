/*
    @18105226 陈宇卿
    数据存储和处理类
*/

class Station {
    /*
        @constructor
        站点信息
        @param
        {string} name 站点名称
        {Array{string}} onLine 在几号线上
    */
    constructor(name) {
        this.name = name;
        this.onLine = new Set();
    }
}


class DataHandler{

    /*
        @constructor
        处理数据的类
        @param
        {Dict} StationController 存储所有站的信息，每个信息对应的是一个Station对象
        {Array{string}} allLine 存所有线路的原始信息，注意名字没有去掉\r
        {Array{Array}} lineInfo 二位数组，0存线路名称，1成站点数
    */
    constructor() {
        this.StationController = {

        };
        this.allLine = [];
        this.lineInfo = [];
    }

    /*
        @function cutLine
        用于把地铁各站间的数据分开，提取对应站点、线路
        @param
        {Array} txtArr 读入后被分割的txt数组 注意要保留地铁线路数
        {string} spliter 分割符，不填入默认为中文逗号
    */
    cutLine(txtArr, spliter) {
        var real_spliter = undefined;
        if (arguments.length < 2) real_spliter = "，";
        else real_spliter = spliter;
        var linesCounts = txtArr[0];
        for (var i = 1; i <= linesCounts; i++){
            var tempLine = txtArr[i].split(real_spliter);
            this.allLine.push(tempLine);
            // console.log(tempLine);
            var lineStationCnts = parseInt(tempLine[2]);  // 地铁线路总站数
            var lineName = tempLine[1]; // 地铁线路名称 {string}
            this.lineInfo.push([lineName, lineStationCnts]);
            // 遍历每个站
            for (var j = 3; j < tempLine.length; j+=2) {
                // 名字必须要去掉 \r 等回车换行符
                var stationName = tempLine[j].replace(/[\r\n]/g,"");
                if (this.StationController.hasOwnProperty(stationName)) {                    
                    this.StationController[stationName].onLine.add(lineName);
                } 
                else {
                    this.StationController[stationName] = new Station(stationName);
                    this.StationController[stationName].onLine.add(lineName);
                }
            }
        }
    }

    /*
        @function createAdjList
        创建邻接表
        @param
        
    */
    createAdjList() {
        
    }
};

export default DataHandler;
export {Station};