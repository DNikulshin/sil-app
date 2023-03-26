import React, { useCallback, useEffect, useRef } from 'react'
import {Map, YMaps, SearchControl, Placemark, GeolocationControl} from 'react-yandex-maps'

export const MapItem = ({detail}) => {
    const searchRef = useRef(null)

    const coordinateOne = +detail.toString()?.split(',')[0] || []
    const coordinateTwo =  +detail.toString()?.split(',')[1] || []

    const setCoordinates = useCallback(() => {
        searchRef.current = detail
        console.log(detail)
        return searchRef.current

    }, [detail])

    useEffect( () => {
        searchRef.current = detail
    }, [detail])

    return (
        <div className="map">
            <h2>Yandex Map</h2>
            <YMaps query={{apikey: '0c3c2c36-736e-4285-843a-2f4c3968c728'}}>
                <Map defaultState={{center: [coordinateOne,coordinateTwo], zoom: 14}} width="100vw" height="60vh">
                    <SearchControl instanceRef={setCoordinates}/>
                    <Placemark
                        geometry={[coordinateOne,coordinateTwo]}
                        // properties={{}}
                    />
                    <GeolocationControl/>
                </Map>
            </YMaps>
        </div>
    )
}

