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


class FeeTable extends React.Component{

    /* 
        @constructor
        {string} start 始发站
        {string} end 终点站
    */
    constructor(props) {
        super(props);
        this.state = {
            start : undefined,
            end : undefined,
            adjList : props.data.adjList
        }
    }
    

    /* 
    
    */
    clickHandler(obj) {
        console.log(Dijkstra(obj.state.start, obj.state.end, obj.state.adjList));
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
            </div>
       );
    }
}

export default FeeTable;