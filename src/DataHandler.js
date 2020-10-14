class Station {
    /*
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
        @param
        {Dict} StationController 存储所有站的信息，每个信息对应的是一个Station对象
    */
    constructor() {
        this.StationController = {

        };
    }

    /*
        处理数据的类
     */

     /*
        用于把地铁各站间的数据分开，提取对应站点
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
            // console.log(tempLine);
            var lineName = tempLine[1]; // 地铁线路名称 {string}
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
};

export default DataHandler;
export {Station};