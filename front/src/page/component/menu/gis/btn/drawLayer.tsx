import 'leaflet-geometryutil';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import {MutableRefObject, useEffect, useRef, useState} from "react";
import L, {LatLng} from "leaflet";
import {Polygon, Polyline, useMap, useMapEvent} from "react-leaflet";
import {GIS_FUNC} from "../../../../conf/const/common/gisConst";
import * as turf from '@turf/turf';
import {useGisStore} from "../../../../data/store/zustand/gisStore";
import {useShallow} from "zustand/react/shallow";


const DrawLayer = () => {

    const {isClear, activeFunc} = useGisStore(useShallow((state) => ({
        isClear: state.isClear,
        activeFunc: state.activeFunc,
    })))

    const map = useMap();

    const tooltipRef = useRef();
    const polyLineRef: MutableRefObject<any> = useRef();
    const polyGonRef: MutableRefObject<any> = useRef();

    const [linePositions, setLinePositions] = useState<LatLng[]>([]);
    const [polyline, setPolyline] = useState<any>();
    const [distanceTooltip, setDistanceTooltip] = useState<string | null>()

    const [gonPositions, setGonPositions] = useState<LatLng[]>([]);
    const [polygon, setPolygon] = useState<any>();
    const [areaTooltip, setAreaTooltip] = useState<string | null>();

    // 마우스를 따라 이동한는 툴팁
    const [tooltipContent, setTooltipContent] = useState<string | null>();

    // 현재 draw 여부
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    //polyline 총 길이 계싼
    const calculateDistance = () => {
        let allDistance = 0;

        linePositions.map((_, index) => {
            if (index > 0) {
                const prev = L.latLng(linePositions[index - 1]);
                const current = L.latLng(linePositions[index]);
                const distance = prev.distanceTo(current);

                allDistance += distance;
            }
        })

        let result = (allDistance / 1000).toFixed(2); //m -> km


        return result.toString();
    }

    const calculateArea = () => {
        if (polygon) {
            if (polyGonRef.current) {
                const polygons = polyGonRef.current;
                const latlngs = polygons.getLatLngs()[0];

                //@ts-ignore
                const coordinates = latlngs.map(latLng => [latLng.lng, latLng.lat]);

                //polygon의 면적을 계산할 때는 시작점과 끝점을 동일하게 해줘야 하는데, 해당 작업 X (esc를 누르면 끝나게 되어있음)
                //따라서 시작점과 끝점을 동일하게 만드는 작업이 필요하다.
                if (coordinates.length > 1) {
                    const firstLatLng = coordinates[0];
                    const lastLatLng = coordinates[latlngs.length - 1];
                    if (firstLatLng[0] !== lastLatLng[0] || firstLatLng[1] !== lastLatLng[1]) {
                        coordinates.push(firstLatLng); // 시작점과 끝 점을 동일하게 만든다.
                    }
                }

                const polygonGeoJson = turf.polygon([coordinates]);
                const area = turf.area(polygonGeoJson);
                const areaInSquareMeters = Math.round(area * 100) / 100; // m^2로 계산

                return areaInSquareMeters;
            }
        }
    }

    useEffect(() => {
        if (polyLineRef.current) {
            let distanceTip: L.Tooltip;

            if (distanceTooltip) {

                //poyline 중간좌표 구하기
                const polylineCurrent = polyLineRef.current;
                const latLngs = polylineCurrent.getLatLngs();
                const midIndex = Math.floor(latLngs.length / 2);
                const midPointLatLng = latLngs[midIndex];

                distanceTip = L.tooltip({
                    permanent: false,// permanent 속성제거
                    interactive: true,
                    offset: [0, 10], // y축 이동
                    direction: 'bottom', // 툴팁 방향 설정
                    className: 'distance-custom-tooltip', //CSS 클래스 추가
                }).setContent('총 길이 : ' + distanceTooltip);
                distanceTip.setLatLng(midPointLatLng).openOn(map);
            } else {

                map.eachLayer((l) => {
                    //@ts-ignore
                    if (l.options.className === 'distance-custom-tooltip') {
                        map.removeLayer(l);
                    }
                })
            }
        }
    }, [distanceTooltip, isClear]);


    useEffect(() => {
        if (polyGonRef.current) {
            let areaTip: L.Tooltip;
            if (areaTooltip) { // areaTooltip이 null 이 아닌 경우
                areaTip = L.tooltip({
                    permanent: false, // permanent 속성 제거
                    interactive: true,
                    offset: [0, -30], // y축으로 약간 위로 이동
                    direction: 'bottom', // 툴팁 방향 설정
                    className: 'area-custom-tooltip', // CSS 클래스 추가 (나중에 해당 레이어만 지워주기 위해 필요)

                }).setContent('총 면적 : ' + areaTooltip);

                const polygon = polyGonRef.current;
                const centerLatLng = polygon.getBounds().getCenter(); // polygon의 중심좌표

                areaTip.setLatLng(centerLatLng).openOn(map); // tooltip 표시
            } else {
                map.eachLayer((l) => {
                    //@ts-ignore
                    if (l.options.className === 'area-custom-tooltip') {
                        // map에 표시되어 있는 전체 layer를 가져온다.
                        // 따라서 삭제하고자 하는 레이어만 구분하여 삭제해준다.
                        map.removeLayer(l)
                    }
                })
            }
        }
    }, [areaTooltip]);


    // mouse를 따라 움직이는 tooltip
    useEffect(() => {
        let tooltip: L.Tooltip;

        if (tooltipContent) {
            tooltip = L.tooltip({
                permanent: false, // permanent 속성 제거
                interactive: true,
                offset: [0, -30], // 마커 위에 표시하기 위해 y축으로 약간 위로 이동
                direction: 'top', // 툴팁 방향 설정
                className: 'custom-tooltip', // CSS 클래스 추가
            }).setContent(tooltipContent);

            //마우스 이동 이벤트 핸들러 등록
            map.on('mousemove', handleMouseMove);

            //@ts-ignore
            tooltipRef.current = tooltip;

            return () => {
                // 컴포넌트 언마운트 시 이벤트 핸들러와 툴팁 제거
                // 해당 작업을 해주지 않으면 mouse 가 움직이는 곳마다 tooltip 이 생겨난다.
                map.off('mousemove', handleMouseMove);
                if (tooltip) {
                    tooltip.remove();
                }
            };
        }

        //마우스 이동 이벤트 핸들러 정의
        // 마우스 위치에 tooltip을 열어준다.
        function handleMouseMove(e: L.LeafletMouseEvent) {
            if (tooltip) {
                tooltip.setLatLng(e.latlng).openOn(map);
            }
        }

    }, [tooltipContent]);

    // map event
    // map에서 첫번째 인자 type 이벤트가 발생할 경우 두번째 인자의 함수가 실행된다.

    useMapEvent('click', function (e) {

        if (activeFunc === GIS_FUNC.POLYLINE) {
            let newPositions = [...linePositions]; // 원래 그려진 지점들을 가져오고
            if (isDrawing) {
                setTooltipContent(`'esc'키를 누르면 종료됩니다.`);
                newPositions.push(e.latlng);
                setLinePositions(newPositions);
            }
        } else if (activeFunc === GIS_FUNC.POLYGON) {
            let newGonPositions = [...gonPositions];
            if (isDrawing) {
                setTooltipContent(`'esc'키를 누르면 종료됩니다.`);
                newGonPositions.push(e.latlng);
                setGonPositions(newGonPositions);
            }
        }
    })

    useMapEvent('mousemove', function (e) {
        if (isDrawing) {
            if (activeFunc === GIS_FUNC.POLYLINE) {
                setLinePositions((prevPositions) => [...prevPositions.slice(0, -1), e.latlng])
            } else if (activeFunc === GIS_FUNC.POLYGON) {
                setGonPositions((prevPositions) => [...prevPositions.slice(0, -1), e.latlng])
            }
        }
    })

    useMapEvent('keydown', function (event) {

        // 그리는 중이고
        if (isDrawing) {
            if (activeFunc === GIS_FUNC.POLYLINE) {
                if (event.originalEvent.key === 'Escape') {

                    // 두 지점 넘게 선택한 경우
                    if (linePositions.length > 2) {
                        setIsDrawing(false); //drawing 종료하고
                        setTooltipContent('esc 키를 한 번 더 누르면 초기화됩니다.') // 초기화 툴팁 보여주고
                        setLinePositions((prevPositions) => [...prevPositions.slice(0, -1)]); // 마지막으로 클릭한 지접까지로 바꿔주고
                        let allDistance: string = calculateDistance(); // 거리 계산해주고
                        setDistanceTooltip(allDistance + 'km');
                    } else {
                        // 지점을 두 곳이상 선택하지 않은 경우(한 점만 선택하거나 선택하지 않을 경우 거리를 계산할 수 없다.
                        alert("지점을 두 곳 이상 선택해주세요");
                    }
                }
            } else if (activeFunc === GIS_FUNC.POLYGON) {
                if (event.originalEvent.key === 'Escape') {
                    if (gonPositions.length < 4) {
                        alert("지점을 세 곳 이상 선택해주세요");
                    } else {
                        setIsDrawing(false); //그리기 모드 종료하고
                        setTooltipContent('esc 키를 한 번 더 누르면 초기화됩니다.') // 초기화 툴팁 보여주고
                        setGonPositions((prevPositions) => [...prevPositions.slice(0, -1)]) // 마지막 선택 지점으로 바꿔주고
                        let polygonArea = calculateArea(); // 면적 계산하고
                        setAreaTooltip(polygonArea + 'km²');
                    }
                }
            }
        } else {
            if (event.originalEvent.key === 'Escape') {
                if (activeFunc === GIS_FUNC.POLYGON) {
                    setGonPositions([]); // 그리기 모드가 아닐 때 esc를 누를 경우 초기화
                    setAreaTooltip(null);
                    setIsDrawing(true);
                    setTooltipContent('클릭하면 그리기가 시작됩니다.');
                } else if (activeFunc === GIS_FUNC.POLYLINE) {
                    setLinePositions([]); // 그리기 모드가 아닐 때 역시 초기화
                    setDistanceTooltip(null);
                    setIsDrawing(true);
                    setTooltipContent('클릭하면 그리기가 시작됩니다.');
                }
            }
        }
    })

    //그리기 이벤트 생성
    //polyline 생성
    useEffect(() => {
        if (activeFunc === GIS_FUNC.POLYLINE && linePositions.length > 0) {
            setPolyline(<Polyline positions={linePositions} color={'#543FAF'} weight={4} opacity={1}
                                  ref={polyLineRef}/>)
        } else {
            setPolyline(null);
        }
    }, [linePositions, activeFunc]);

    //polygon
    useEffect(() => {
        if (activeFunc === GIS_FUNC.POLYGON && gonPositions.length > 0) {
            setPolygon(<Polygon className={'gon'} positions={gonPositions} color={'#543FAF'}
                                fillColor={'rgba(29,21,59,0.89)'}
                                fillOpacity={0.3} ref={polyGonRef}/>)
        } else {
            setPolygon(null);
        }
    }, [gonPositions, activeFunc]);

    //active 된 모드가 변경된 경우
    useEffect(() => {

        setLinePositions([]);
        setGonPositions([]);
        setDistanceTooltip(null);
        setAreaTooltip(null);

        map.eachLayer((l) => {

            //@ts-ignore
            if (l.options.className === 'distance-custom-tooltip') {
                map.removeLayer(l);
            }

            //@ts-ignore
            if (l.options.className === 'area-custom-tooltip') {
                map.removeLayer(l);
            }
        })

        if (activeFunc !== GIS_FUNC.POLYGON && activeFunc !== GIS_FUNC.POLYLINE) {


            setPolyline(null);
            setPolygon(null);
            setTooltipContent(null);

            setIsDrawing(false);

        } else {
            setIsDrawing(true);
            setTooltipContent('클릭하면 그리기가 시작됩니다.');
        }

    }, [activeFunc]);

    useEffect(() => {
        if (isClear) {

            map.eachLayer((l) => {
                //@ts-ignore
                if (l.options.className === 'distance-custom-tooltip') {
                    map.removeLayer(l);
                }

                //@ts-ignore
                if (l.options.className === 'area-custom-tooltip') {
                    map.removeLayer(l);
                }
            })
            setDistanceTooltip(null);
            setAreaTooltip(null);
            setTooltipContent(null);
        }
    }, [isClear]);

    return (
        <>
            {
                activeFunc === GIS_FUNC.POLYLINE && polyline
            }
            {
                activeFunc === GIS_FUNC.POLYGON && polygon
            }
        </>
    )


}

export default DrawLayer