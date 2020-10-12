
/*
    @18105226 陈宇卿
    主页导航栏渲染
    根据不同的状态来确定渲染的内容
*/

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';


class NavBar extends React.Component {

    /* 构造器，用于设置不同标签页的状态 */
    constructor(props) {
        super(props);
        this.state = {
            itemIdex : 0
        };
    }

    /* 处理点击，改变状态以显示不同内容 */
    clickHandler = (index) => {
        this.setState({itemIdex : index});
    }

    render() {
        return (
            <div>
                <ListItem 
                    button
                    onClick = {() => this.clickHandler(0)}
                >
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="地铁信息导入" />
                </ListItem>
                <ListItem 
                    button
                    onClick = {() => this.clickHandler(1)}
                >
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="地铁费用表" />
                </ListItem>
                <ListItem 
                    button
                    onClick = {() => this.clickHandler(2)}
                >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="交互查询界面" />
                </ListItem>
            </div>
        );
    }
}

export default NavBar;




