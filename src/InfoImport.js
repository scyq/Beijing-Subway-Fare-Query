/*
    @18105226 陈宇卿
    导入数据页面
*/

import React from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';


/* 导入数据的按钮 */
class InfoImport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            txtStr : ""
        };
    }

    txtSubmit() {
        document.getElementById("selectTXT").click();
    }

    /* 
        因为在内部函数会丢失this
        将组件的this传进去
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
            console.log(event.target.result);
            obj.setState({
                txtStr : event.target.result
            });
        };
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.txtSubmit}>
                    导入地铁数据
                </Button>

                <Typography>
                    {this.state.txtStr}
                </Typography>
                
                 {/* input是实际提交的表单，Button只是用于触发 */}
                 <input id="selectTXT" type="file" hidden onChange={() => this.fileSelectHandler(this)} accept=".txt" />
            </div>
        );
    }

}

export default InfoImport;
/* 导入后的数据显示 */

