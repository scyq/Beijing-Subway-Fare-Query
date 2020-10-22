/*
    @18105226 陈宇卿
    数据存储和处理类
*/

/*
    存站点信息的类
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

/*
    存边信息的类
*/
class Edge {
    /*
        @constructor
        构造边
        @param
        {string} from 前驱节点
        {string} to 后驱节点
        {number} distance 两个节点相隔距离
    */
    constructor(from, to, distance) {
        this.from = from;
        this.to = to;
        this.distance = distance;
    }

    /*
        @static function createDoubleEdge
        真实调用的创建双向边的辅助方法
        @param
        {DataHandler} obj 用于直接修改对象的邻接表
        {string} preNode 前驱节点
        {string} postNode 后驱节点
        {number} distance 相隔距离
     */
    static createDoubleEdge(obj, preNode, postNode, distance) {
        if (obj.adjList.hasOwnProperty(preNode)) {
            obj.adjList[preNode].push(new Edge(preNode, postNode, distance));
        }
        else {
            obj.adjList[preNode] = [];
            obj.adjList[preNode].push(new Edge(preNode, postNode, distance));
        }

        if (obj.adjList.hasOwnProperty(postNode)) {
            obj.adjList[postNode].push(new Edge(postNode, preNode, distance));
        }
        else {
            obj.adjList[postNode] = [];
            obj.adjList[postNode].push(new Edge(postNode, preNode, distance));
        }
    }

}

/*
    Dijkstra 算法
    @static function Dijkstra
    求两点最短路径
    @param
    {string} start 始发站
    {string} end 终点站
    {Dict} adjList 邻接表
    @return 
    {number} res 最短距离
*/
function Dijkstra(start, end, adjList) {
    let arrived = [start];  /* 到达过的点 */
    let lastNode = start; /* 上一次走过的点 */
    while (lastNode !== end) {
        let min = [undefined, parseFloat(Number.MAX_SAFE_INTEGER)];     /* 0号位置存站点，1号位置存最短距离 */
        for (let node of arrived) {     /* 对于所有可达集合内的元素进行遍历 */
            let tempAdj = adjList[node];    /* 该元素的邻接表 */
        } 
    }
}


class DataHandler{

    /*
        @constructor
        处理数据的类
        @param
        {Dict} StationController 存储所有站的信息，每个信息对应的是一个Station对象
        {Array{string}} allLine 存所有线路的原始信息，注意名字没有去掉\r
        {Array{Array}} lineInfo 二位数组，0存线路名称，1存站点数
        {Dict} adjList 地铁线路邻接表
    */
    constructor() {
        this.StationController = {

        };
        this.allLine = [];
        this.lineInfo = [];
        this.adjList = {};
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
            this.allLine.push(tempLine);                         /* 添加线路信息 */
            var lineStationCnts = parseInt(tempLine[2]);         /* 地铁线路总站数 */
            var lineName = tempLine[1];                          /* 地铁线路名称 {string} */
            this.lineInfo.push([lineName, lineStationCnts]);     /* 线路信息，站点名称-站点数量 */
            /* 对于每一条线，遍历每个站 */
            for (var j = 3; j < tempLine.length; j+=2) {
                // 名字必须要去掉 \r 等回车换行符
                var stationName = tempLine[j].replace(/[\r\n]/g,"");
                var nextStationName = undefined;    /* 下一站的名称 */
                if (j !== (tempLine.length - 1)) nextStationName = tempLine[j + 2].replace(/[\r\n]/g,"");    /* 如果不是最后一站，则建立和下一站的边 */

                if (this.StationController.hasOwnProperty(stationName)) {           /* 已经遍历过的站 */          
                    this.StationController[stationName].onLine.add(lineName);
                } 
                else {  /* 如果这是没有遍历过的点 */
                    this.StationController[stationName] = new Station(stationName);
                    this.StationController[stationName].onLine.add(lineName);
                }

                /* 建立邻接表 */
                if (nextStationName) {
                    Edge.createDoubleEdge(this, stationName, nextStationName, parseFloat(tempLine[j+1]));
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
export {Dijkstra};