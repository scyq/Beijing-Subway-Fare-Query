/*
    @18105226 陈宇卿
    导入数据页面
*/

import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DataHandler from './DataHandler'

const InfoStyles = {
    marginTop : 100,
}


/* 导入数据的按钮 */
class InfoImport extends React.Component {

    /*
        @param
        {StationController} data 存储所有站的信息
        {string} txtStr 读入txt的纯字符串
        {Array} txtArr 按照\n分割为数组的txtStr 
    */
    constructor(props) {
        super(props);
        this.state = {
            txtStr : "",
            txtArr : []
        };
    }

    static getInfo() {
        return this.state.txtArr;
    }

    // 触发表单提交
    txtSubmit() {
        document.getElementById("selectTXT").click();
    }

    /* 
        因为在内部函数会丢失this
        将组件的this传进去，obj为该组件的this
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
                data : new DataHandler(),
                txtStr : event.target.result,
                txtArr : event.target.result.split("\n")
            });
            this.state.data.cutLine(this.state.txtArr);
            console.log(this.state.data);
            // console.log(Object.keys(this.state.data.StationController).length);
            // console.log(this.state.data.lineNumbers);
        };

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
            </div>
        );
    }

}

export default InfoImport;

