/*
    @18105226 陈宇卿
    地图展示类
 */

import React from 'react';

class Map extends React.Component {

    createSubway (){
        let BMapSub = window.BMapSub;
        var subwayCityName = '北京';
        var list = BMapSub.SubwayCitiesList;
        var subwaycity = null;
        for (var i = 0; i < list.length; i++) {
            if (list[i].name === subwayCityName) {
                subwaycity = list[i];
                break;
            }
        }
        var subway = new BMapSub.Subway('map', subwaycity.citycode);
        subway.setZoom(1);
    }

    componentDidMount() {
        this.createSubway();
    }

    render() {
        return (
            <div id="map">
            </div>
        );
    }
}

export default Map;