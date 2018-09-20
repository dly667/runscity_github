import React from 'react'



class Map extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 13,
            // center: [116.39, 39.9]
        })

     
        const { onSelectMapLal } = this.props
        AMap.plugin('AMap.Geocoder', function () {
            var geocoder = new AMap.Geocoder({
                city: "0577"//城市，默认：“全国”
            });
            var marker = new AMap.Marker({
                map: map,
                bubble: true
            })
            map.on('click', function (e) {

                marker.setPosition(e.lnglat);
                geocoder.getAddress(e.lnglat, function (status, result) {
                    if (status == 'complete') {
                        onSelectMapLal({
                            LatitudeLongitude: e.lnglat,
                            selectedAddr: result.regeocode.formattedAddress
                        })
                        //   document.getElementById('input').value = result.regeocode.formattedAddress
                        //   dispatch({
                        //     type: 'systemconfig/updateState',
                        //     payload: {
                        //       LatitudeLongitude: e.lnglat,
                        //       selectedAddr:result.regeocode.formattedAddress
                        //     }
                        //   })
                    }
                })
            })

        });
    }
    render() {
        return (<div>
            <div id="container" style={{ width: "632px", height: "330px" }}></div>
        </div>)
    }
}
export default Map
