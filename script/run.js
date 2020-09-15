// 变量定义

// 存放地图信息的表
var mapData = undefined;
var viewportMaxX = 2000;    // 视窗最大X
var viewportMaxY = 2000;    // 视窗最大Y
var stationDrawer;  // 地铁站绘图
var stationRadius;  // 地铁站半径
var lineDrawer;

// captionOffset是地铁站的文字说明关于地铁站图标的偏移量
var captionOffsetMaxX = 70;
var captionOffsetMaxY = 50;

// 类定义
/*
    地铁站基础原型
    x: 绘制的x坐标
    y: 绘制的y坐标
    name: 地铁站名称
    id: 地铁站标识符（纯数字）
    captionOffsetX: 站台文字相对站台图形的x轴偏移
    captionOffsetY: 站台文字相对站台图形的y轴偏移
 */
var StationSavingPrototype = {
    x: 200,
    y: 200,
    name: "unnamed",
    id: undefined,
    captionOffsetX: 0,
    captionOffsetY: 0

}

var StationPrototype = {
    _nested_: undefined,
    _elementStation_: undefined,
    _elementCaption_: undefined,

    set nested (value) {
        if (this._nested_ !== undefined)
            this._nested_.remove();
        this.nested = value;
    },

    get nested () {
        return this._nested_;
    },

    removeNested: function () {
        this._nested_ = undefined;
    },

    get elementStation () {
        return this._elementStation_;
    },

    get elementCaption () {
        return this._elementCaption_;
    },

    draw: function () {
        this._nested_ = drawStationLayer.nested();
    }

};

// 创建SVG绘图工具
SVG.on(document, "DOMContentLoaded", function(){
    var draw = SVG().addTo('#subwayDisplay').size("100%", "100%").viewbox(0, 0, viewportMaxX, viewportMaxY);
    var borderRect = draw.rect(viewportMaxX, viewportMaxY - 2 * stationRadius).move(0, stationRadius * 2).stroke({color: "grey", width: 5}).fill("transparent");
    lineDrawer = draw.nested();
    stationDrawer = draw.nested();

});

// 绑定折叠页样式
$("#funcSwitcher").accordion();

// 添加车站按钮
$('#addConfirm').button().click(
    ()=>{

    }
);


$('#addLineConfirm').button();
$("#removeNodeConfirm").button();
$('#removeLineConfirm').button();
$('#clearAll').button();
$('#saveToLocal').button();
$('#loadFromLocal').button();
$('#importJson').button();
$('#exportJson').button();

