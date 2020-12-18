/*
    @18105226 陈宇卿
    输入起终点 费用表
 */

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DirectionsSubwayIcon from '@material-ui/icons/DirectionsSubway';
import DirectionsRailwayIcon from '@material-ui/icons/DirectionsRailway';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import InfoIcon from '@material-ui/icons/Info';
import { Dijkstra } from './DataHandler';
import { Container } from '@material-ui/core';
import StickyHeadTable from './theTable';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    searchIcon: {
        width: 50,
        height: 50
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Search(props) {
    const [start, setStart] = useState(undefined);
    const [end, setEnd] = useState(undefined);
    const [shortestPath, setPath] = useState("");
    const [output, setOutput] = useState("");
    const [fee, setFee] = useState(0);
    const [checked, setCheck] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    /* 查询提示 */
    const [searchHint, setHint] = useState(0);

    const classes = useStyles();

    const contentSelector = (hint) => {
        let hintInfo;
        switch (hint) {
            case 0:
                hintInfo = (
                    <Alert severity="info">请点击左侧按钮查询，右侧按钮查看详情。</Alert>
                );
                break;
            case 1:
                hintInfo = (
                    <Alert severity="success">查询成功！</Alert>
                );
                break;
            case 2:
                hintInfo = (
                    <Alert severity="error">查询不到对应站点！</Alert>
                );
                break;
            default:
                hintInfo = null;
                break;
        }

        return (
            props.open &&
            hintInfo
        );
    }

    const Info = () => {
        if (!checked) {
            return (
                <Backdrop className={classes.backdrop} open={showInfo} onClick={() => { setShowInfo(false) }}>
                    <h1 style={{ color: 'White', fontSize: '100px', fontWeight: 'Bold' }}>
                        请先查询。
                    </h1>
                </Backdrop>
            );
        }
        return (
            <Backdrop className={classes.backdrop} open={showInfo} >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <IconButton aria-label="close" color="action" onClick={() => { setShowInfo(false) }}>
                        <CloseIcon style={{width: 80, height: 80, color: 'white'}} />
                    </IconButton>
                    <Container spacing={10} style={{ color: 'White', fontSize: '20px', fontWeight: 'Bold' }} >
                        {output}
                    </Container>

                    <Container style={{ color: 'White', fontSize: '18px', fontWeight: 'Bold', overflow: 'auto' }} >
                        最短路径为 {shortestPath}
                    </Container>

                    <Container spacing={10} style={{ color: 'White', fontSize: '20px', fontWeight: 'Bold' }} >
                        本线路地铁费用为 {fee} 元
                    </Container>

                    <StickyHeadTable tableRows={tableRows} style={{ overflow: 'auto'}}>
                    </StickyHeadTable>
                </div>
            </Backdrop>
        );
    }

    const clickHandler = () => {
        setCheck(true);
        let algorithmInfo = Dijkstra(start, end, props.data.adjList, props.data.allLine);
        if (algorithmInfo === -1) {      /* 输入有误 */
            setOutput("没有查询到对应站点");
            setHint(2);
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
            let output = start + "到" + end + "的距离为" + distance.toFixed(3) + "KM";
            setOutput(output);
            setPath(path);
            props.setShortPath(algorithmInfo[1]);
            setFee(algorithmInfo[2]);
            setTableRows(algorithmInfo[3]);
            // console.log(algorithmInfo[3]);
            setHint(1);
        }
    }

    const clickInfo = () => {
        setShowInfo(true);
    }

    return (
        <div>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <DirectionsSubwayIcon />
                </Grid>
                {
                    props.open &&
                    <Grid item>
                        <TextField id="start" label="始发站" onChange={(e) => {
                            setStart(e.target.value);
                        }} />
                    </Grid>
                }
            </Grid>

            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <DirectionsRailwayIcon />
                </Grid>
                {
                    props.open &&
                    <Grid item>
                        <TextField id="end" label="终点站" onChange={(e) => {
                            setEnd(e.target.value);
                        }} />
                    </Grid>
                }
            </Grid>

            {
                props.open && (
                    <span>
                        <IconButton aria-label="go" color="primary" onClick={clickHandler}>
                            <DirectionsIcon className={classes.searchIcon} />
                        </IconButton>
                        <IconButton aria-label="info" color="secondary" onClick={clickInfo}>
                            <InfoIcon className={classes.searchIcon} />
                        </IconButton>
                    </span>
                )
            }

            {Info()}
            {contentSelector(searchHint)}
        </div>
    );
}
