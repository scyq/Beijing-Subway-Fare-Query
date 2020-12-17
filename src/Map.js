/*
    @18105226 陈宇卿
    地图展示类
 */

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Map(props) {
    const [open, setOpen] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    let startIcon = null;
    let endIcon = null;
    let marker = null;
    let subway = null;
    let BMapSub = window.BMapSub;
    let BMAPSUB_ANCHOR_BOTTOM_RIGHT = window.zoomBtn;

    const hintClose = (event, reason) => {
        setOpen(false);
        setLoaded(true);
    }

    const loadHint = () => {
        if (!loaded) {
            return (
                <div>
                    <Snackbar open={open} autoHideDuration={6000} onClose={hintClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={hintClose} severity="warning">
                            暂时不支持西郊线、16号线、S1线、燕房线、新机场线。
                        </Alert>
                    </Snackbar>
                </div>

            );
        }
        else return null;
    }

    const createSubway = (center) => {
        let subwayCityName = '北京';
        let list = BMapSub.SubwayCitiesList;
        let subwaycity = null;
        for (var i = 0; i < list.length; i++) {
            if (list[i].name === subwayCityName) {
                subwaycity = list[i];
                break;
            }
        }
        subway = new BMapSub.Subway('map', subwaycity.citycode);
        // zoom controller
        let zoomControl = new BMapSub.ZoomControl({
            anchor: BMAPSUB_ANCHOR_BOTTOM_RIGHT,
            offset: new BMapSub.Size(10, 100)
        });

        subway.addControl(zoomControl);
        subway.setZoom(1);

        // 提示线路信息
        subway.addEventListener('subwayloaded', function () {
            setOpen(true);
            subway.getLines();
        });

        // 站点点击事件
        subway.addEventListener('tap', (e) => {

        });

        startIcon = new BMapSub.Icon(
            'https://api.map.baidu.com/images/subway/start-bak.png',
            new BMapSub.Size(50, 80)
        );

        endIcon = new BMapSub.Icon(
            'https://api.map.baidu.com/images/subway/end-bak.png',
            new BMapSub.Size(50, 80)
        );

        marker = new BMapSub.Icon(
            'https://api.map.baidu.com/images/subway/marker.png',
            new BMapSub.Size(50, 80)
        );

        subway.setCenter(center);

        if (props.path.length > 0) {
            for (let i = 0; i < props.path.length; i++) {
                if (i === 0) {
                    let markerTemp = new BMapSub.Marker(props.path[i], { icon: startIcon });
                    subway.addMarker(markerTemp);
                }
                else if (i === props.path.length - 1) {
                    let markerTemp = new BMapSub.Marker(props.path[i], { icon: endIcon });
                    subway.addMarker(markerTemp);
                }
                else {
                    let markerTemp = new BMapSub.Marker(props.path[i], { icon: marker });
                    subway.addMarker(markerTemp);
                }
            }
        }
    }

    const mark = () => {
        createSubway(props.path[0]);
    }

    // useEffect is componentDidMount in function 
    React.useEffect(() => {
        if (!loaded)
            createSubway('天安门东');
    });

    return (
        <div>
            {props.path.length > 0 && mark()}
            {loadHint()}
            <div id="map" style={{ height: "80vh" }}>
            </div>
        </div>
    );
}
