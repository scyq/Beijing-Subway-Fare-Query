
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

    constructor(props) {
        super(props);

        // itemIdex 代表不同标签页
        this.state = {
            itemIdex : 0
        };
    }

    getIndex = () => {
        return this.state.itemIdex;
    }

    /* 处理点击，改变状态以显示不同内容 */
    clickHandler = (index) => {
        this.setState({itemIdex : index});
        // 改变父组件的index值
        this.props.setShowIndex(index);
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
                    disabled = {!this.props.dataLoaded}
                >
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="地铁费用表" />
                </ListItem>
                <ListItem 
                    button
                    onClick = {() => this.clickHandler(2)}
                    disabled = {!this.props.dataLoaded}
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




