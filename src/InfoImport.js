/*
    @18105226 陈宇卿
    导入数据页面
*/

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ListItem } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const InfoStyles = {
    marginTop : 50,
}


/* 导入数据的按钮 */
class InfoImport extends React.Component {

    /*
        @param
        {StationController} data 存储所有站的信息
        {Array} txtArr 按照\n分割为数组的txtStr         
    */
    constructor(props) {
        super(props);
        this.state = {
            data : props.data,
            txtArr : []
        };
    }

    // 触发表单提交
    txtSubmit() {
        document.getElementById("selectTXT").click();
    }


    /* 
        @function fileSelectHandler
        因为在内部函数会丢失this
        将组件的this传进去，obj为该组件的this
        @param 
        {object} obj this指针
    */
    fileSelectHandler(obj) {
        const txtFile = document.getElementById("selectTXT").files[0];
        const reader = new FileReader();
        reader.readAsText(txtFile);
        /* 
            readAsText 触发load事件
            onload 对时间event进行处理
        */
        reader.onload = (event) => {
            obj.setState({
                txtArr : event.target.result.split("\n"),
            },
                () => {
                    obj.state.data.cutLine(event.target.result.split("\n"));
                }
            );
            this.props.setDataLoaded(true);
            obj.forceUpdate();  /* 强制重新渲染 */
        };
    }

    renderStationList(lineInfo) {
        if (!lineInfo) return "没有查询到地铁信息";
        else {
            let showListItems = undefined;
            showListItems = lineInfo.map(line => {
                return (<ListItem key={line[0]} value={line[1]}>{line[0]} 一共有 {line[1]} 站
                </ListItem>);
            });
            return showListItems;
        }
    }

    render() {
        return (
            
            <div>
                <Button variant="contained" color="primary" onClick={this.txtSubmit} startIcon={<CloudUploadIcon />}>
                    导入地铁数据
                </Button>

                <Typography style={InfoStyles}>
                    {'线路数量 : ' + this.state.data.allLine.length}
                </Typography>

                 {/* input是实际提交的表单，Button只是用于触发 */}
                 <input id="selectTXT" type="file" hidden onChange={() => this.fileSelectHandler(this)} accept=".txt" />

                <ul>
                    {console.log(this.state.data)}
                    {this.renderStationList(this.state.data.lineInfo)}
                </ul>
        
            </div>
        );
    }

}

export default InfoImport;

