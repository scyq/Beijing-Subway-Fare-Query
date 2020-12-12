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

export default function Map() {
    const [open, setOpen] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

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
                            暂时不支持16号线、八通线、房山线、昌平线、亦庄线、机场线。
                        </Alert>
                    </Snackbar>
                </div>

            );
        }
        else return null;
    }

    const createSubway = () => {
        // 全局变量转为本地变量
        let BMapSub = window.BMapSub;
        let BMAPSUB_ANCHOR_BOTTOM_RIGHT = window.zoomBtn;

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
        // zoom controller
        var zoomControl = new BMapSub.ZoomControl({
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
    }

    // useEffect is componentDidMount in function 
    React.useEffect(() => {
        if (!loaded)
            createSubway();
    });

    return (
        <div>
            {loadHint()}
            <div id="map" style={{ height: "80vh" }}>
            </div>
        </div>
    );
}
