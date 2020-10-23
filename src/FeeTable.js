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
import {Dijkstra} from './DataHandler';
import { Container } from '@material-ui/core';


class FeeTable extends React.Component{

    /* 
        @constructor
        {string} start 始发站
        {string} end 终点站
        {Dict} adjList 图的邻接表
        {number} distance 最终显示距离 
    */
    constructor(props) {
        super(props);
        this.state = {
            start : undefined,
            end : undefined,
            adjList : props.data.adjList,
            distance : 0
        }
    }
    

    /* 
    
    */
    clickHandler(obj) {
        obj.setState({
            distance :  Dijkstra(obj.state.start, obj.state.end, obj.state.adjList)
        });
    }
    

    render() {
       return (
            <div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <DirectionsSubwayIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="start" label="始发站" onChange={(e)=>{
                            this.setState({
                                start : e.target.value
                            });
                        }}/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <DirectionsRailwayIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="end" label="终点站" onChange={(e) => {
                            this.setState({
                                end : e.target.value
                            });
                        }}/>
                    </Grid>
                </Grid>

                <IconButton aria-label="go" color="primary" onClick={() => this.clickHandler(this)}>
                    <DirectionsIcon />
                </IconButton>

                <Container spacing={10}>
                    {this.state.start} 到 {this.state.end} 的距离为 {this.state.distance.toFixed(3)} KM
                </Container>
            </div>
       );
    }
}

export default FeeTable;