import { DeviceEventEmitter } from 'react-native';
import { CommandListener, LocationEstimateUtil, RobotApi } from 'orionos-eve-core';
import I18ns from '../../source/res/I18ns';
import { localRouteConfigStore } from '../settings/component/routeconfig/LocalRouteConfigStore';
import { FeatureConfig } from '../../base/config/FeatureConfig';
import { ElevatorFloor } from './bean/ElevatorFloor';
import { ElevatorPose } from './bean/ElevatorPose';

const TAG = 'PlaceManager';
export class PlaceManager {
    
    private static locationEstimateUtil: LocationEstimateUtil = new LocationEstimateUtil();
    public static readonly MIN_DISTANCE = 0.1;
    public static readonly EVENT_LOAD_ELEVATOR_PLACE_LIST = 'event_load_elevator_place_list';


    public static isRobotEstimate() {
        return this.locationEstimateUtil.isRobotEstimate();
    }

    public static getPlaceList(): Promise<string[]> {
        console.log(TAG, 'getPlaceList()');
        return new Promise((resolve, reject) => {
            console.log(TAG, '### getPlaceList reject:', reject);
            this.locationEstimateUtil.getPlaceList().then(
                (list: any): void => {
                    console.log(TAG, 'getPlaceList=' + JSON.stringify(list));
                    let mapLocationInfos: string[] = [];
                    for (let index in list) {
                        let name = list[index]['name'];
                        if (!PlaceManager.filter(name)) {
                            mapLocationInfos.push(name);
                        }
                    }
                    this.sortMapLocationList(mapLocationInfos).then(
                        (mapLocationInfo: any) => {
                            resolve(mapLocationInfo);
                            console.log(
                                TAG,
                                'get distance: callback',
                                JSON.stringify(mapLocationInfo)
                            );
                        }
                    );
                }
            );
        });
    }

    /**
     * 获取梯控地点列表
     * @returns 
     */
    public static getElevatorPlaceList() {

        console.log(TAG, 'getElevatorPlaceList()');
        console.log(TAG, 'tikong' + '-----4');
        let action = new CommandListener();
        action.addListener(CommandListener.EVENT_RESULT, (msg: any) => {
            console.log(TAG, 'getElevatorPlaceList data : ' + JSON.stringify(msg));
            console.log(TAG, 'tikong' + '-----5');
            if (msg && typeof msg !== 'undefined') {
                console.log(TAG, 'tikong' + '-----6');
                if (msg) {
                    console.log(TAG, 'tikong' + '-----7');
                    let code = msg.result;
                    let placeList = msg.message;

                    if(code === 1 && placeList){
                        console.log(TAG, 'tikong' + '-----8');
                        this.processElevatorFloorData(placeList);
                    }

                }
            } else {
                console.log(TAG, 'tikong' + '-----61');
                console.log(TAG, 'current ElevatorPlaceList is not exits');
            }
        });
        RobotApi.getMultiFloorConfigAndCommonPose(action.getId());
        
    }


    public static processElevatorFloorData(rawData: string){

        let dataList = JSON.parse(rawData);

        console.log(TAG,'elevatorFloorData: ' + JSON.stringify(dataList));
        console.log(TAG, 'tikong' + '-----9');
        let floorList = new Array<ElevatorFloor>();
        for(let floor of dataList){
            console.log(TAG, 'tikong' + '-----10');
            let tempFloor = new ElevatorFloor(floor.floorIndex, floor.floorAlias);
            if(floor.poseList){
                console.log(TAG, 'tikong' + '-----11');
                let tempPosiList = new Array<ElevatorPose>();
                for(let posi of floor.poseList){
                    console.log(TAG, 'tikong' + '-----12');
                    let tempPosi = new ElevatorPose(posi.name, floor.floorIndex, floor.floorAlias);
                    if (!PlaceManager.filter(tempPosi.poseName)) {
                        console.log(TAG, 'tikong' + '-----13');
                        tempPosiList.push(tempPosi);
                    }
                }
                tempFloor.setPoseList(tempPosiList);
            }
            floorList.push(tempFloor);
        }

        let sortfloorList = this.sortElevatorFloorList(floorList);
        console.log(TAG, 'tikong' + '-----14');
        console.log(TAG,'elevatorFloorData afterProcess: ' + JSON.stringify(sortfloorList));
        localRouteConfigStore.setElevatorFloorList(sortfloorList);
        console.log(TAG, 'tikong' + '-----16');
        DeviceEventEmitter.emit(this.EVENT_LOAD_ELEVATOR_PLACE_LIST);
    }


    private static sortElevatorFloorList = (floorList: ElevatorFloor[]) => {

        let newFloorList: ElevatorFloor[] = [];
        Object.assign(newFloorList, floorList);

        newFloorList.sort(function(a, b) {
            
            function sortIndex(a: ElevatorFloor, b: ElevatorFloor): any {
                
                let indexA = a.floorIndex;
                let indexB = b.floorIndex;

                return indexB - indexA;
            }

            return sortIndex(a, b);
        });

        return newFloorList;
    }


    private static sortMapLocationList = (mapList: string[]) => {
        let hasDistanceList: string[] = [];
        Object.assign(hasDistanceList, mapList);
        hasDistanceList.sort(function(a, b) {
            function sortNames(a: any, b: any): any {
                let parseA = isNaN(parseInt(a)) ? a : parseInt(a);
                let parseB = isNaN(parseInt(b)) ? b : parseInt(b);
                if (typeof parseA === 'string' && typeof parseB === 'string') {
                    if (
                        parseA.length > 1 &&
                        parseB.length > 1 &&
                        parseA.charAt(0) === parseB.charAt(0)
                    ) {
                        return sortNames(
                            parseA.substring(1),
                            parseB.substring(1)
                        );
                    }
                    return parseA.localeCompare(parseB, 'zh');
                }

                if (typeof parseA === 'string' && typeof parseB === 'number') {
                    return 1;
                }

                if (typeof parseA === 'number' && typeof parseB === 'string') {
                    return -1;
                }

                if (typeof parseA === 'number' && typeof parseB === 'number') {
                    if (parseA === parseB) {
                        return a.localeCompare(b, 'zh');
                    }
                    return parseA - parseB;
                }
            }

            return sortNames(a, b);
        });

        return new Promise(
            (resolve, reject): void => {
                console.log(TAG, 'reject:', reject);
                resolve(hasDistanceList);
            }
        );
    };

    public static filter(point: string) {
        return (
            point === I18ns.chargePoint ||
            point === I18ns.chargePile ||
            point === I18ns.locationPoint ||
            point.endsWith(I18ns.elevatorGatePoint)||
            point.endsWith(I18ns.elevatorCenterPoint) ||
            point.startsWith(I18ns.chargePile)
        );
    }

    public static isInPlaceAsync(
        point: string,
        distance: number = this.MIN_DISTANCE
    ) {
        return this.locationEstimateUtil.isInPlace(point, distance);
    }

    public static initMapList() {
        console.log(TAG, 'initMapList()');
        console.log(TAG, 'tikong' + '-----2');
        this.getElevatorPlaceList();
        // if(FeatureConfig.isElevatorControlEnabled()){
        //     console.log(TAG, 'tikong' + '-----3');
        //     this.getElevatorPlaceList();
        // }else{
        //     console.log(TAG, 'tikong' + '-----31');
        //     this.getPlaceList().then(mapLocationInfo => {
        //         console.log(TAG, 'setMapList=' + JSON.stringify(mapLocationInfo));
        //         localRouteConfigStore.setLstMapLocation(mapLocationInfo);
        //     });
        // }

    }
}
