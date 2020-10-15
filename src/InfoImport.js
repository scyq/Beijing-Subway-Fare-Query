/*
    @18105226 陈宇卿
    导入数据页面
*/

import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DataHandler from './DataHandler'
import { ListItem } from '@material-ui/core'

const InfoStyles = {
    marginTop : 50,
}


/* 导入数据的按钮 */
class InfoImport extends React.Component {

    /*
        @param
        {StationController} data 存储所有站的信息
        {Array} txtArr 按照\n分割为数组的txtStr         
        {Array} showListItems 渲染列表的JSX
    */
    constructor(props) {
        super(props);
        this.state = {
            data : new DataHandler(),
            txtArr : [],
            showListItems : []
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
            // console.log(event.target.result.split('\n'));
            obj.setState({
                txtArr : event.target.result.split("\n"),
            },
                () => {
                    obj.state.data.cutLine(event.target.result.split("\n"));
                    obj.setState({
                        showListItems : this.state.data.lineInfo.map(line => {
                            return (<ListItem key={line[0]} value={line[1]}>{line[0]} 一共有 {line[1]} 站</ListItem>);
                        })
                    });
                    // 这里强行重新渲染来保证同步....
                    obj.forceUpdate();
                }
            );
        };
        // console.log(this.state.data);
    }

    render() {
        return (
            
            <div>
                <Button variant="contained" color="primary" onClick={this.txtSubmit}>
                    导入地铁数据
                </Button>

                <Typography style={InfoStyles}>
                    {'线路数量 : ' + this.state.txtArr[0]}
                </Typography>

                 {/* input是实际提交的表单，Button只是用于触发 */}
                 <input id="selectTXT" type="file" hidden onChange={() => this.fileSelectHandler(this)} accept=".txt" />

                <ul>
                    {console.log(this.state.data.lineInfo)}
                    {
                        this.state.showListItems
                    }
                </ul>
        
            </div>
        );
    }

}

export default InfoImport;

