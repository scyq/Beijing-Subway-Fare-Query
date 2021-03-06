/*
    @18105226 陈宇卿
    中间页的主要渲染内容，作为中间组件，信息传递
    等级和 NavBar 并行
*/

import React from 'react';
import InfoImport from './InfoImport';
import Map from './Map';

class Content extends React.Component {

    render() {
        if (this.props.showIndex === 0) {
            return (
                <InfoImport 
                    data = {this.props.data}
                    setDataLoaded = {this.props.setDataLoaded}
                />
            );
        }
        else {
            return (
                <Map 
                    data = {this.props.data}
                    path = {this.props.thePath}
                />
            );
        }
    }
}

export default Content;