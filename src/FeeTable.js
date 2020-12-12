/*
    @18105226 陈宇卿
    输入起终点 费用表
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DirectionsSubwayIcon from '@material-ui/icons/DirectionsSubway';
import DirectionsRailwayIcon from '@material-ui/icons/DirectionsRailway';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Dijkstra } from './DataHandler';
import { Container } from '@material-ui/core';
import StickyHeadTable from './theTable';


class FeeTable extends React.Component {

    /* 
        @constructor
        {string} start 始发站
        {string} end 终点站
        {Dict} adjList 图的邻接表
        {string} shortestPath 最短路径
        {string} output 需要输出的提示语
        {number} fee 地铁所需的费用
        {bool} checked 是否提出查询请求，没提出之前提示语不一样
        {Array} tableRows 表格渲染的每一行
    */
    constructor(props) {
        super(props);
        this.state = {
            start: undefined,
            end: undefined,
            adjList: props.data.adjList,
            shortestPath: "",
            output: "",
            fee: 0,
            checked: false,
            tableRows : []
        }
    }

    /* 根据是否点击来渲染不同的内容，点击前是提示，点击后是结果 */
    contentSelector(obj) {
        if (obj.state.checked) {
            return (
                <div>
                    <Container spacing={10}>
                        {obj.state.output}
                    </Container>

                    <Container>
                        最短路径为 {obj.state.shortestPath}
                    </Container>

                    <Container spacing={10}>
                        本线路地铁费用为 {obj.state.fee} 元
                    </Container>

                    <StickyHeadTable tableRows={obj.state.tableRows}>

                    </StickyHeadTable>
                </div>
            );
        }
        else {
            return (
                <Container>
                    请输入起点站和终点站，点击蓝色按钮进行查询。
                </Container>
            )
        }
    }


    /* 
    
    */
    clickHandler(obj) {
        obj.setState({
            checked: true
        });
        let algorithmInfo = Dijkstra(obj.state.start, obj.state.end, obj.state.adjList);
        if (algorithmInfo === -1) {      /* 输入有误 */
            obj.setState({
                output: "没有查询到对应站点"
            });
        }
        else {
            let distance = algorithmInfo[0];
            /* 把路径变成字符串 */
            let path = "";
            for (let i = 0; i < algorithmInfo[1].length; i++) {
                path += algorithmInfo[1][i];
                if (i < algorithmInfo[1].length - 1) {
                    path += " -> ";
                }
            }
            let output = obj.state.start + "到" + obj.state.end + "的距离为" + distance.toFixed(3) + "KM";
            this.setState({
                output: output,
                shortestPath: path,
                fee: algorithmInfo[2],
                tableRows: algorithmInfo[3]
            });
        }

    }


    render() {
        return (
            <div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <DirectionsSubwayIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="start" label="始发站" onChange={(e) => {
                            this.setState({
                                start: e.target.value
                            });
                        }} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <DirectionsRailwayIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="end" label="终点站" onChange={(e) => {
                            this.setState({
                                end: e.target.value
                            });
                        }} />
                    </Grid>
                </Grid>

                <IconButton aria-label="go" color="primary" onClick={() => this.clickHandler(this)}>
                    <DirectionsIcon />
                </IconButton>

                {this.contentSelector(this)}
            </div>
        );
    }
}

export default FeeTable;